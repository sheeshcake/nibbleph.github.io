import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  is_maintenance: false,
  maintenance: {},
};

// create slice
export const slice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    setMaintenance(state, action) {
      state.is_maintenance = action.payload.is_maintenance;
      state.maintenance = action.payload.maintenance;
    },
  },
});

export const { setMaintenance } = slice.actions;

export default slice.reducer;
