import { createSlice } from "@reduxjs/toolkit";
import initialLoanRequestState from "./loanRequestApplicationReducerInit";

const loanRequestApplicationReducer = createSlice({
  name: "loanRequestApplication",
  initialState: initialLoanRequestState,
  reducers: {
    setLoanRequestApplication: (state, action) => {
      state.application = action.payload;
    },
    clearLoanRequestApplication: (state) => {
      state.application = null;
    },
  },
});

export const { setLoanRequestApplication, clearLoanRequestApplication } = loanRequestApplicationReducer.actions;
export default loanRequestApplicationReducer.reducer;
