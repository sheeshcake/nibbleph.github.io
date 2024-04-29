import { createSlice } from "@reduxjs/toolkit";
import routes from "../../api/dashboardRoutes";

const initialState = {
  websites: [],
  allWebsites: [],
  isLoading: true,
  hasError: false,
  error: null,
  categories: [],
  dealsoftheweek: [],
  recentlyAdded: [],
  inventoryData: [],
  mySiteData: [],
};

export const slice = createSlice({
  name: "website",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setWebsites: (state, action) => {
      state.websites = action.payload;
      state.success = true;
      state.hasError = false;
    },

    setAllWebsites: (state, action) => {
      state.allWebsites = action.payload;
      state.success = true;
      state.hasError = false;
    },

    getWebsites: (state, action) => {
      const websites = action.payload;
      state.websites = websites;
    },

    appendWebsite: (state, action) => {
      console.log("ADDING WEBSITE");
      state.websites.push(action.payload);
    },

    setDealsOfTheWeek: (state, action) => {
      state.dealsoftheweek = action.payload;
      state.success = true;
      state.hasError = false;
    },

    getRecentlyAdded: (state, action) => {
      state.recentlyAdded = action.payload
      state.success = true
      state.hasError = false
    },
    getInventoryData: (state, action) => {
      state.inventoryData = action.payload
      state.success = true;
      state.hasError = false;
    },

    getMySite: (state,action) =>{
      state.mySiteData = action.payload,
      state.success = true,
      state.hasError = false
    },
  },
});

export const {
  startLoading,
  setWebsites,
  appendWebsite,
  setAllWebsites,
  setDealsOfTheWeek,
  getRecentlyAdded,
  getInventoryData,
  getMySite
} = slice.actions;

export default slice.reducer;

export const fetchWebsites = (fetchAll = false,paginated,search,page,perPage) => {
  console.log('page',perPage)
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const result = await routes.fetchWebsites(fetchAll,paginated,search,page,perPage).then((r) => r);
      //  => {
      //   console.log('r',r)
      //   if (r.websites.data.length > 0) {
      //     return r.websites.data.map((item) => {
      //       return {
      //         ...item,
      //         website_url: item.website_link,
      //         // quantity: item.quantity === null ? 1 : item.quantity,
      //       };
      //     });
      //   } else {
      //     return [];
      //   }
      // });
      if (result) {
        dispatch(setAllWebsites(result?.websites));
      }
    } catch (error) {
      console.error(error);
    dispatch(slice.actions.hasError(error));
    }
  };
};

export const fetchDealsOfTheWeek = (page_size ,website_id) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const result = await routes.fetchDealsOfTheWeek(page_size, website_id).then((r) => {
        return r.map((item) => {
          return {
            ...item,
            website_url: item.website_url,
            quantity: item.quantity === null ? 1 : item.quantity,
          };
        });
      });
      if (result) {
        dispatch(setDealsOfTheWeek(result));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchRecentlyAdded = (search,pageSize,pageParam) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const result = await routes.fetchRecentlyAdded(search,pageSize,pageParam).then((r) => {
        return r.data.map((item) => {
          console.log('r',r)
          return {
            ...item,
            website_url: item.website_link,
            quantity: item.quantity === null ? 1 : item.quantity,
            last_page: r.last_page,
            total: r.total
          };
        });
      });
      if (result) {
        dispatch(getRecentlyAdded(result));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchInventoryData = (search,pageSize,pageParam) => {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const result = await routes.fetchInventory(search,pageSize,pageParam).then((r) => {
        return r.data.map((item) => {
          return {
            ...item,
            website_url: item.website_link,
            quantity: item.quantity === null ? 1 : item.quantity,
            last_page: r.last_page,
            total: r.total

          };
        });
      });
      if (result) {
        dispatch(getInventoryData(result));
      }
    } catch (error) {}
  };
};

export const fetchMySite = (search,page,perPage,paginated) =>{
  return async(dispatch) =>{
    dispatch(slice.actions.startLoading())
    try {
      const result = await routes.fetchMySite(search,page,perPage,paginated).then((r) =>
      {
        if (r.websites.length > 0) {

          return r.websites.map(item => {

            return{
              ...item,
              website_url: item.website_link
            }
          })
        }
        else{
          return []
        }
      }
      )
      if(result) {
        dispatch(getMySite(result))
      }
    } catch (error) {
      
    }
  }
}





