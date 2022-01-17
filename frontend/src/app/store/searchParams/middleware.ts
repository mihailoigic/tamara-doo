import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";

export const searchParamsMiddlewares: Middleware =
    (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
        next(action);
        // if (action.type === ActionTypes.SET_SEARCH_PARAMS) {
        //     next(setSearchParams(action.payload));
        // }
    };

export default searchParamsMiddlewares;


