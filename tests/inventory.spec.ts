import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginData, InventoryData } from '../data/testData';

let inventory: InventoryPage;

const login = async (page: Page) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(LoginData.standardUser.username, LoginData.standardUser.password);
};

test.describe('Inventory', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    inventory = new InventoryPage(page);
    await inventory.waitForLoad();
  });

  test('shows the full product catalog', async () => {
    await expect(inventory.items).toHaveCount(InventoryData.expectedItemCount);
  });

  test('adding an item updates the cart badge', async () => {
    expect(await inventory.getCartCount()).toBe(0);
    await inventory.addToCartByName(InventoryData.productNames.backpack);
    expect(await inventory.getCartCount()).toBe(1);
  });

  test('sorting by price (low to high) orders items correctly', async () => {
    await inventory.sortBy(InventoryData.sortLabels.priceLowToHigh);
    const numeric = await inventory.getPrices();
    expect(numeric).toEqual([...numeric].sort((a, b) => a - b));
  });
});
