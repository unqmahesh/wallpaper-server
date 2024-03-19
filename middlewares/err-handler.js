
const errorHandler = async(error, req, res, next) => {

    error.name = error.name || "Internal_server_error"
    error.message = error.message || "Something went wrong, internal server error"
    error.status = error.status || 500
    error.success = false
    
    res.status(error.status).json({
        'success': error.success,
        'name' : error.name, 
        'message' : error.message})
}

export default errorHandler