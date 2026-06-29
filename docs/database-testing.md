# Database testing

This module demonstrates database verification integrated into the test
framework: connecting to a database from the suite, running queries to verify
persisted state, and asserting on data the UI and API layers cannot see.

All data is synthetic and public. The store is an in-memory SQLite database,
created and seeded fresh on every run, which keeps the suite deterministic,
parallel-safe, and self-cleaning. The patterns transfer directly to Postgres,
MySQL, MongoDB, or DynamoDB — only the driver and dialect change.

## What it covers

Two groups of checks, chosen to show the two reasons database testing exists.

Constraint-backed invariants on `bookings`:

- Referential integrity — every booking points to an existing room.
- Batch uniqueness — no duplicate booking references.
- Date validity — checkout is after checkin for every row.
- Financial invariant — `total_price` equals nights times nightly rate. This is
  a correctness property, not a locator: it can only pass or fail on its own
  merits, which is the kind of check worth pinning a test to.
- Row-level state — a specific record persisted the expected fields.

An invariant the schema does NOT enforce, on an ingestion-style `events` table:

- No duplicate `event_id` in the stream.
- A teeth test: it injects a duplicate inside a transaction, confirms the batch
  query detects it, then rolls back so the seeded state is restored.

That second group is the important one. The `events` table has no uniqueness
constraint, mirroring a message or webhook ingestion table where duplicates can
slip in under load. The schema cannot prevent that, so a batch check is the only
guard. This is exactly the class of defect that surfaces in production when a
consumer reprocesses messages, and it is invisible to UI and API tests.

## Files

```
db/
├── schema.sql   # rooms, bookings (constrained), events (unconstrained)
├── seed.sql     # clean, consistent sample data
└── db.ts        # creates a fresh in-memory DB, applies schema + seed
tests/db/
└── db-integrity.spec.ts   # the checks, run by the Playwright runner
```

## Running

```
npm run test:db
```

## Why these queries

The verification logic lives in SQL because that is where data integrity is
expressed most directly: a single aggregate query checks an invariant across the
whole table, rather than looping in application code. The financial and
duplicate checks in particular encode correctness as a property that holds or
does not — the kind of assertion that stays honest even as the application
around it changes.