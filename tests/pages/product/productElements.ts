export const productElements = {
	inputQtdProducts: 'input.input-text.qty',
	btnBuy: 'button.single_add_to_cart_button',
	seeCart: 'div.woocommerce-message a',
	validVariationProduct: (optionVariationProduct: string) =>
		`button.variable-item-${optionVariationProduct}.selected`,
	infoCartMessage: '.woocommerce-message[role="alert"]'
};
