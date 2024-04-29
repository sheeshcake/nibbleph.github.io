import { createSlice } from "@reduxjs/toolkit";
import LinkJuiceRoutes from "../../../api/admin/LinkJuiceRoutes";

//initial state
const initialState = {
  linkJuiceWebsites: [],
  isLoading: true,
  hasError: false,
  error: null,
};

//create slice
export const slice = createSlice({
  name: "linkjuicewebsites",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getLinkJuiceWebsites: (state, action) => {
      state.linkJuiceWebsites = action.payload;
      state.success = true;
      state.hasError = false;
    },
  },
});

export const { startLoading, getLinkJuiceWebsites, } =
  slice.actions;

export default slice.reducer;

export const fetchLinkJuiceWebsites = (search,pageSize,pageParam) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    
    try {
      const result = await LinkJuiceRoutes.fetchWebsites(search,pageSize,pageParam).then((r) =>r)
      if (result) {
          dispatch(getLinkJuiceWebsites(result))
      }
    } catch (error) {

    }
  };
};
