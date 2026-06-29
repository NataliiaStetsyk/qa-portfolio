-- Minimal hotel-booking schema (mirrors the Restful-Booker domain already
-- used in the API tests). Public/demo data only; nothing proprietary.
CREATE TABLE rooms (
  id           INTEGER PRIMARY KEY,
  room_name    TEXT    NOT NULL UNIQUE,
  nightly_rate INTEGER NOT NULL CHECK (nightly_rate > 0)
);

CREATE TABLE bookings (
  id          INTEGER PRIMARY KEY,
  booking_ref TEXT    NOT NULL UNIQUE,
  firstname   TEXT    NOT NULL,
  lastname    TEXT    NOT NULL,
  room_id     INTEGER NOT NULL REFERENCES rooms(id),
  checkin     TEXT    NOT NULL,           -- ISO date
  checkout    TEXT    NOT NULL,           -- ISO date
  total_price INTEGER NOT NULL
);

-- Event log WITHOUT a uniqueness constraint on event_id — mirrors a real
-- message/webhook ingestion table where duplicates can slip in under load.
-- The schema does NOT prevent duplicates, so a QA batch check is the guard.
CREATE TABLE events (
  id          INTEGER PRIMARY KEY,
  event_id    TEXT NOT NULL,
  event_type  TEXT NOT NULL,
  received_at TEXT NOT NULL
);