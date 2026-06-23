import { type Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppRoutes, LoginSelectors } from '../data/selectors';

export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator(LoginSelectors.username);
    this.password = page.locator(LoginSelectors.password);
    this.loginButton = page.locator(LoginSelectors.loginButton);
    this.errorMessage = page.locator(LoginSelectors.errorMessage);
  }

  async goto() {
    await this.open(AppRoutes.login);
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async getErrorText(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.innerText();
  }
}
