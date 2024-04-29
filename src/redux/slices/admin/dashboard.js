import {createSlice} from '@reduxjs/toolkit';
import websiteAdminRoutes from '../../../api/admin/WebsiteAdminRoutes';
import WebsiteAdminRoutes from '../../../api/admin/WebsiteAdminRoutes';

//initial state
const initialState = {
    recentOrderData: [],
    isLoading: true,
    hasError: false,
    error: null,
    chartData: [],
    totalSalesData:[],
    totalProductsSold:[],
    totalWebsites: null,
    totalWebsiteSales: null,
    totalUsers: null
};

//create slice
export const slice = createSlice({
    name: "adminDashboard",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },

        hasError(state,action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        
        getorderData: (state, action) =>{
            state.recentOrderData = action.payload;
            state.success = true;
            state.hasError = false;
        },

        getChartData: (state,action) =>{
            state.chartData = action.payload;
            state.success = true;
            state.error = false;
        },

        setTotalSales: (state,action) =>{
            state.totalSalesData = action.payload;
            state.success = true;
            state.hasError = false;
        },
        setProductsSold: (state,action) =>{
            state.totalProductsSold = action.payload;
            state.success = true;
            state.hasError = false;
        },
        setTotalWebsites: (state,action) =>{
          state.totalWebsites = action.payload;
          state.success = true;
          state.hasError = false;
        },
        setTotalWebsiteSales: (state,action) =>{
          state.totalWebsiteSales = action.payload;
          state.success = true;
          state.hasError = false;
        },
        setTotalUsers: (state,action) =>{
          state.totalUsers = action.payload;
          state.sucess = true;
          state.hasError = false;
        }

    }
});

export const { startLoading, getorderData, getChartData,setTotalSales,setProductsSold,setTotalWebsiteSales,setTotalWebsites,setTotalUsers  } = slice.actions

export default slice.reducer;

export const fetchOrderData = () =>{
    return async(dispatch) =>{
        dispatch(slice.actions.startLoading());
        try {
            const result = await websiteAdminRoutes.fetchRecentOrders().then((r) => r);
       
            if (result) {
                dispatch(getorderData(result))
            }
        } catch (error) {
            
        }
    }
}

export const fetchChartData = (fromDate, toDate) =>{
    return async(dispatch) =>{
      //start loading
      dispatch(slice.actions.startLoading())
  
      try {
        const result  = await websiteAdminRoutes.fetchChart(fromDate,toDate).then((r) =>r);
    if (result) {
            dispatch(getChartData(result.sales))
            dispatch(setTotalWebsiteSales(result?.total_sales))
            dispatch(setTotalWebsites(result?.websites))
        }
      } catch (error) {
        
      }
    }
  }

  export const fetchSalesData = (fromDate, toDate) =>{

    return async(dispatch) =>{
      //start loading
      dispatch(slice.actions.startLoading())
  
      try {
        const result  = await websiteAdminRoutes.fetchTotalSales(fromDate,toDate).then((r) =>r);
    if (result) {
            dispatch(setTotalSales(result))
        }
      } catch (error) {
        
      }
    }
  }

  export const fetchProductsSold = (fromDate, toDate) =>{

    return async(dispatch) =>{
      //start loading
      dispatch(slice.actions.startLoading())
  
      try {
        const result  = await websiteAdminRoutes.fetchProductSold(fromDate,toDate).then((r) =>r);
    if (result) {
            dispatch(setProductsSold(result[0]))
        }
      } catch (error) {
        
      }
    }
  }

  export const fetchTotalUsers = () =>{
    return async(dispatch) =>{
         //start loading
         dispatch(slice.actions.startLoading())
      try {
        const result = await WebsiteAdminRoutes.fetchTotalUsers().then((r) =>r);
        if (result) {
          dispatch(setTotalUsers(result))
        }
      } catch (error) {
        
      }
    }
  }
  
