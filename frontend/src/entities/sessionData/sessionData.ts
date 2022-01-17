import { ISessionData } from "../../app/store/sessionData/types";
import User from "../sessionData/user";

export default class SessionData implements ISessionData {
    user: User;

    constructor(user: User) {
        this.user = user;
    }

}
