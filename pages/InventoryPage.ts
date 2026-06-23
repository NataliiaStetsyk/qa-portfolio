import { type Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventorySelectors } from '../data/selectors';

export class InventoryPage extends BasePage {
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.locator(InventorySelectors.items);
    this.cartBadge = page.locator(InventorySelectors.cartBadge);
    this.cartLink = page.locator(InventorySelectors.cartLink);
    this.sortDropdown = page.locator(InventorySelectors.sortDropdown);
  }

  async waitForLoad(): Promise<void> {
    await this.items.first().waitFor({ state: 'visible' });
  }

  async addToCartByName(name: string): Promise<void> {
    const item = this.items.filter({ hasText: name });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async getCartCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) return 0;
    return Number(await this.cartBadge.innerText());
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.page.locator(InventorySelectors.priceText).allInnerTexts();
    return texts.map((value) => Number(value.replace('$', '')));
  }
}
