import ActionTypes from "../../../../constants/ActionTypes";

export interface IProductsState {
    items: any[];
}

export interface IFetchProductsAction {
    type: typeof ActionTypes.PRODUCTS.FETCH;
    params: object;
}

export interface ISetProductsAction {
    type: typeof ActionTypes.PRODUCTS.SET;
    payload: IProductsState[];
}

export interface IEnrichProductsAction {
    type: typeof ActionTypes.PRODUCTS.ENRICH;
    payload: {
        products: IProductsState[],
        type: string,
    };
}
