export class Auth{

    public email: string;
    public password : string;
    public returnSecureToken: boolean;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

}
