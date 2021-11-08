import ActionTypes from "../../../constants/ActionTypes";

export interface ISetMaintenanceModeAction {
    type: typeof ActionTypes.MAINTENANCE_SET;
    payload: boolean;
}

export interface ISetNotFoundAction {
    type: typeof ActionTypes.NOT_FOUND;
}

export interface IMaintenanceModeStore {
    isMaintenanceModeActive: boolean;
}

export interface ISetErrorModeAction {
    type: typeof ActionTypes.SET_ERROR_MODE,
}
