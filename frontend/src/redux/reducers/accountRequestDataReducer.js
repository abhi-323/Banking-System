import { createSlice } from "@reduxjs/toolkit";
import initialAccountRequestState from "./accountRequestDataReducerInit";

const accountRequestDataReducer = createSlice({
  name: "accountRequest",
  initialState: initialAccountRequestState,
  reducers: {
    setAccountRequestData: (state, action) => {
      state.application = action.payload;
    },
    clearAccountRequestData: (state) => {
      state.application = null;
    },
  },
});

export const { setAccountRequestData, clearAccountRequestData } = accountRequestDataReducer.actions;
export default accountRequestDataReducer.reducer;
