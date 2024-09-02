class ApiResponse{
    constructor(
        statusCode,
        data,
        message = "ApiResponse Message",
        
    ){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export { ApiResponse };