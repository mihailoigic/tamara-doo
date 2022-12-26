import ActionTypes from "../../../constants/ActionTypes";

export interface ISearchParams {
    kategorija?: number;
    tip?: number;
    start?: number;
    pol?: string;
    search?: string;
    filterColors?: string[];
    filterBrands?: string[];
}

export interface ISetPolSearchParam {
    type: typeof ActionTypes.SET_POL_SEARCH_PARAMS;
    payload: any;
}

export interface ISetKategorijaTipSearchParam {
    type: typeof ActionTypes.SET_KATEGORIJA_TIP_SEARCH_PARAMS;
    payload: any;
}

export interface ISetStartSearchParam {
    type: typeof ActionTypes.SET_START_SEARCH_PARAMS;
    payload: any;
}

export interface ISetSearchSearchParam {
    type: typeof ActionTypes.SET_SEARCH_SEARCH_PARAMS;
    payload: any;
}

export interface IClearSearchParams {
    type: typeof ActionTypes.CLEAR_SEARCH_PARAMS;
}

export interface ISetFilterColor {
    type: typeof ActionTypes.SET_FILTER_COLOR;
    payload: any;
}

export interface ISetFilterBrand {
    type: typeof ActionTypes.SET_FILTER_BRAND;
    payload: any;
}
