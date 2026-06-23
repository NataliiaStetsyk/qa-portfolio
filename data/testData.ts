export const LoginData = {
  standardUser: {
    username: process.env.LOGIN_STANDARD_USER ?? 'standard_user',
    password: process.env.LOGIN_PASSWORD ?? 'secret_sauce',
  },
  lockedOutUser: {
    username: process.env.LOGIN_LOCKED_OUT_USER ?? 'locked_out_user',
    password: process.env.LOGIN_PASSWORD ?? 'secret_sauce',
  },
  invalidPassword: 'wrong_password',
};

export const InventoryData = {
  expectedItemCount: 6,
  productNames: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
  },
  sortLabels: {
    priceLowToHigh: 'Price (low to high)',
  },
};

export const CartData = {
  initialItemCount: 0,
  expectedItemCountAfterRemove: 1,
};

export const CheckoutData = {
  firstName: process.env.CHECKOUT_FIRST_NAME ?? 'Nataliia',
  lastName: process.env.CHECKOUT_LAST_NAME ?? 'Stetsyk',
  postalCode: process.env.CHECKOUT_POSTAL_CODE ?? '66067',
  requiredPostalCodeError: 'Postal Code is required',
  successMessage: /Thank you for your order/i,
};

export const LoginMessages = {
  lockedOut: 'Sorry, this user has been locked out',
  invalidPassword: 'Username and password do not match',
  requiredUsername: 'Username is required',
};

export const ApiData = {
  baseUrl: process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com',
  credentials: {
    username: process.env.API_USERNAME ?? 'admin',
    password: process.env.API_PASSWORD ?? 'password123',
  },
  bookingPayload: {
    firstname: 'Nataliia',
    lastname: 'Stetsyk',
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-07-01', checkout: '2026-07-05' },
    additionalneeds: 'Late checkout',
  },
  updatedBookingPayload: {
    firstname: 'Nataliia',
    lastname: 'Updated',
    totalprice: 200,
    depositpaid: false,
    bookingdates: { checkin: '2026-07-01', checkout: '2026-07-06' },
  },
};
