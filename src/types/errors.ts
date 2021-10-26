export class RefreshTokenError extends Error{
    constructor(){
        super("Error on execute the refresh token operation")
    }
}