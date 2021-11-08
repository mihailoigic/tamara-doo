import { IProductsState, ISetProductsAction } from "./types";
import ActionTypes from '../../../../constants/ActionTypes';

const initialState: IProductsState = {
    items: [],
};
const productsReducer = (
    state = initialState,
    action: ISetProductsAction,
): IProductsState => {
    switch (action.type) {
        case ActionTypes.PRODUCTS.SET:
            return {
                ...state,
                items: action.payload,
            };
    }
    return state;
};

export default productsReducer;
