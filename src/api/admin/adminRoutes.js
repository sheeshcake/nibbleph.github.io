import Api from "../../utils/ApiRequest";

const adminRoutes = {

  downloadPdf: async (id) => {
    return await Api.get(`/admin/download-pdf/${id}`).then((r) => r.data);
  },

  createWebsite: async (data) => {
    return await Api.post(`/admin/websites`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },

  createNotifyUser: async (data) => {
    return await Api.post(`/admin/notification/notify/create`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },

  createAccount: async (data) => {
    return await Api.post(`/admin/add`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },

  fetchCategories: async (data) => {
    return await Api.get(`/fetch-categories`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },

  fetchUserAccounts: async (search, page, perPage) => {
    return await Api.get(`/admin/users`, {
      search: search,
      pageSize: perPage,
      pageParam: page,
    }).then((r) => r.data);
  },

  fetchNotifyUsers: async (search, page, perPage) => {
    return await Api.get(`/admin/notification/notify`, {
      search: search,
      pageSize: perPage,
      pageParam: page,
    }).then((r) => r.data);
  },


  createServerMaintenance: async (data) => {
    return await Api.post(`/admin/maintenance/set`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },

  updateServerMaintenance: async (id, data) => {
    return await Api.post(`/admin/maintenance/update/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },

  getAllServerMaintenance: async (search, page, perPage) => {
    return await Api.get(
      `/admin/maintenance/get?search=${search}&page=${page}&per_size=${perPage}`,
      {
        search: search,
        pageSize: perPage,
        pageParam: page,
      }
    ).then((r) => r.data);
  },

  getServerMaintenanceById: async (id) => {
    return await Api.get(`/admin/maintenance/show/${id}`).then((r) => r.data);
  },

  deleteServerMaintenance: async (id) => {
    return await Api.post(`/admin/maintenance/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },
};

export default adminRoutes;
