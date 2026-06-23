export const AppRoutes = {
  login: '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkoutStepOne: '/checkout-step-one.html',
};

export const LoginSelectors = {
  username: '[data-test="username"]',
  password: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
};

export const InventorySelectors = {
  items: '.inventory_item',
  cartBadge: '.shopping_cart_badge',
  cartLink: '.shopping_cart_link',
  sortDropdown: '[data-test="product-sort-container"]',
  priceText: '.inventory_item_price',
};

export const CartSelectors = {
  cartItems: '.cart_item',
  checkoutButton: '[data-test="checkout"]',
};

export const CheckoutSelectors = {
  firstName: '[data-test="firstName"]',
  lastName: '[data-test="lastName"]',
  postalCode: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  finishButton: '[data-test="finish"]',
  errorMessage: '[data-test="error"]',
  completeHeader: '.complete-header',
};
