import { configureStore } from "@reduxjs/toolkit";

import { coinApi } from "../services/coinApi";
import { coinNewsApi } from "../services/coinNewsApi";

export default configureStore({
    reducer:{
        [coinApi.reducerPath]: coinApi.reducer,
        [coinNewsApi.reducerPath]: coinNewsApi.reducer
    },
})