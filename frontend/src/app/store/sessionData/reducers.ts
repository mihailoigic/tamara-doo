import ActionTypes from '../../../constants/ActionTypes';
import {ISessionData} from "./types";
import _ from 'lodash';

const initialState: ISessionData = {
    user: {
        isLoggedIn: false,
        firstName: '',
        lastName: '',
        email: '',
    }
};

export default (state = initialState, action: any) : ISessionData => {
    if (action.type.includes(ActionTypes.SESSION_DATA.SET)) {
        let sessionState = { ...state };
        if (_.has(action.payload, 'session.user')) {
            sessionState = { ...sessionState, user: action.payload.session.user };
        }
        return sessionState;
    }
    return state;
};
