import type Database from 'better-sqlite3';
import { DbTestData } from './testData';

export type BookingSummary = {
  booking_ref: string;
  lastname: string;
  total_price: number;
};

export type DuplicateEvent = {
  event_id: string;
};

export function getOrphanedBookings(db: Database.Database) {
  return db.prepare(`
    SELECT b.id
    FROM bookings b
    LEFT JOIN rooms r ON r.id = b.room_id
    WHERE r.id IS NULL
  `).all() as Array<{ id: number }>;
}

export function getDuplicateBookingRefs(db: Database.Database) {
  return db.prepare(`
    SELECT booking_ref
    FROM bookings
    GROUP BY booking_ref
    HAVING COUNT(*) > 1
  `).all() as Array<{ booking_ref: string }>;
}

export function getInvalidBookings(db: Database.Database) {
  return db.prepare(`
    SELECT id
    FROM bookings
    WHERE checkout <= checkin
  `).all() as Array<{ id: number }>;
}

export function getFinancialMismatches(db: Database.Database) {
  return db.prepare(`
    SELECT b.id
    FROM bookings b
    JOIN rooms r ON r.id = b.room_id
    WHERE b.total_price <> (
      (julianday(b.checkout) - julianday(b.checkin)) * r.nightly_rate
    )
  `).all() as Array<{ id: number }>;
}

export function getBookingByRef(db: Database.Database, bookingRef: string) {
  return db.prepare(`
    SELECT booking_ref, lastname, total_price
    FROM bookings
    WHERE booking_ref = ?
  `).get(bookingRef) as BookingSummary | undefined;
}

export function getDuplicateEvents(db: Database.Database) {
  return db.prepare(`
    SELECT event_id
    FROM events
    GROUP BY event_id
    HAVING COUNT(*) > 1
  `).all() as DuplicateEvent[];
}

export function insertInjectedEvent(db: Database.Database) {
  return db.prepare(`
    INSERT INTO events (id, event_id, event_type, received_at)
    VALUES (?, ?, ?, ?)
  `).run(
    DbTestData.events.injected.id,
    DbTestData.events.injected.eventId,
    DbTestData.events.injected.eventType,
    DbTestData.events.injected.receivedAt
  );
}

export function getEventsCount(db: Database.Database) {
  return db.prepare('SELECT COUNT(*) AS c FROM events').get() as { c: number };
}
