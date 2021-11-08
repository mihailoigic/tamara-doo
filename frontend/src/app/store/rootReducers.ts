import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./product/productList/reducers";

const rootReducers = combineReducers({
    products: productsReducer,
});

export type AppState = ReturnType<typeof rootReducers>;

export default rootReducers;