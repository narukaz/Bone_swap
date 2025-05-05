// src/store/walletSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  toName: "Select Token",
  toObjectId: "",
  toBalance: 0,
  toDecimal: 0,
  fromName: "Select Token",
  fromDecimal: 0,
};

// Create slice for wallet address
const swapDetails = createSlice({
  name: "swap",
  initialState,
  reducers: {
    setTransactionData: (state, action) => {
      // console.log("swap from inside of reducer", action);
      Object.assign(state, action.payload);
      // state.fromBalance = action.payload.fromBalance || state.fromName;
      // state.fromName = action.payload.fromName || state.fromName;
      // state.fromDecimal = action.payload.fromDecimal || state.fromDecimal;
      // state.fromObjectId = action.payload.fromObjectId || state.fromObjectId;
      // //
      // state.toBalance = action.payload.toBalance || state.toBalance;
      // state.toName = action.payload.toName || state.toName;
      // state.toDecimal = action.payload.toDecimal || state.toDecimal;
      // state.toObjectId = action.payload.toObjectId || state.toObjectId;
    },
  },
});

// Export the actions
export const { setTransactionData } = swapDetails.actions;

// Export the reducer
export default swapDetails.reducer;
