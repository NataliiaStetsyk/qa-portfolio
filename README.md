# QA Automation Portfolio

End-to-end QA portfolio demonstrating **manual and automated testing** of web and
API systems, with **database verification**, CI/CD, and a published test report.
Built entirely against **public demo applications** and synthetic data — no
proprietary or employer data is used.

> Author: **Nataliia Stetsyk** — QA Engineer
> linkedin.com/in/nataliiastetsykqa · github.com/NataliiaStetsyk

[![Playwright Tests](https://github.com/NataliiaStetsyk/qa-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/NataliiaStetsyk/qa-portfolio/actions/workflows/playwright.yml/badge.svg)

## What this demonstrates

- **UI E2E automation** (Playwright + TypeScript, Page Object Model) of the full
  purchase journey on [SauceDemo](https://www.saucedemo.com): auth, inventory,
  cart, checkout — happy paths and negative/boundary cases.
- **API testing** (Playwright request context) against
  [Restful-Booker](https://restful-booker.herokuapp.com): token auth, chained
  requests, CRUD, and authorization negative cases.
- **Database testing** integrated into the framework: SQL verification of
  persisted state and data integrity — referential integrity, batch uniqueness,
  a financial invariant, and duplicate-detection on an unconstrained event
  stream (the class of defect a schema cannot prevent). The suite uses a
  deterministic in-memory SQLite setup with reusable helpers and seed data, so
  it remains isolated, fast, and easy to extend. The patterns transfer to
  Postgres, MySQL, MongoDB, and DynamoDB. See
  [`docs/database-testing.md`](docs/database-testing.md).
- **Accessibility testing** with [axe-core](https://github.com/dequelabs/axe-core)
  against WCAG 2.1 A/AA — violations attached to the report, critical issues gate
  the build.
- **Performance smoke** with [k6](https://k6.io) — virtual users and SLA thresholds.
- **CI/CD** via GitHub Actions: runs on every push/PR, executes the database
  suite explicitly, and **publishes the HTML report to GitHub Pages**.
- **Manual QA artifacts** — see [`docs/`](docs): test plan, test cases,
  traceability matrix, and bug reports.
- **AI-assisted testing** workflow — see
  [`docs/ai-assisted-testing.md`](docs/ai-assisted-testing.md).

## Tech stack

Playwright · TypeScript · Node.js · SQL · better-sqlite3 · k6 · GitHub Actions · Page Object Model

## Project structure

```
qa-portfolio/
├── pages/          # Page Object Model classes
├── tests/          # UI E2E specs (login, inventory, cart, checkout)
│   └── db/         # database integrity specs (run by Playwright)
├── api/            # API tests (Restful-Booker CRUD + auth)
├── db/             # schema, seed, helpers, and test data for data-layer tests
├── performance/    # k6 smoke / light-load test
├── docs/           # test plan, test cases, traceability matrix, bug reports
└── .github/workflows/playwright.yml   # CI + report publishing
```

## Test strategy (short version)

Coverage is driven by risk and by classic ISTQB design techniques — equivalence
partitioning and boundary value analysis for inputs, decision tables for login
outcomes, and state-transition for the cart/checkout flow. Selectors prefer
stable `data-test` attributes; assertions check behavior and data, not just
presence.

Database tests extend that principle to the data layer: a single aggregate query
checks an invariant across a whole table, and the strongest checks are pinned to
correctness properties (a booking total equals nights times rate, an event
appears exactly once) rather than to incidental structure. The suite is
deterministic, parallel-safe, and self-cleaning. Full plan in
[`docs/test-plan.md`](docs/test-plan.md).

## Running locally

Requires Node 20 (better-sqlite3 ships prebuilt binaries for it, so install needs
no compile step).

```
npm ci
npx playwright install --with-deps

npm test            # all Playwright tests (UI + API + DB)
npm run test:ui     # UI specs only
npm run test:api    # API specs only
npm run test:db     # database integrity tests only
npm run test:a11y   # accessibility (axe-core) only
npm run report      # open the HTML report
npm run perf        # k6 smoke (requires k6 installed)
```

## Live report

After the first CI run, enable **Settings → Pages → Source: GitHub Actions**.
The latest report publishes automatically; link it here once live.

## License

MIT — sample app targets are owned by their respective providers and used here
for public testing practice only.