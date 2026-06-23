# Requirements Traceability Matrix

Maps each requirement to its test cases and the automated spec that covers it.

| Req ID | Requirement | Test Cases | Automated Spec | Status |
|--------|-------------|-----------|----------------|--------|
| R1 | Only valid, active users can log in | TC-01, TC-02, TC-03, TC-04 | `tests/login.spec.ts` | Covered |
| R2 | The product catalog is displayed correctly | TC-05, TC-07 | `tests/inventory.spec.ts` | Covered |
| R3 | Users can add and remove products from the cart | TC-06, TC-08, TC-09 | `tests/inventory.spec.ts`, `tests/cart.spec.ts` | Covered |
| R4 | Users can complete a purchase end to end | TC-10 | `tests/checkout.spec.ts` | Covered |
| R5 | Checkout validates required customer details | TC-11 | `tests/checkout.spec.ts` | Covered |
| R6 | Booking API supports authenticated CRUD | TC-API-01..06 | `api/restful-booker.spec.ts` | Covered |
| R7 | API rejects unauthorized mutations | TC-API-05 | `api/restful-booker.spec.ts` | Covered |
