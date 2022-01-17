export default class User {

    isLoggedIn: boolean;
    lastName: string;
    firstName: string;
    email: string;

    constructor(isLoggedIn = false, lastName: string, firstName: string, email: string) {
        this.isLoggedIn = isLoggedIn;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
    }

}
