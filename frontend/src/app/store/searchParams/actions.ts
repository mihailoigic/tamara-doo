import {
    IClearSearchParams,
    ISearchParams,
    ISetKategorijaTipSearchParam,
    ISetPolSearchParam,
    ISetSearchParamsAction,
    ISetSearchSearchParam,
    ISetStartSearchParam,
} from "./types";
import ActionTypes from "../../../constants/ActionTypes";


export function setSearchParams(searchParams: ISearchParams): ISetSearchParamsAction {
    return {
        type: ActionTypes.SET_SEARCH_PARAMS,
        payload: searchParams,
    };
}

export function setPolSearchParams(pol: string): ISetPolSearchParam {
    return {
        type: ActionTypes.SET_POL_SEARCH_PARAMS,
        payload: pol,
    };
}

export function setKategorijaTipSearchParam(kategorija: number, tip: number): ISetKategorijaTipSearchParam {
    const kategorijaTip = { tip: tip, kategorija: kategorija };
    return {
        type: ActionTypes.SET_KATEGORIJA_TIP_SEARCH_PARAMS,
        payload: kategorijaTip,
    };
}

export function setStartSearchParams(start: number): ISetStartSearchParam {
    return {
        type: ActionTypes.SET_START_SEARCH_PARAMS,
        payload: start,
    };
}

export function setSearchSearchParams(search: string): ISetSearchSearchParam {
    return {
        type: ActionTypes.SET_SEARCH_SEARCH_PARAMS,
        payload: search,
    };
}

export function clearSearchParams(): IClearSearchParams {
    return {
        type: ActionTypes.CLEAR_SEARCH_PARAMS
    };
}