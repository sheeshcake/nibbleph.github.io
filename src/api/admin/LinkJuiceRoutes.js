import Api from "../../utils/ApiRequest";

const LinkJuiceRoutes = {
  fetchWebsites: async (search, page, perPage) => {
    return await Api.get(`/admin/link-juice/websites`, {
      search: search,
      pageSize: perPage,
      pageParam: page,
    }).then((r) => r.data);
  },
  fetchPlans: async (search, page, perPage) => {
    return await Api.get(`/admin/link-juice/plans`, {
      search: search,
      pageSize: perPage,
      pageParam: page,
    }).then((r) => r.data);
  },
  createPlan: async (payload) => {
    return await Api.post(`/admin/link-juice/plans/store`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },
  updatePlan: async (id, payload) => {
    return await Api.post(`/admin/link-juice/plans/update/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },
  deactivatePlan: async (id) => {
    return await Api.get(`/admin/link-juice/plans/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },
};

export default LinkJuiceRoutes;
