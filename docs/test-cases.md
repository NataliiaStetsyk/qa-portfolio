# Test Cases — SauceDemo

| ID | Area | Title | Steps | Expected Result | Priority | Type |
|----|------|-------|-------|-----------------|----------|------|
| TC-01 | Auth | Valid login | Enter `standard_user` / `secret_sauce`, submit | Redirected to inventory page | P1 | Functional |
| TC-02 | Auth | Locked-out user | Login as `locked_out_user` | Error: user has been locked out | P1 | Negative |
| TC-03 | Auth | Wrong password | Valid user + wrong password | Error: username and password do not match | P2 | Negative |
| TC-04 | Auth | Empty fields | Submit empty form | Error: Username is required | P2 | Boundary |
| TC-05 | Inventory | Catalog loads | Log in | Exactly 6 products visible | P1 | Functional |
| TC-06 | Inventory | Add to cart | Add "Sauce Labs Backpack" | Cart badge shows 1 | P1 | Functional |
| TC-07 | Inventory | Sort by price asc | Select "Price (low to high)" | Prices ascending | P2 | Functional |
| TC-08 | Cart | Items persist | Add 2 items, open cart | Both items listed | P1 | Integration |
| TC-09 | Cart | Remove item | Remove 1 of 2 items | 1 item remains | P2 | Functional |
| TC-10 | Checkout | Happy path | Add item, checkout, fill info, finish | "Thank you for your order" | P1 | E2E |
| TC-11 | Checkout | Missing ZIP | Leave postal code empty | Error: Postal Code is required | P2 | Boundary |
| TC-API-01 | API | Auth token | POST /auth with valid creds | 200 + token returned | P1 | API |
| TC-API-02 | API | Create booking | POST /booking | 200 + bookingid + echoed fields | P1 | API |
| TC-API-03 | API | Read booking | GET /booking/{id} | 200 + correct data | P1 | API |
| TC-API-04 | API | Update booking | PUT /booking/{id} with token | 200 + updated fields | P2 | API |
| TC-API-05 | API | Delete unauthorized | DELETE without token | 403 Forbidden | P2 | Negative |
| TC-API-06 | API | Delete booking | DELETE /booking/{id} with token | 201, then GET returns 404 | P2 | API |
