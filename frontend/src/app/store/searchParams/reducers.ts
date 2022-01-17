import {ISearchParams, ISetSearchParamsAction} from "./types";
import ActionTypes from '../../../constants/ActionTypes';

const initialState: ISearchParams = {
    kategorija: 0,
    tip: 0,
    pol: 'zenski',
    start: 1,
    search: "",
};
const searchParamsReducer = (
    state = initialState,
    action: ISetSearchParamsAction,
): ISearchParams => {
    switch (action.type) {
        case ActionTypes.SET_SEARCH_PARAMS:
            return {
                ...state,
                kategorija: action.payload.kategorija,
                tip: action.payload.tip,
                pol: action.payload.pol,
                start: action.payload.start,
                search: action.payload.search,
            }
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
            }
    }
    return state;
};

export default searchParamsReducer;
