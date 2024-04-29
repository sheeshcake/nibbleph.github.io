import { createSlice } from '@reduxjs/toolkit';

// cs={clientSecret} invoiceId={invoiceId} planData={planData} subscribeData={subscribeData}

const initialState = {
  clientSecret: '',
  invoiceId: '',
  planData: '',
  subscribeData: '',
  couponCode: '',
};

const PaymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setClientSecret: (state, action) => ({
      ...state,
      clientSecret: action.payload,
    }),
    setInvoiceId: (state, action) => ({
      ...state,
      invoiceId: action.payload,
    }),
    setPlanData: (state, action) => ({
      ...state,
      planData: action.payload,
    }),
    setSubscribeData: (state, action) => ({
      ...state,
      subscribeData: action.payload,
    }),
    
  },
});
export const { setClientSecret, setInvoiceId, setPlanData, setSubscribeData } = PaymentSlice.actions;
export default PaymentSlice.reducer;
