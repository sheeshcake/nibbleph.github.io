import Api from '../utils/ApiRequest';

const checkoutRoutes = {
    submitOrder: async(data) => {
        return await Api.post(`/submitOrder`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          }).then((r) => r.data);
    },
  
    
    redeemCoupon: async (payload) =>{

      return await Api.post(`/user/guest-post/checkout/coupon`,{
        coupon_code: payload.coupon_code,
        website_id: payload.website_id
      }).then((r) =>r.data);
    },

    updateOrderInfo: async(data) =>{
      return await Api.post(`/user/orders/update`,data,{
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) =>r.data)
    }
}

export default checkoutRoutes;