import { expect, Page } from '@playwright/test';
import { headerElements } from './headerElements';

export class HeaderPage {
  constructor(private page: Page) {}

  async validateProductAddedToMiniCart(qtdProductAdded: number) {
    const miniCartQtdProduct = this.page
      .locator(headerElements.miniCartQtd)
      .first();
    await expect(miniCartQtdProduct).toBeVisible();
    await expect(miniCartQtdProduct).toHaveText(qtdProductAdded.toString());
  }
}
