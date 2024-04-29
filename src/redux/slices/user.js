import { createSlice } from "@reduxjs/toolkit";
import userProfile from "../../api/userProfile";
import routes from "../../api/ApiRoutes";

//initial state
const initialState = {
  userData: {},
  virtual_assistants: [],
  isLoading: true,
  hasError: false,
  error: null,
  credit: null
};

//create slice
export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    setUserData (state, action) {
      state.userData = action.payload
      state.isLoading = false;
      state.success = true;
      state.hasError = false;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUserProfile: (state, action) => {
      state.userData = action.payload;
      state.success = true;
      state.hasError = false;
    },

    setVirtualAssistants: (state, action) => {
      state.virtual_assistants = action.payload;
      state.success = true;
      state.hasError = false;
    },
    
    setCreditPoints : (state,action) => {
      state.credit = action.payload;
      state.success = true;
      state.hasError = false;
    }
 
  },
});

export const { startLoading, getUserProfile, setUserData, setVirtualAssistants, setCreditPoints } = slice.actions;

export default slice.reducer;

export const fetchUserData = () => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const result = await userProfile.fetchUser().then((r) => r);

      const initialValues = {
        firstname: '',
        lastname: '',
        phone: '',
        paypal_email: '',
        company_name: '',
        company_number: '',
        billing_address: '',
        tax_id: ''
      };

      if(result){
        dispatch(getUserProfile(result.profile ? result.profile : initialValues));
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const fetchVirtualAssistants = () => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try{
      const result = await routes.fetchAssignableUsers().then(r => {
        return r.map((item, index) => {
          return {
            ...item,
            avatar: `https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_${index + 1}.jpg`
          }
        });
      });

      if(result){
        dispatch(setVirtualAssistants(result))
      }
    }catch(error){
      console.log(error);
    }
  }
}

export const fetchMyNotifications = () =>{
  return async (dispatch) =>{
    dispatch(slice.actions.startLoading());
    
    try {
      const result = await routes.fetchMyNotifications().then((r) => r)
      const initialValues ={
        
      }
    } catch (error) {
      
    }
  }
}

export const setCredit = (data) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(setCreditPoints(data));
    } catch (error) {}
  };
};

