import Api from "../../utils/ApiRequest";

const couponRoutes = {
    createCoupon: async (payload) => {
        return await Api.post(`/admin/coupons/create`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((r) => r.data);
      },

      fetchCoupon: async (search, page, perPage) => {
        return await Api.get(`/admin/coupons`, {
          search: search,
          pageSize: perPage,
          pageParam: page,
        }).then((r) => r.data);
      },

      updateCouponStatus: async(id,status) =>{
        return await Api.post(`/admin/coupons/status`,{
          id: id,
          status: status
        }).then((r) => r.data)
      },
      

      deleteCoupon: async(id) =>{
        return await Api.post(`/admin/coupons/delete`,{
          id:id
        }).then((r) =>r.data)
      },

      fetchCouponById: async(id) =>{
        return await Api.get(`/admin/coupons/show/${id}`).then((r) =>r.data)
      },

      updateCouponById: async(id,data) =>{
        return await Api.post(`/admin/coupons/update/${id}`,data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((r) => r.data)
      }
};

export default couponRoutes;
