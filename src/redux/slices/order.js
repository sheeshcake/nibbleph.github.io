import { createSlice } from "@reduxjs/toolkit";
import OrderRoutes from "../../api/OrderRoutes";

const initialState = {
  orders: [],
  adminOrders: [],
  isLoading: true,
  hasError: false,
  error: null,
};

export const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getOrders: (state, action) => {
      state.orders = action.payload;
      state.success = true;
      state.hasError = false;
    },

    setAdminOrders: (state, action) => {
      state.adminOrders = action.payload;
      state.success = true;
      state.hasError = false;
    },
  },
});

export const { getOrders, setAdminOrders } = slice.actions;

export default slice.reducer;

export const fetchOrders = (search,pageSize,pageParam) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const result = await OrderRoutes.FetchOrders(search,pageSize,pageParam).then((r) => r);
      if (result) {
        dispatch(getOrders(result));
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const fetchAdminOrders = (search, page, perPage, paginated = false) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const result = await OrderRoutes.fetchAdminOrders(
        search,
        page,
        perPage,
        Number(paginated)
      ).then((r) => {
        return r;
      });
      if (result) {
        dispatch(setAdminOrders(result));
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};
