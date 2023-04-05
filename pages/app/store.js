import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from 'this/features/api/apiSlice';
import postReducer from 'this/features/api/postSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        post:postReducer

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})