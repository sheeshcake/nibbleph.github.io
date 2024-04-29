import  Api  from "../../src/utils/ApiRequest";

const dashboardRoutes = {
  addWebsite: async (data) => {
    return await Api.post(`/websites`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },

  getTableData: async () => {
    return await Api.get(`/posts`).then((r) => r.data);
  },


  fetchWebsites: async (paginated,search, page, perPage) => {
    return await Api.get('/websites/all' , {
      paginated: paginated,
      search: search,
      pageSize: perPage,
      pageParam: page,
    }).then((r) => r.data);
  },

  
fetchDealsOfTheWeek: async (page_size, website_id) =>{
    return await Api.get(`/user/guest-post/top-deals`,{
      page_size: page_size,
      website_id: website_id
    }).then((r) =>r.data)
  },

  fetchRecentlyAdded: async (search, pageSize, pageParam) =>{
    return await Api.get(`/user/guest-post/recent`,{
      search: search,
      pageSize: pageSize,
      pageParam: pageParam
    }).then((r) =>r.data)
  },

  fetchInventory: async(search,pageSize,pageParam) =>{
    return await Api.get(`/user/guest-post/inventories/`,{
      search: search,
      pageSize: pageSize,
      pageParam: pageParam
    }).then((r) =>r.data)
  },

  fetchMySite : async (paginated) =>{
    return await Api.get('/user/guest-post/inventories/websites/',{
      paginated: paginated
    }).then((r) =>r.data)
  },

  fetchMySiteById: async (id) =>{
    return await Api.get(`user/dashboard/websites/show/${id}`).then((r)=> r.data)
  },

  fetchMyNotification: async (pageSize) =>{
    return await Api.get('user/notification',{
      pageSize: pageSize
    }).then((r) => r.data)
  },

  readNotification: async (data) => {
    return await Api.post(`user/notification/seen`,{ids: data},{

    }).then((r) => r.data)
  }
  
};

export default dashboardRoutes;
