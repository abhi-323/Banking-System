import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from "../reducers/dummyReducer";
import userAuthReducer from "../reducers/userAuthReducer";
import loanApplicaitonReducer from "../reducers/loanApplicaitonReducer";
import accountRequestDataReducer from "../reducers/accountRequestDataReducer";
import accountDetailsReducer from "../reducers/accountDetailsReducer";

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    userAuth: userAuthReducer,
    loanApplication: loanApplicaitonReducer,
    accountRequest: accountRequestDataReducer,
    accountDetails: accountDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});
