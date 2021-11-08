import ActionTypes from "../../../constants/ActionTypes";

export function initialize() {
    return {
        type: ActionTypes.INIT,
    };
}