import { createSlice } from "@reduxjs/toolkit";
import initialLoanAccountDetailsState from "./loanAccountDetailsReducerInit";

const loanAccountRequestDataReducer = createSlice({
  name: "LoanAccountDetails",
  initialState: initialLoanAccountDetailsState,
  reducers: {
    setLoanAccountDetails: (state, action) => {
      state.account = action.payload;
    },
    clearLoanAccountDetails: (state) => {
      state.account = null;
    },
  },
});

export const { setLoanAccountDetails, clearLoanAccountDetails } = loanAccountRequestDataReducer.actions;
export default loanAccountRequestDataReducer.reducer;
