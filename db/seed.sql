INSERT INTO rooms (id, room_name, nightly_rate) VALUES
  (1, 'Single',  100),
  (2, 'Double',  150),
  (3, 'Suite',   300);

-- total_price is intentionally consistent: nights * nightly_rate
INSERT INTO bookings (id, booking_ref, firstname, lastname, room_id, checkin, checkout, total_price) VALUES
  (1, 'BK-1001', 'Ada',   'Lovelace', 1, '2026-07-01', '2026-07-04', 300),  -- 3 nights * 100
  (2, 'BK-1002', 'Alan',  'Turing',   2, '2026-07-05', '2026-07-07', 300),  -- 2 nights * 150
  (3, 'BK-1003', 'Grace', 'Hopper',   3, '2026-07-10', '2026-07-12', 600),  -- 2 nights * 300
  (4, 'BK-1004', 'Edsger','Dijkstra', 1, '2026-08-01', '2026-08-06', 500);  -- 5 nights * 100

-- Clean event stream: each event_id appears exactly once.
INSERT INTO events (id, event_id, event_type, received_at) VALUES
  (1, 'evt-a1', 'booking.created', '2026-07-01T10:00:00Z'),
  (2, 'evt-a2', 'booking.updated', '2026-07-01T10:05:00Z'),
  (3, 'evt-a3', 'booking.created', '2026-07-01T10:09:00Z'),
  (4, 'evt-a4', 'booking.cancelled', '2026-07-01T10:12:00Z');