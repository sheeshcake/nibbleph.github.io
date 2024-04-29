import { createSlice } from "@reduxjs/toolkit";
import VirtualAssitantRoutes from "../../../api/virtualAssitant/VirtualAssitantRoutes";

//initial state
const initialState = {
  assignedTaskData: [],
  isLoading: true,
  hasError: false,
  error: null,
};

//create slice
export const slice = createSlice({
  name: "assignedTask",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getAssignedTask: (state, action) => {
      state.assignedTaskData = action.payload;
      state.success = true;
      state.hasError = false;
    },

    updateAssignedTask(state, action) {
      const { id, value } = action.payload;

      const index = state.assignedTaskData.data.findIndex(
        (item) => item.id === id
      );

      if (index !== -1) {
        state.assignedTaskData.data[index].orders.status = value;
      }
    },
  },
});

export const { startLoading, getAssignedTask, updateAssignedTask } =
  slice.actions;

export default slice.reducer;

export const fetchTasked = (id) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const result = await VirtualAssitantRoutes.fetchAllTask(id).then(
        (r) => r
      );

      if (result) {
        dispatch(getAssignedTask(result));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const updateTaskStatus = (payload) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const result = await VirtualAssitantRoutes.updateStatus(payload).then(
        (r) => r
      );

      if (result) {
        const { user_order, status } = payload;
        dispatch(
          updateAssignedTask({
            id: user_order,
            value: status,
          })
        );
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};
