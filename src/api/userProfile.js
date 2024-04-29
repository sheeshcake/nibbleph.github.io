import  Api  from "../utils/ApiRequest";

const userProfile ={
    updateUser: async (data) => {
        return await Api.post(`/user/update`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((r) => r.data);
      },


    fetchUser: async () => {
        return Api.get("/user").then((r) => r.data);
      },

      verifyToken: async (id) => {
        return await Api.get(`/auth/checkauth`).then((r) => r.data);
    },

    getCreditPoints: async(data) =>{
      return Api.get("/user/guest-post/checkout/points/user-points",{
        user_id: data
      }).then((r) => r.data);
    },

    getHistoryList: async(data) =>{
      return Api.get("user/history-points/list").then((r) => r.data)
    }


    
}

export default userProfile;