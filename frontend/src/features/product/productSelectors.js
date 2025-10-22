export const selectAllProducts = (state) => state.products.items;
export const selectProductTotalPages = (state) => state.products.totalPages;
export const selectProductCurrentPage = (state) => state.products.currentPage;

export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;