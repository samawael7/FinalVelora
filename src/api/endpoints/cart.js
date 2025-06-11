export const cartEndpoints = {
  updateCart: "/Cart/Update-Cart",
  getCart: (cartId) => `/Cart/${cartId}`,
  clearCart: (cartId) => `/Cart/clear/${cartId}`,
  addToCart: (cartId) => `/Cart/Add-To-Cart/${cartId}`,
  removeFromCart: (productId) => `/Cart/Remove-From-Cart/${productId}`,
};
