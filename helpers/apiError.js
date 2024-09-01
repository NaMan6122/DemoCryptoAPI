class ApiError extends Error{
    constructor(
        statusCode,
        message="ApiError Message",
        errors = [],
    ){
        super(message); //this message is now passed to the Error class using the constructor and can be accessed anywhere using error.message.
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = null;
        this.success = false;
    }
}

export { ApiError };