import { createSlice } from "@reduxjs/toolkit";
import initialAccountDetailsState from "./accountDetailsReducerInit";

const accountRequestDataReducer = createSlice({
  name: "accountDetails",
  initialState: initialAccountDetailsState,
  reducers: {
    setAccountDetails: (state, action) => {
      state.application = action.payload;
    },
    clearAccountDetails: (state) => {
      state.application = null;
    },
  },
});

export const { setAccountDetails, clearAccountDetails } = accountRequestDataReducer.actions;
export default accountRequestDataReducer.reducer;
