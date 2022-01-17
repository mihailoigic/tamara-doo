import ActionTypes from "../../../constants/ActionTypes";
import {ISessionData} from "./types";
import {IProductsState, ISetProductsAction} from "../product/productList/types";

export const getSessionData = (session: ISessionData) => ({
    type: `${ActionTypes.SESSION_DATA.GET}`,
    payload: { session },
});

export const setSessionData = (session: ISessionData) => ({
    type: `${ActionTypes.SESSION_DATA.SET}`,
    payload: { session },
});
