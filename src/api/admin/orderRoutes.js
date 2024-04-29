import Api from "../../utils/ApiRequest";

const orderRoutes = {
  addAssignee: async (payload) => {
    return await Api.post(`/admin/kanban/assigned-order`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },
  removeAssignee: async (payload) => {
    return await Api.post(`/admin/kanban/remove-assigned-order`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },
};

export default orderRoutes;
