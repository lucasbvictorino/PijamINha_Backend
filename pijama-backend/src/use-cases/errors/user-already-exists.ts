export class UserAlreadyExistsError extends Error {
    constructor() {
        super("Email or username already in use.")
    }
}