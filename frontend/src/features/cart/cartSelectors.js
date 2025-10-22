import { formatPrice } from "../../utils/formatPrice.js";

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsCount = (state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

export const selectCartFormattedSubtotal = (state) => formatPrice(state.cart.summary?.subtotal ?? 0);

export const selectCartFormattedDiscount = (state) => formatPrice(state.cart.summary?.discount ?? 0);

export const selectCartFormattedTax = (state) => formatPrice(state.cart.summary?.tax ?? 0);

export const selectCartFormattedTotal = (state) => formatPrice(state.cart.summary?.total ?? 0);

export const selectCartStatus = (state) => state.cart.status;

export const selectCartError = (state) => state.cart.error;