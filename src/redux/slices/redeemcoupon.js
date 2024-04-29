import { createSlice } from "@reduxjs/toolkit";
// import couponRoutes from "../../../api/admin/couponRoutes";
import checkoutRoutes from "../../api/checkoutRoutes";

//initial state
const initialState = {
  couponData: {},
  isLoading: true,
  hasError: false,
  error: null,
  couponAmount: 0,
  amount: null,
  couponCode: null,
  couponType: null
  
};

//create slice
export const slice = createSlice({
  name: "redeemcoupon",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getRedeemCouponData: (state, action) => {
      state.couponData = action.payload;
      state.success = true;
      state.hasError = false;
    },

    setAmountOff:(state,action) =>{
      state.couponAmount = action.payload;
      state.success = true;
      state.hasError = false;
    },
    setTotalAmountData:(state,action) =>{
      state.amount = action.payload;
      state.success = true;
      state.hasError = false;
    },

    setCouponCode:(state,action) =>{
      state.couponCode = action.payload;
      state.success = true;
      state.hasError = false;
    },
    setCouponType:(state,action) =>{
      state.couponType = action.payload;
      state.success = true;
      state.hasError = false;
    },

 
  },
});

export const { startLoading, getRedeemCouponData,setAmountOff,setTotalAmountData,setCouponCode, setCouponType } =
  slice.actions;

export default slice.reducer;

export const fetchRedeemCouponData = (coupon_code) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    
    try {
      const result = await checkoutRoutes.redeemCoupon(coupon_code).then((r) =>r)
      if (result) {
          dispatch(getRedeemCouponData(result))
      }
    } catch (error) {

    }
  };
};

export const setDiscount = (data) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(setAmountOff(data));
    } catch (error) {}
  };
};

export const setAmountToPay = (data) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(setTotalAmountData(data));
    } catch (error) {}
  };
};
export const setCouponCodeData = (data) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(setCouponCode(data));
    } catch (error) {}
  };
};

export const setCouponCodeType = (data) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(setCouponType(data));
    } catch (error) {}
  };
};
