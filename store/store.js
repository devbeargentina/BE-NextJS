import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import UserSlice from   "../features/hero/authSlice"

export const store = configureStore({
    reducer: {
        hero: findPlaceSlice,
        user: UserSlice,
    },
});
