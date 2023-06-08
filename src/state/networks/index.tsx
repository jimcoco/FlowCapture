import { createSlice } from "@reduxjs/toolkit";

 

export interface Networks {
    value: string
}

const initialState : Networks = {
    value: "0"
}

const networkSlice = createSlice({
    name: 'networksel',
    initialState,
    reducers: {
        setNetworks: (state, action) => { state.value = action.payload },
    },
});

export const { setNetworks } = networkSlice.actions;
export default networkSlice.reducer;