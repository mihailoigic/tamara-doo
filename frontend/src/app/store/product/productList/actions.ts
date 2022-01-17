import ActionTypes from "../../../../constants/ActionTypes";
import {
    IFetchProductsAction,
    IProductsState,
    ISetProductsAction,
    IEnrichProductsAction,
} from "./types";

export function requestFetchAllProducts(params: object): IFetchProductsAction {
    return {
        type: ActionTypes.PRODUCTS.FETCH,
        params,
    };
}

export function setProductsAction(products: IProductsState[]): ISetProductsAction {
    return {
        type: ActionTypes.PRODUCTS.SET,
        payload: products,
    };
}

export function enrichProductsAction(products: IProductsState[], type: string): IEnrichProductsAction {
    return {
        type: ActionTypes.PRODUCTS.ENRICH,
        payload: {
            products,
            type,
        }
    };
}

