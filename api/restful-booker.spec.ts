import { test, expect } from './fixtures';
import { ApiData } from '../data/testData';

test.describe.configure({ mode: 'serial' });

test.describe('Restful-Booker API', () => {
  test('GET /booking returns a list of booking IDs', async ({ bookerClient }) => {
    const res = await bookerClient.getBookingList();
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
  });

  test('POST /booking creates a booking and returns the created entity', async ({ bookerClient, bookingId }) => {
    // The bookingId fixture creates the booking, just verify it
    expect(bookingId).toBeGreaterThan(0);
    
    // Create another booking to verify the POST endpoint
    const res = await bookerClient.createBooking();
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('bookingid');
    expect(body.booking.firstname).toBe(ApiData.bookingPayload.firstname);
    expect(body.booking.totalprice).toBe(ApiData.bookingPayload.totalprice);
  });

  test('GET /booking/{id} returns the created booking', async ({ bookerClient, bookingId }) => {
    const res = await bookerClient.getBooking(bookingId);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.lastname).toBe(ApiData.bookingPayload.lastname);
    expect(body.bookingdates.checkin).toBe(ApiData.bookingPayload.bookingdates.checkin);
  });

  test('PUT /booking/{id} updates the booking (auth required)', async ({ bookerClient, bookingId }) => {
    const res = await bookerClient.updateBooking(bookingId);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.lastname).toBe(ApiData.updatedBookingPayload.lastname);
    expect(body.totalprice).toBe(ApiData.updatedBookingPayload.totalprice);
  });

  test('DELETE without auth is rejected (403)', async ({ bookerClient, bookingId }) => {
    const res = await bookerClient.deleteBooking(bookingId, false);
    expect(res.status()).toBe(403);
  });

  test('DELETE /booking/{id} with auth removes the booking', async ({ bookerClient, bookingId }) => {
    const res = await bookerClient.deleteBooking(bookingId);
    expect(res.status()).toBe(201);
    const check = await bookerClient.getBooking(bookingId);
    expect(check.status()).toBe(404);
  });
});
