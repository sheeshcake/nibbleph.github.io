import Api from "../utils/ApiRequest";

const MySiteRoutes = {

    updateWebsite: async(data, id) =>{
        return await Api.post(`user/dashboard/websites/update/${id}`,data,{
            headers: {
                "Content-Type": "application/json",
              },
        }).then((r) => r.data)
    },
    fetchMySiteById: async (id) =>{
        return await Api.get(`user/dashboard/websites/show/${id}`).then((r)=> r.data)
      },

      websiteStatus: async (data) =>{
        return await Api.post(`user/dashboard/websites/status`,data,{
            headers: {
                "Content-Type": "application/json",
              },
        }).then((r) => r.data)
      }

};

export default MySiteRoutes;
