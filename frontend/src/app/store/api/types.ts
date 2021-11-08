import ActionTypes from "../../../constants/ActionTypes";

export interface IApiRequestAction {
    type: typeof ActionTypes.API_REQUEST;
    payload: {
        data: null | object,
        meta: {
            method: string,
            url: string,
            params: null | object,
            data: null | object,
            entity: string,
            headers: object,
        };
    };
}

export interface IApiSuccessAction {
    type: string;
    payload: {
        data: object,
        meta: object,
    };
}

export interface IApiError {
    type: string;
    payload: {
        data: any,
        meta: object,
    };
}
