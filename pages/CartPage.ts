import { type Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartSelectors } from '../data/selectors';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator(CartSelectors.cartItems);
    this.checkoutButton = page.locator(CartSelectors.checkoutButton);
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeByName(name: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: name });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
