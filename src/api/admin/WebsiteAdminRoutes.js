import Api from '../../utils/ApiRequest'


const WebsiteAdminRoutes = {

    updateWebsite: async(data, id) =>{
        return await Api.post(`/admin/website/update/${id}`,data,{
            headers: {
                "Content-Type": "application/json",
              },
        }).then((r) => r.data)
    },
    fetchCategories: async(data) =>{
        return await Api.get(`/fetch-categories`,data,{
          headers:{
            "Content-Type": "application/json",
          }
        }).then((r) =>r.data)
      },

      fetchWebsite: async(id) =>{
        return await Api.get(`/admin/website/${id}`).then((r) =>r.data)
      },

      fetchAllWebsites: async() =>{
        return await Api.get(`/admin/websites`).then((r) => r.data)
      },

      deleteWebsite: async (id) =>{
        return await Api.get(`/website/delete/${id}`).then((r) => r.data)
      },

      fetchRecentOrders: async() =>{
        return await Api.get(`/admin/dashboard/recent-order`).then((r) => r.data)
      },

      fetchChart: async (fromDate, toDate) =>{
        return await Api.post(`/admin/dashboard/top-websites-sales`,{
          fromDate: fromDate,
          toDate:  toDate
        }).then((r) => r.data )
      },
      
      fetchProductSold: async () =>{
        return await Api.get(`/admin/dashboard/total-order`).then((r) => r.data)
      },

      fetchTotalSales: async() =>{
        return await Api.get(`/admin/dashboard/total-sales`).then((r) => r.data )
      },

      fetchTotalUsers: async() =>{
        return await Api.get(`/admin/dashboard/total-users`).then((r) =>r.data)
      }

}

export default WebsiteAdminRoutes;