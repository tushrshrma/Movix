import { createSlice } from "@reduxjs/toolkit";

const HomeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        geners: {}
    },
    reducers : {
        getApiConfiguration : (state , action) => {
            state.url = action.payload
        },
        getGeners : (state , action) => {
            state.geners = action.payload
        }
    }
})

export const {getApiConfiguration , getGeners} = HomeSlice.actions
export default HomeSlice