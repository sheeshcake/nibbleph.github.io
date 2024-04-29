import {createSlice} from '@reduxjs/toolkit';
import websiteAdminRoutes from '../../../api/admin/WebsiteAdminRoutes';

//initial state
const initialState = {
    websiteData: [],
    isLoading: true,
    hasError: false,
    error: null,
};

//create slice
export const slice = createSlice({
    name: "website",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },

        hasError(state,action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        
        getWebsiteData: (state, action) =>{
            state.accountData = action.payload;
            state.success = true;
            state.hasError = false;
        },

   

        // setAccountData: (state,action) => {
        //     state.allAccountData = action.payload;
        //     state.success = true;
        //     state.hasError = false;
        // }
    }
});

export const { startLoading, getWebsiteData, setAccountData } = slice.actions

export default slice.reducer;

export const fetchWebsiteData = () =>{
    return async(dispatch) =>{
        dispatch(slice.actions.startLoading());
        try {
            const result = await websiteAdminRoutes.fetchAllWebsites().then((r) => r);
            const initialValues = {
                website_url: '',
                enter_website_description: '',
                role: '',
                billing_address: '',
                paypal_email: '',
                verified: '',
                company_name: '',
                status: '',      
            }
            if (result) {
                dispatch(getWebsiteData(result))
            }
        } catch (error) {
            
        }
    }
}


