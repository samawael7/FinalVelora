export const paymentEndpoints = {
  createPaymentIntent: (basketId) =>
    `/Payments/create-or-update-payment-intent?basketId=${basketId}`,
};
