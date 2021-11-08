import ActionTypes from '../../../constants/ActionTypes';
import { IApiError, IApiRequestAction, IApiSuccessAction } from "./types";

export const apiRequest = (
    body: null | object,
    method: string,
    url: string,
    params: null | object,
    data: null | object,
    entity: string,
    headers: object,
): IApiRequestAction => ({

    type: ActionTypes.API_REQUEST,
    payload: {
        data: body,
        meta: { method, url, params, data, entity, headers },
    },
});

export const apiSuccess = (response: object, entity: string, params: any, data: any): IApiSuccessAction => ({

    type: `${entity} ${ActionTypes.API_SUCCESS}`,
    payload: {
        data: response,
        meta: { entity, params, data },
    },
});

export const apiError = (error: any, entity: string): IApiError => ({

    type: `${entity} ${ActionTypes.API_ERROR}`,
    payload: {
        data: error,
        meta: { entity },
    },
});
