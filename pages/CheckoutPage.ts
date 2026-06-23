import { type Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutSelectors } from '../data/selectors';

export class CheckoutPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator(CheckoutSelectors.firstName);
    this.lastName = page.locator(CheckoutSelectors.lastName);
    this.postalCode = page.locator(CheckoutSelectors.postalCode);
    this.continueButton = page.locator(CheckoutSelectors.continueButton);
    this.finishButton = page.locator(CheckoutSelectors.finishButton);
    this.errorMessage = page.locator(CheckoutSelectors.errorMessage);
    this.completeHeader = page.locator(CheckoutSelectors.completeHeader);
  }

  async fillInfo(first: string, last: string, zip: string): Promise<void> {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async getErrorText(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.innerText();
  }

  async getCompleteText(): Promise<string> {
    await this.completeHeader.waitFor({ state: 'visible' });
    return this.completeHeader.innerText();
  }
}
