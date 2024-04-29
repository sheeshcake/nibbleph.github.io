import { createSlice } from '@reduxjs/toolkit';
import LinkJuiceRoutes from '../../../api/admin/LinkJuiceRoutes';

//initial state
const initialState = {
  linkJuicePlans: [],
  plan: {},
  isLoading: true,
  hasError: false,
  error: null,
};

//create slice
export const slice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getLinkJuicePlans: (state, action) => {
      state.linkJuicePlans = action.payload;
      state.success = true;
      state.hasError = false;
    },

    setPlan: (state, action) => {
      state.plan = action.payload;
    },
  },
});

export const { startLoading, getLinkJuicePlans, setPlan } = slice.actions;

export default slice.reducer;

export const fetchLinkJuicePlans = (search, pageSize, pageParam) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const result = await LinkJuiceRoutes.fetchPlans(search, pageSize, pageParam).then((r) => r);
      if (result) {
        dispatch(getLinkJuicePlans(result?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
