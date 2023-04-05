import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../features/api/apiSlice';
import postReducer from '../features/api/postSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        post:postReducer

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})