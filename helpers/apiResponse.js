class ApiResponse{
    constructor(
        statusCode,
        message = "ApiResponse Message",
        data,
    ){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export { ApiResponse };