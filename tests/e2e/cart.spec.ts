import { test } from '@playwright/test';
import { HomePage } from '../pages/home/HomePage';
import { ProductPage } from '../pages/product/ProductPage';
import { HeaderPage } from '../pages/header/HeaderPage';
import { CartPage } from '../pages/cart/CartPage';

test.describe('Suite de testes de Carrinho', () => {
	let homePage: HomePage;
	let headerPage: HeaderPage;
	let productPage: ProductPage;
	let cartPage: CartPage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		headerPage = new HeaderPage(page);
		productPage = new ProductPage(page);
		cartPage = new CartPage(page);

		await page.goto('http://lojaebac.ebaconline.art.br/');
		await homePage.waitProductGridLoad();

		await homePage.selectProduct('4078', 'Augusta Pullover Jacket');
		await productPage.selectProductVariation('S');
		await productPage.selectProductVariation('Blue');
		await productPage.informedQuantityProducts(1);
		await headerPage.validateProductAddedToMiniCart(0);
		await productPage.clickBuyButton(true);
		await headerPage.validateProductAddedToMiniCart(1);
		await productPage.clickSeeCart();
	});

	test('Ir para a página de checkout', async () => {});

	test('Remove produto do carrinho', async () => {
		await headerPage.validateProductAddedToMiniCart(1);
		await cartPage.performCartAction('remove');
		await cartPage.validateEmptyCartMessage('Seu carrinho está vazio');
		await headerPage.validateProductAddedToMiniCart(0);
	});

	test('Esvazia sacola ao atualizar a quantidade para 0', async () => {
		await cartPage.informedQuantityProducts(0);
		await cartPage.performCartAction('update');
		await cartPage.validateEmptyCartMessage('Seu carrinho está vazio');
	});

	test('Não permitir quantidade maior que estoque disponível', async () => {
		await cartPage.informedQuantityProducts(101);
		await cartPage.performCartAction('update');
		await cartPage.validateNotHaveElement();
	});

	test('Não permitir cupom inexistente', async () => {
		await cartPage.insertCoupon('CUPOM');
		await cartPage.performCartAction('applyCoupon');
		await cartPage.validateMessageCouponInvalid(
			'O cupom "' + 'cupom' + '" não existe!'
		);
	});

	test('Não permitir cupom vazio', async () => {
		await cartPage.insertCoupon('');
		await cartPage.performCartAction('applyCoupon');
		await cartPage.validateMessageCouponInvalid('Informe o código do cupom.');
	});
});
