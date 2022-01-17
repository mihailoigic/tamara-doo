import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import ActionTypes from '../../../constants/ActionTypes';
import { setMaintenanceMode, setNotFound } from "../redirection/actions";
import { apiSuccess, apiError } from './actions';
import HttpRequest from '../../../services/HttpRequest';

const apiMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => async (action: AnyAction) => {
    next(action);

    if (action.type === ActionTypes.API_REQUEST) {
        const { entity } = action.payload.meta;
        try {
            const response = await HttpRequest.request(action.payload.meta);
            store.dispatch(apiSuccess(response.data, entity, action.payload.meta.params, action.payload.meta.data));
        } catch (error) {
            return dispatchActionOnError(entity, error, store);
        }
    }
};

export const dispatchActionOnError = (entity: string, error: any, store: MiddlewareAPI) => {
    if (error.status === 503) {
        return store.dispatch(setMaintenanceMode());
    }

    if (error.status === 404) {
        return store.dispatch(setNotFound());
    }

    return store.dispatch(apiError(error, entity));
};

export default apiMiddleware;
