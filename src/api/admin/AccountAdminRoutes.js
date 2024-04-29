import Api from "../../utils/ApiRequest";

const AccountAdminRoutes = {


  fetchUserById: async (id) => {
    return Api.get(`/admin/user/${id}`).then((r) => r.data);
  },

  fetchLeaderBoard: async () => {
    return Api.get(`/admin/dashboard/top-buyers`).then((r) => r.data);
  },

  fetchUserOrderById: async (id, search, page, perPage) => {
    return Api.get(
      `/admin/orders/user/${id}?search=${search}&page=${page}&per_size=${perPage}`
    ).then((r) => r.data);
  },

  getVirtualAssistants: (page, perPage) => {
    return Api.get(
      `/admin/dashboard/va?pageParam=${page}&pageSize=${perPage}&roles=VA`
    ).then((r) => r.data);
  },

  getVirtualAssistantTasks: async (id, search, page, perPage) => {
    return Api.get(
      `admin/account/virtual-assistant/task/${id}?search=${search}&page=${page}&per_size=${perPage}`
    ).then((r) => r.data);
  },

  updateUser: async (data) => {
    return Api.post(`/admin/user/update`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },

  deleteUser: async (id) => {
    return Api.get(`/admin/user/delete/${id}`).then((r) => r.data);
  },

  updateUserStatus: async (user_id, status) => {
    console.log("status", status);
    return Api.post(`/admin/user/activate`, {
      user_id: user_id,
      status: status,
    }).then((r) => r.data);
  },
};

export default AccountAdminRoutes;
