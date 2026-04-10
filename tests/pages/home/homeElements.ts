export const homeElements = {
  productGrid: '.tab-pane.active',
  dataProductId: (productId: string) =>
    `.product-block[data-product-id="${productId}"]`,
  productTitle: '.product_title.entry-title'
};
