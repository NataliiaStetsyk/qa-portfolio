import { test, expect } from '@playwright/test';
import type Database from 'better-sqlite3';
import { createSeededDb } from '../../db/db';
import { DbTestData } from '../../db/testData';
import {
  getBookingByRef,
  getDuplicateBookingRefs,
  getDuplicateEvents,
  getEventsCount,
  getFinancialMismatches,
  getInvalidBookings,
  getOrphanedBookings,
  insertInjectedEvent,
} from '../../db/testHelpers';

let db: Database.Database;

function expectNoRows<T>(rows: T[], message: string) {
  expect(rows, message).toHaveLength(0);
}

test.beforeEach(() => {
  db = createSeededDb();
});

test.afterEach(() => {
  db.close();
});

test.describe('Database integrity — bookings', () => {
  test('every booking references an existing room', () => {
    const orphans = getOrphanedBookings(db);

    expectNoRows(orphans, 'Expected no orphaned bookings');
  });

  test('contains no duplicate booking references', () => {
    const duplicates = getDuplicateBookingRefs(db);

    expectNoRows(duplicates, 'Expected no duplicate booking references');
  });

  test('ensures checkout happens after checkin for every booking', () => {
    const invalidRows = getInvalidBookings(db);

    expectNoRows(invalidRows, 'Expected no bookings with checkout before or equal to checkin');
  });

  test('keeps total_price aligned with room nightly rate and stay length', () => {
    const mismatches = getFinancialMismatches(db);

    expectNoRows(mismatches, 'Expected financial totals to match the booking formula');
  });

  test('persists the expected booking fields for a known booking', () => {
    const row = getBookingByRef(db, DbTestData.bookings.knownBookingRef);

    expect(row).toBeDefined();
    expect(row).toEqual(
      expect.objectContaining({
        booking_ref: DbTestData.bookings.knownBookingRef,
        lastname: DbTestData.bookings.expectedBooking.lastname,
        total_price: DbTestData.bookings.expectedBooking.totalPrice,
      })
    );
  });
});

test.describe('Database integrity — event stream', () => {
  test('contains no duplicate event_id values in the seeded stream', () => {
    const duplicates = getDuplicateEvents(db);

    expectNoRows(duplicates, 'Expected no duplicate event ids in the seeded event stream');
  });

  test('detects an injected duplicate and rolls the transaction back', () => {
    db.exec('BEGIN');

    try {
      insertInjectedEvent(db);

      const duplicates = getDuplicateEvents(db);

      expect(duplicates).toHaveLength(1);
      expect(duplicates[0].event_id).toBe(DbTestData.events.injected.eventId);
    } finally {
      db.exec('ROLLBACK');
    }

    const count = getEventsCount(db);
    expect(count.c).toBe(DbTestData.events.expectedInitialCount);
  });
});