import { expect, Page } from '@playwright/test';
import { cartElements } from './cartElements';

export class CartPage {
	constructor(private page: Page) {}

	async performCartAction(
		action: 'remove' | 'update' | 'applyCoupon' | 'invalidUpdate'
	) {
		switch (action) {
			case 'remove': {
				const removeButton = this.page
					.locator(cartElements.removeProductButton)
					.first();

				await expect(removeButton).toBeVisible();
				await removeButton.click();
				break;
			}

			case 'update': {
				const updateButton = this.page
					.locator(cartElements.inputUpdateCart)
					.first();

				await expect(updateButton).toBeVisible();
				await updateButton.click({ force: true });
				break;
			}

			case 'applyCoupon': {
				const applyCouponButton = this.page
					.locator(cartElements.applyCouponButton)
					.first();

				await expect(applyCouponButton).toBeVisible();
				await applyCouponButton.click({ force: true });
				break;
			}

			case 'invalidUpdate': {
				const updateButton = this.page.locator(cartElements.inputUpdateCart);

				await expect(updateButton).toBeVisible();
				await updateButton.click({ force: true });
				break;
			}
		}
	}

	async informedQuantityProducts(quantity: number) {
		const quantityInput = this.page.locator(cartElements.inputQtdProducts);

		await expect(quantityInput).toBeVisible();
		await quantityInput.fill(quantity.toString());
		await expect(quantityInput).toHaveValue(quantity.toString());
	}

	async validateEmptyCartMessage(messageExpected: string) {
		const cartMessage = this.page.locator(cartElements.infoCartEmpty);

		await expect(cartMessage).toBeVisible();
		await expect(cartMessage).toContainText(messageExpected);
	}

	async validateNotHaveElement() {
		const cartMessage = this.page.locator(cartElements.infoCartMessage);

		await expect(cartMessage).not.toBeVisible();
	}

	async insertCoupon(cupom: string) {
		const couponInput = this.page.locator(cartElements.couponInput);

		await expect(couponInput).toBeVisible();
		await couponInput.fill(cupom);
		await expect(couponInput).toHaveValue(cupom);
	}

	async validateMessageCouponInvalid(messageExpected: string) {
		const messageInvalidCoupon = this.page.locator(
			cartElements.errorCartMessage
		);
		await expect(messageInvalidCoupon).toBeVisible();
		await expect(messageInvalidCoupon).toContainText(messageExpected);
	}
}
