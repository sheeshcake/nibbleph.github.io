import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import websiteReducer from './slices/website';
import userProfileReducer from './slices/user';
import maintenanceReducer from './slices/maintenance'
import adminAccountReducer from './slices/admin/account'
import ordersReducer from './slices/order'
import paymentReducer from './slices/payment'
import recentOrdersReducer from './slices/admin/dashboard'
import assignedTaskReducer from './slices/virtual_assistant/assignedTask';
import couponReducer from './slices/admin/coupon';
import redeemCouponReducer from './slices/redeemcoupon';
import pointsReducer from './slices/admin/points';
import plansReducer from './slices/admin/plans';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const websitePersistConfig = {
  key: "website",
  storage,
  keyPrefix: 'redux-',
  whitelist: ["websites"],
};

export const accountListPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};


// const userProfilePersistConfig = {
//   key: "userProfile",
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ["user"],
// };


const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  website: websiteReducer,
  user: userProfileReducer,
  account: persistReducer(accountListPersistConfig,adminAccountReducer),
  order: ordersReducer,
  payment: paymentReducer,
  adminDashboard: recentOrdersReducer,
  assignedTask: assignedTaskReducer,
  coupon: couponReducer,
  redeemCoupon: redeemCouponReducer,
  maintenance: maintenanceReducer,
  points: pointsReducer,
  plans: plansReducer
});

export default rootReducer;
