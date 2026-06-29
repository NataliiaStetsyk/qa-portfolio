export const DbTestData = {
  bookings: {
    knownBookingRef: 'BK-1003',
    expectedBooking: {
      lastname: 'Hopper',
      totalPrice: 600,
    },
  },
  events: {
    expectedInitialCount: 4,
    injected: {
      id: 99,
      eventId: 'evt-a1',
      eventType: 'booking.created',
      receivedAt: '2026-07-01T10:00:01Z',
    },
  },
} as const;
