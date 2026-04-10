import { test } from '@playwright/test';
import { HomePage } from '../pages/home/HomePage';
import { ProductPage } from '../pages/product/ProductPage';
import { HeaderPage } from '../pages/header/HeaderPage';

test.describe('Suite de testes de Produto', () => {
	let homePage: HomePage;
	let headerPage: HeaderPage;
	let productPage: ProductPage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		headerPage = new HeaderPage(page);
		productPage = new ProductPage(page);
		await page.goto('http://lojaebac.ebaconline.art.br/');
		await homePage.waitProductGridLoad();
	});

	test('Adicionar produto ao carrinho', async () => {
		await homePage.selectProduct('4104', 'Ingrid Running Jacket');
		await productPage.selectProductVariation('XS');
		await productPage.selectProductVariation('Red');
		await productPage.informedQuantityProducts(1);
		await headerPage.validateProductAddedToMiniCart(0);
		await productPage.clickBuyButton(true);
		await headerPage.validateProductAddedToMiniCart(1);
		await productPage.clickSeeCart();
	});

	test('Não permitir inserção no carrinho com quantidade 0', async () => {
		await homePage.selectProduct('4104', 'Ingrid Running Jacket');
		await productPage.selectProductVariation('XS');
		await productPage.selectProductVariation('Red');
		await productPage.informedQuantityProducts(0);
		await headerPage.validateProductAddedToMiniCart(0);
		await productPage.clickBuyButton(true);
		await headerPage.validateProductAddedToMiniCart(0);
	});

	test('Não permitir inserção no carrinho maior que estoque disponível', async () => {
		await homePage.selectProduct('4104', 'Ingrid Running Jacket');
		await productPage.selectProductVariation('XS');
		await productPage.selectProductVariation('Red');
		await productPage.informedQuantityProducts(101);
		await headerPage.validateProductAddedToMiniCart(0);
		await productPage.clickBuyButton(true);
		await headerPage.validateProductAddedToMiniCart(0);
	});

	test('Não permitir inserção no carrinho sem informar tamanho', async () => {
		await homePage.selectProduct('4104', 'Ingrid Running Jacket');
		await productPage.selectProductVariation('Red');
		await productPage.clickBuyButton(false);
	});

	test('Não permitir inserção no carrinho sem informar cor', async () => {
		await homePage.selectProduct('4104', 'Ingrid Running Jacket');
		await productPage.selectProductVariation('XS');
		await productPage.clickBuyButton(false);
	});
});
