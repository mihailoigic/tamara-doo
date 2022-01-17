import { combineReducers } from "redux";
import productsReducer from "./product/productList/reducers";
import searchParamsReducer from "./searchParams/reducers";

const rootReducers = combineReducers({
    products: productsReducer,
    searchParams: searchParamsReducer,
});

export type AppState = ReturnType<typeof rootReducers>;

export default rootReducers;