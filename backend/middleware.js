const errorHandler = (error, request, response, next) =>{
    console.log('ERROR: ', error.message)

    if (error.name === 'ValidationError'){
        if (error.message.includes("Error, expected `username` to be unique.")){
            return response.status(400).json({error: 'Username is taken.'})
        }
        return response.status(400).json({error: error.message.replace("User validation failed: username:", "")})
    }
    response.status(500).json({error: 'Internal server error'})
}



module.exports = {errorHandler}