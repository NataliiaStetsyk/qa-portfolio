# Test Plan — SauceDemo (Demo E-commerce)

> Practice test plan built against the public demo app https://www.saucedemo.com.
> No proprietary or employer data is used anywhere in this portfolio.

## 1. Objective
Validate the core purchase journey of the SauceDemo storefront — authentication,
product browsing, cart management, and checkout — across supported browsers, and
verify backend behavior through the Restful-Booker practice API.

## 2. Scope
**In scope:** login/auth, inventory listing and sorting, add/remove from cart,
checkout (happy path and validation), API CRUD with auth, light load smoke.
**Out of scope:** payment processing, real user accounts, visual pixel-diffing,
mobile-native apps, accessibility audit (tracked as a future enhancement).

## 3. Test Approach
- **Levels:** functional, integration (UI + API), end-to-end, regression, smoke.
- **Design techniques (ISTQB):** equivalence partitioning and boundary value
  analysis for form fields; decision tables for login outcomes; state transition
  for the cart/checkout flow.
- **Automation:** Playwright + TypeScript, Page Object Model. API via Playwright's
  request context. Performance smoke via k6.
- **Manual:** exploratory passes on new flows; documented test cases below.

## 4. Environments & Data
- Browsers: Chromium, Firefox (CI matrix).
- Test data: SauceDemo standard accounts (`standard_user`, `locked_out_user`, etc.);
  synthetic booking data for the API.

## 5. Entry / Exit Criteria
- **Entry:** app reachable, test accounts valid, CI green on dependencies.
- **Exit:** 100% of P1 cases pass, no open Critical/High defects, report published.

## 6. Risks
- Public demo apps can be rate-limited or briefly unavailable → retries on CI.
- Restful-Booker is shared/public → tests are self-contained (create then clean up).

## 7. Deliverables
Automated suites, CI pipeline, published HTML report, test cases, traceability
matrix, and bug reports (this `docs/` folder).
