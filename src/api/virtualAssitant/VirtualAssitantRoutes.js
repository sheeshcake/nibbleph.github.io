import Api from "../../utils/ApiRequest";

const VirtualAssitantRoutes = {
  fetchAllTask: (id) => {
    return Api.get(`virtual-assistant/orders/task/${id}`).then((r) => r.data);
  },

  updateStatus: async (payload) => {
    return await Api.post(`virtual-assistant/orders/task/status`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },

  downloadPdf: async (payload) => {
    return await Api.post(`virtual-assistant/download-pdf`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },
  
};

export default VirtualAssitantRoutes;
