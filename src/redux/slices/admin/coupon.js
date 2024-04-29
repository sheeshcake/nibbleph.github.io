import { createSlice } from "@reduxjs/toolkit";
import couponRoutes from "../../../api/admin/couponRoutes";

//initial state
const initialState = {
  couponData: [],
  isLoading: true,
  hasError: false,
  error: null,
  
};

//create slice
export const slice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCouponData: (state, action) => {
      state.couponData = action.payload;
      state.success = true;
      state.hasError = false;
    },

 
  },
});

export const { startLoading, getCouponData, } =
  slice.actions;

export default slice.reducer;

export const fetchCouponData = (search,pageSize,pageParam) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    
    try {
      const result = await couponRoutes.fetchCoupon(search,pageSize,pageParam).then((r) =>r)
      if (result) {
          dispatch(getCouponData(result))
      }
    } catch (error) {

    }
  };
};
