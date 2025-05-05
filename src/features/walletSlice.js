// src/store/walletSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  address: null,
  userCoins: [],
  isLoading: false,
};

// Create slice for wallet address
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setAddress: (state, action) => {
      state.address = action.payload.address;
    },
    setAllCoins: (state, action) => {
      state.userCoins = action.payload.userCoins;
    },
    clearAddress: (state) => {
      state.address = null;
      state.userCoins = [];
    },
  },
});

// Export the actions
export const { setAddress, clearAddress, setAllCoins, setLoading } =
  walletSlice.actions;

// Export the reducer
export default walletSlice.reducer;
