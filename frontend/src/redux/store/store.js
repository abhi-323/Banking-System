import { configureStore } from '@reduxjs/toolkit';
import { dummyReducer } from '../reducers/dummyReducer';

export const store = configureStore({
    reducer: {
        dummy: dummyReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: false,
});