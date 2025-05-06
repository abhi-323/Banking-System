import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dummyData: [],
};

const dummyReducer = createSlice({
    name: "dummy",
    initialState,
    reducers: {
        setDummyData: (state, action) => {
            state.dummyData = action.payload;
        },
        clearDummyData: (state) => {
            state.dummyData = [];
        },
    },
});
export const { setDummyData, clearDummyData } = dummyReducer.actions;
export default dummyReducer.reducer;