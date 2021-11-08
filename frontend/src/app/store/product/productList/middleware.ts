import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
import ActionTypes from "../../../../constants/ActionTypes";
import ProductFactory from "../../../../factories/product/ProductFactory";
import { apiRequest } from "../../api/actions";
// import { getSessionData } from "../../sessionData/actions";
// import { setPageDataProductListAction } from "../../pageData/actions";
// import { createSearchParamsProductListAction } from "../../searchParams/actions";
import { setProductsAction, enrichProductsAction } from './actions';
// import { setLoader } from "../../ui/actions";
import _ from "lodash";


export const getProductsMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
    next(action);
    switch (action.type) {
        case ActionTypes.PRODUCTS.FETCH:
            next(apiRequest(
                null,
                'GET', '/v1/proizvod',
                null,
                null,
                '[PRODUCT]',
                {}),
            );
            break;
        case `[PRODUCT] ${ActionTypes.API_SUCCESS}` :
            next(enrichProductsAction(action.payload.data.products, action.payload.meta.params.type));
            break;
        case `[PRODUCT] ${ActionTypes.API_ERROR}` :
            break;
    }
};

export const enrichProductsMiddleware: Middleware =
    (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
        next(action);

        if (action.type === ActionTypes.PRODUCTS.ENRICH) {
            const { products } = action.payload;
            const productsEntities: any[] = [];

            products.map((product: any) => {
                productsEntities.push(ProductFactory.createFromResponse(product));
            });

            next(setProductsAction(productsEntities));
        }
    };

export const productsMiddleware = [getProductsMiddleware, enrichProductsMiddleware];


