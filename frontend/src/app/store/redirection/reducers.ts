import { IMaintenanceModeStore, ISetMaintenanceModeAction } from "./types";
import ActionTypes from '../../../constants/ActionTypes';

const initialState: IMaintenanceModeStore = {
    isMaintenanceModeActive: false,
};
const pageDataReducer = (
    state = initialState,
    action: ISetMaintenanceModeAction
): IMaintenanceModeStore => {
    switch (action.type) {
        case ActionTypes.MAINTENANCE_SET:
            return {
                ...state,
                isMaintenanceModeActive: action.payload
            };
    }
    return state;
};

export default pageDataReducer;
