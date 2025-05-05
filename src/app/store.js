// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "../features/walletSlice.js";
import swapDetails from "../features/selectionSlice.js";

// Create and export the Redux store
const store = configureStore({
  reducer: {
    wallet: walletReducer,
    swap: swapDetails,
  },
});

export default store;
