import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
import ActionTypes from "../../../constants/ActionTypes";
import { setMaintenanceMode } from "./actions";
import history from "../../../utilities/history";

const redirectionMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
    next(action);
    switch (action.type) {
        case ActionTypes.MAINTENANCE_SET:
            history.replace(`/${store.getState().language.language}/maintenance`);
            next(setMaintenanceMode());
            break;
        case ActionTypes.NOT_FOUND:
            history.replace(`/${store.getState().language.language}/not-found`);
            break;
        case ActionTypes.SET_ERROR_MODE:
            history.replace(`/${store.getState().language.language}/error`);
            break;
        case ActionTypes.REDIRECT_TO:
            history.push(action.payload.urlTo);
            break;
    }
};

export default redirectionMiddleware;

