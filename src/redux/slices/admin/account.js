import { createSlice } from "@reduxjs/toolkit";
import adminRoutes from "../../../api/admin/adminRoutes";

//initial state
const initialState = {
  accountData: [],
  isLoading: true,
  hasError: false,
  error: null,
  allAccountData: [],
  countryName: null,
};

//create slice
export const slice = createSlice({
  name: "account",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getAccountData: (state, action) => {
      state.accountData = action.payload;
      state.success = true;
      state.hasError = false;
    },

    setAccountData: (state, action) => {
      state.allAccountData = action.payload;
      state.success = true;
      state.hasError = false;
    },

    setCountryName: (state, action) => {
      state.countryName = action.payload;
      state.success = true;
      state.hasError = false;
    },
  },
});

export const { startLoading, getAccountData, setAccountData, setCountryName } =
  slice.actions;

export default slice.reducer;

export const fetchAccountData = (search, page, perPage) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const result = await adminRoutes
        .fetchUserAccounts(search, page, perPage)
        .then((r) => r);
      const initialValues = {
        firstname: "",
        lastname: "",
        role: "",
        billing_address: "",
        paypal_email: "",
        verified: "",
        company_name: "",
        status: "",
      };
      if (result) {
        dispatch(
          setAccountData(result) ? setAccountData(result) : initialValues
        );
      }
    } catch (error) {}
  };
};

export const setCountryData = (data) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      dispatch(setCountryName(data));
    } catch (error) {}
  };
};
