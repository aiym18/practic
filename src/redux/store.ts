import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

export const store = configureStore({
    reducer:{},
    middleware:(getMiddleware)=>getMiddleware().concat(api.middleware)
})