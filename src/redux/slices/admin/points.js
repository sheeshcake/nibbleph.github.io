import { createSlice } from "@reduxjs/toolkit";
import pointsRoutes from "../../../api/admin/pointsRoutes";

//initial state
const initialState = {
  userListData: [],
  isLoading: true,
  hasError: false,
  error: null,
  
};

//create slice
export const slice = createSlice({
  name: "points",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    userListData: (state, action) => {
      state.userListData = action.payload;
      state.success = true;
      state.hasError = false;
    },

 
  },
});

export const { startLoading, userListData, } =
  slice.actions;

export default slice.reducer;

export const fetchUserListData = (per_size) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    
    try {
      const result = await pointsRoutes.fetchUserListPoints(per_size).then((r) =>r.data)
      if (result) {
          dispatch(userListData(result))
      }
    } catch (error) {

    }
  };
};
