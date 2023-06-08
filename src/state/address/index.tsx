import { createSlice } from "@reduxjs/toolkit";

 

export interface Address {
    value: string
}

const initialState : Address = {
    value: "0x"
}

const addressSlice = createSlice({
    name: 'addressel',
    initialState,
    reducers: {
        setAddress: (state, action) => { state.value = action.payload },
    },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;