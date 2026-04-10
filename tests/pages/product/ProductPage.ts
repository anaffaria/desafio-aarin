import { expect, Page } from '@playwright/test';
import { productElements } from './productElements';

export class ProductPage {
	constructor(private page: Page) {}

	async selectProductVariation(optionVariationProduct: string | RegExp) {
		const variationProduct = this.page
			.getByRole('radio', {
				name: optionVariationProduct
			})
			.last();

		await expect(variationProduct).not.toBeEmpty();

		await variationProduct.click({ timeout: 3000 });

		await variationProduct.setChecked(true, { timeout: 3000 });

		await expect(variationProduct).toHaveClass(/\bselected\b/);
	}

	async informedQuantityProducts(quantity: number) {
		const quantityInput = this.page.locator(productElements.inputQtdProducts);

		await expect(quantityInput).toBeVisible();
		await quantityInput.fill(quantity.toString());
		await expect(quantityInput).toHaveValue(quantity.toString());
	}

	async clickBuyButton(state: boolean) {
		const btnBuy = this.page.locator(productElements.btnBuy);

		await expect(btnBuy).toBeVisible();

		if (state) {
			await expect(btnBuy).not.toHaveClass(/disabled/);
			await btnBuy.click();
		} else {
			await expect(btnBuy).toHaveClass(/disabled/);
		}
	}

	async clickSeeCart() {
		const seeCartButton = this.page.locator(productElements.seeCart).last();

		await seeCartButton.click();

		await expect(this.page).toHaveURL(/carrinho/);
		await this.page.waitForLoadState('networkidle');
	}
}
