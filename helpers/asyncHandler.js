//This is a higher order function, which will act a wrapper for async functions, wrapping them inside tryc block,
//and then returning the result of the wrapped function /or the function itself.

const asyncHandler = (func) => async(req, res, next) =>{ //these will be the default parameters, for any function who uses this wrapper.
    try {
        await func(req, res, next);
    } catch (error) {
        console.log("Error Catched by AsyncHandler!");
        res
        .status(error.code || 500)
        .json({
            message: error.message,
        });
    }
}

export { asyncHandler };