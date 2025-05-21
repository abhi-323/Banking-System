import { createSlice } from "@reduxjs/toolkit";
import initialApplicationState from "./loanApplicationReducerInit";

const loanApplicationReducer = createSlice({
  name: "loanApplication",
  initialState: initialApplicationState,
  reducers: {
    setLoanApplication: (state, action) => {
      state.application = action.payload;
    },
    clearLoanApplication: (state) => {
      state.application = null;
    },
  },
});

export const { setLoanApplication, clearLoanApplication } = loanApplicationReducer.actions;
export default loanApplicationReducer.reducer;
