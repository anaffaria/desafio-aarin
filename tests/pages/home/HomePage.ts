import { expect, Page } from '@playwright/test';
import { homeElements } from './homeElements';

export class HomePage {
	constructor(private page: Page) {}

	async waitProductGridLoad() {
		await this.page.evaluate(() => window.localStorage.clear());
		await this.page.evaluate(() => window.sessionStorage.clear());
		await this.page.context().clearCookies();
		await expect(this.page.locator(homeElements.productGrid)).toBeVisible();
	}

	async selectProduct(productId: string, productName: string) {
		const product = this.page
			.locator(homeElements.dataProductId(productId))
			.first();

		await product.click();

    await this.page.waitForLoadState('networkidle');

    await expect(this.page.locator(homeElements.productTitle)).toContainText(
      productName
    );
  }
}
