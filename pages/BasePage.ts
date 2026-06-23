import { Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async open(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
