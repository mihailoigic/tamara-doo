import { combineReducers } from "redux";
import productsReducer from "./product/productList/reducers";
import searchParamsReducer from "./searchParams/reducers";
import colorReducer from "./colorFilter/reducers";

const rootReducers = combineReducers({
    products: productsReducer,
    searchParams: searchParamsReducer,
    colors: colorReducer
});

export type AppState = ReturnType<typeof rootReducers>;

export default rootReducers;