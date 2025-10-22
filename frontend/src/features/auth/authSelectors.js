export const selectAuthUser = (state) => state.auth.user;

export const selectAuthToken = (state) => state.auth.token;

export const selectAuthStatus = (state) => state.auth.status;

export const selectAuthError = (state) => state.auth.error;

export const selectAuthSuccessMessage = (state) => state.auth.successMessage;

export const selectAuthIsAuthenticated = (state) => !!state.auth.token;

export const selectAuthIsAdmin = (state) => state.auth.user?.isAdmin ?? false;