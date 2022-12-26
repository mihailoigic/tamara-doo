import {ISearchParams} from "./types";
import ActionTypes from '../../../constants/ActionTypes';

const initialState: ISearchParams = {
    kategorija: 0,
    tip: 0,
    pol: 'zenski',
    start: 1,
    search: "",
    filterColors: [],
    filterBrands: []
};
const searchParamsReducer = (
    state = initialState,
    action: any,
): any => {
    switch (action.type) {
        case ActionTypes.SET_POL_SEARCH_PARAMS:
            return {
                ...state,
                pol: action.payload,
                kategorija: 0,
                tip: 0,
            }
        case ActionTypes.SET_KATEGORIJA_TIP_SEARCH_PARAMS:
            return {
                ...state,
                kategorija: action.payload.kategorija,
                tip: action.payload.tip,
            }
        case ActionTypes.SET_START_SEARCH_PARAMS:
            return {
                ...state,
                start: action.payload,
            }
        case ActionTypes.SET_SEARCH_SEARCH_PARAMS:
            return {
                ...state,
                search: action.payload,
            }
        case ActionTypes.CLEAR_SEARCH_PARAMS:
            return {
                ...state,
                kategorija: 0,
                tip: 0,
                pol: 'zenski',
                start: 1,
                search: "",
                filterColors: [],
                filterBrands: []
            }
        case ActionTypes.SET_FILTER_COLOR:
            return {
                ...state,
                filterColors: action.payload,
            }
        case ActionTypes.SET_FILTER_BRAND:
            return {
                ...state,
                filterBrands: action.payload,
            }
}
    return state;
};

export default searchParamsReducer;
