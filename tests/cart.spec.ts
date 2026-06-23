import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { LoginData, InventoryData, CartData } from '../data/testData';

const login = async (page: Page) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(LoginData.standardUser.username, LoginData.standardUser.password);
};

test.describe('Cart', () => {
  test('items added on inventory appear in the cart', async ({ page }) => {
    await login(page);
    const inventory = new InventoryPage(page);
    await inventory.addToCartByName(InventoryData.productNames.backpack);
    await inventory.addToCartByName(InventoryData.productNames.bikeLight);
    await inventory.openCart();

    const cart = new CartPage(page);
    expect(await cart.getItemCount()).toBe(2);
  });

  test('removing an item updates the cart', async ({ page }) => {
    await login(page);
    const inventory = new InventoryPage(page);
    await inventory.addToCartByName(InventoryData.productNames.backpack);
    await inventory.addToCartByName(InventoryData.productNames.bikeLight);
    await inventory.openCart();

    const cart = new CartPage(page);
    await cart.removeByName(InventoryData.productNames.backpack);
    expect(await cart.getItemCount()).toBe(CartData.expectedItemCountAfterRemove);
  });
});
