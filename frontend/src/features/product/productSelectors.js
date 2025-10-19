export const selectAllProducts = (state) => state.product.items;
export const selectProductStatus = (state) => state.product.status;
export const selectProductError = (state) => state.product.error;
export const selectSelectedProduct = (state) => state.product.selectedProduct;