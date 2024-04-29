import Api from "../../utils/ApiRequest";

const pointsRoute = {

  fetchUserListPoints: async (per_size) => {
    return await Api.get(`/admin/points/users/user-list`, {
    per_size: per_size
    }).then((r) => r.data);
  },

  updateUserPoints: async (payload) =>{
    return await Api.post(`admin/points/users/update`, payload,{
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data)
  },

  fetchPointsById: async (id) =>{
    return await Api.get(`/admin/points/users`,{
      user_id: id
    }).then((r) => r.data)
  }



};


export default pointsRoute;
