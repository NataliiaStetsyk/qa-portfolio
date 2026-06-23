# Bug Reports

Clear, reproducible reports — the format I use so developers can act without
follow-up questions. (Examples below illustrate the format; SauceDemo seeds some
intentional bugs via its `problem_user` / `visual_user` accounts.)

---

## BUG-001 — Cart badge not updated for `problem_user`
- **Severity:** High  **Priority:** P1
- **Environment:** Chromium 130, https://www.saucedemo.com, build of {date}
- **Preconditions:** Logged in as `problem_user` / `secret_sauce`
- **Steps to reproduce:**
  1. On the inventory page, click "Add to cart" on "Sauce Labs Backpack".
  2. Observe the cart icon.
- **Expected:** Cart badge shows `1`.
- **Actual:** Badge does not appear / count does not increment.
- **Evidence:** screenshot + Playwright trace attached in CI artifacts.
- **Notes:** Reproducible 5/5. Does not occur with `standard_user`.

---

## BUG-002 — Product images identical for `problem_user`
- **Severity:** Medium  **Priority:** P2
- **Environment:** Firefox 131, inventory page
- **Steps to reproduce:**
  1. Log in as `problem_user`.
  2. Compare the thumbnail of each of the 6 products.
- **Expected:** Each product shows its own distinct image.
- **Actual:** All products render the same image (dog photo).
- **Evidence:** screenshot attached.

---

## BUG-003 — Checkout accepts whitespace-only first name
- **Severity:** Low  **Priority:** P3
- **Steps to reproduce:**
  1. Add an item and proceed to checkout.
  2. Enter a single space in First Name, valid Last Name and ZIP, continue.
- **Expected:** Validation rejects whitespace-only input.
- **Actual:** Form proceeds to the overview step.
- **Suggested fix:** trim and validate non-empty after trimming.
