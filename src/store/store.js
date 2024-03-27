import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./HomeSlice";

const store = configureStore({
    reducer : {
        Home : HomeSlice.reducer
    }
})

export default store