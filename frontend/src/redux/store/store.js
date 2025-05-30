import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../reducers/userAuthReducer";
import loanApplicaitonReducer from "../reducers/loanApplicaitonReducer";
import accountRequestDataReducer from "../reducers/accountRequestDataReducer";
import accountDetailsReducer from "../reducers/accountDetailsReducer";
import loanRequestApplicationReducer from "../reducers/loanRequestApplicationReducer";

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    loanApplication: loanApplicaitonReducer,
    accountRequest: accountRequestDataReducer,
    accountDetails: accountDetailsReducer,
    loanRequestApplication: loanRequestApplicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});
