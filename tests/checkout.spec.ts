import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginData, CheckoutData, InventoryData } from '../data/testData';

const loginAndAddBackpack = async (page: any) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(LoginData.standardUser.username, LoginData.standardUser.password);
  const inventory = new InventoryPage(page);
  await inventory.addToCartByName(InventoryData.productNames.backpack);
  await inventory.openCart();
  await new CartPage(page).checkout();
};

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndAddBackpack(page);
  });

  test('happy path: completes an order end to end', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await checkout.fillInfo(CheckoutData.firstName, CheckoutData.lastName, CheckoutData.postalCode);
    await checkout.finish();
    expect(await checkout.getCompleteText()).toMatch(CheckoutData.successMessage);
  });

  test('missing postal code blocks checkout with an error', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await checkout.fillInfo(CheckoutData.firstName, CheckoutData.lastName, '');
    expect(await checkout.getErrorText()).toContain(CheckoutData.requiredPostalCodeError);
  });
});
