import {
    IClearSearchParams,ISetFilterBrand, ISetFilterColor,
    ISetKategorijaTipSearchParam,
    ISetPolSearchParam,
    ISetSearchSearchParam,
    ISetStartSearchParam,
} from "./types";
import ActionTypes from "../../../constants/ActionTypes";

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

export function setFilterColor(): ISetFilterColor {
    return {
        type: ActionTypes.SET_FILTER_COLOR
    };
}

export function setFilterBrand(): ISetFilterBrand {
    return {
        type: ActionTypes.SET_FILTER_BRAND
    };
}