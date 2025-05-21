import { createSlice } from "@reduxjs/toolkit";
import initialAccountDetailsState from "./accountDetailsReducerInit";

const accountRequestDataReducer = createSlice({
  name: "accountDetails",
  initialState: initialAccountDetailsState,
  reducers: {
    setAccountDetails: (state, action) => {
      state.account = action.payload;
    },
    clearAccountDetails: (state) => {
      state.account = null;
    },
  },
});

export const { setAccountDetails, clearAccountDetails } = accountRequestDataReducer.actions;
export default accountRequestDataReducer.reducer;
