import  Api  from "../../src/utils/ApiRequest";

const paymentRoutes = {
  fetchPaymentIntent: async (data) => {
    return await Api.post(`/stripe/payment-intent`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) => r.data);
  },

  confirmPayment: async (data) => {
      return await Api.post('/stripe/confirm-payment', data, {
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(r => r.data);
  }
};

export default paymentRoutes;
