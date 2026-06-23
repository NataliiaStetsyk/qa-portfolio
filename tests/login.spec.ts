import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginData, LoginMessages } from '../data/testData';

test.describe('Authentication', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('valid user can log in and reaches inventory', async ({ page }) => {
    await login.login(LoginData.standardUser.username, LoginData.standardUser.password);
    await new InventoryPage(page).waitForLoad();
  });

  test('locked-out user is blocked with a clear error', async () => {
    await login.login(LoginData.lockedOutUser.username, LoginData.lockedOutUser.password);
    expect(await login.getErrorText()).toContain(LoginMessages.lockedOut);
  });

  test('wrong password is rejected', async () => {
    await login.login(LoginData.standardUser.username, LoginData.invalidPassword);
    expect(await login.getErrorText()).toContain(LoginMessages.invalidPassword);
  });

  test('empty credentials show a required-field error', async () => {
    await login.login('', '');
    expect(await login.getErrorText()).toContain(LoginMessages.requiredUsername);
  });
});
