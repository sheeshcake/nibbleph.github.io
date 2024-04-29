// eslint-disable-next-line import/no-named-as-default
import Api from "../utils/ApiRequest";

const OrderRoutes = {
  FetchOrders: async (search, pageSize, pageParam) => Api.get("/user/orders/list",{
      search,
      pageSize,
      pageParam
    }).then((r) => r.data),

  fetchAdminOrders: async (search, page, perPage, paginated = false) => Api.get(`admin/orders`, {
      search,
      pageSize: perPage,
      pageParam: page,
      paginated: Number(paginated),
    }).then((r) => r.data),

  fetchKanbanData: async () => Api.get(`admin/orders/kanban`).then((r) => r.data),

  storeKanBan: async (data) => Api.post("admin/orders/kanban", data).then((r) => r.data),

  markAsComplete: async (data) => Api.post("admin/orders/workspaces/kanban/status", data).then((r) => r.data),

};

export default OrderRoutes;
