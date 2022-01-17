import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
import ActionTypes from "../../../constants/ActionTypes";
import SessionData from "../../../entities/sessionData/sessionData";
import { setSessionData } from "./actions";
import { apiRequest } from "../api/actions";
import SessionDataFactory from "../../../factories/sessionData/SessionDataFactory";

export const sessionMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
    next(action);
    if (action.type.includes(ActionTypes.SESSION_DATA.GET)) {
        const session: SessionData = action.payload.session;
        const sessionDataObject = SessionDataFactory.create(session);
        next(setSessionData(sessionDataObject));
    }
};

export const wsUserInfoMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
    next(action);

    switch (action.type) {
        case `${ActionTypes.SESSION_DATA.GET}`:
            next(apiRequest(
                null,
                'GET', `/api/reactive/user-info/`,
                null,
                null,
                '',
                {}),
            );
            break;
        case ` ${ActionTypes.API_SUCCESS}`:
            const userInfoResponse = action.payload;
            break;
    }
};

export const sessionDataMiddleware = [sessionMiddleware, wsUserInfoMiddleware];
