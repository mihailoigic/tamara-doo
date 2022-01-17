import SessionData from "../../entities/sessionData/sessionData";
import _ from "lodash";

export default class SessionDataFactory {

    static create(sessionData: any) {
        const cloneSessionData = _.cloneDeep(sessionData) as SessionData;
        if (!sessionData || !sessionData.user) {
            cloneSessionData.user = {
                isLoggedIn: false,
                firstName: '',
                lastName: '',
                email: '',
            };
        }

        return new SessionData(
            cloneSessionData.user
        );
    }

}
