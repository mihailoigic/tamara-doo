import ActionTypes from "../../../constants/ActionTypes";
import { ISetMaintenanceModeAction, ISetNotFoundAction, ISetErrorModeAction } from "./types";

export function setMaintenanceMode(): ISetMaintenanceModeAction {
    return {
        type: ActionTypes.MAINTENANCE_SET,
        payload: true,
    };
}

export function setNotFound(): ISetNotFoundAction {
    return {
        type: ActionTypes.NOT_FOUND
    };
}

export function setErrorModeAction(): ISetErrorModeAction {
    return {
        type: ActionTypes.SET_ERROR_MODE,
    };
}

export function redirectToAction(urlTo: string) {
    return {
        type: ActionTypes.REDIRECT_TO,
        payload: {
            urlTo
        }
    };
}
