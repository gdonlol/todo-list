const User = require('./models/user-model')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) =>{
    console.log('ERROR: ', error.message)

    if (error.name === 'ValidationError'){
        if (error.message.includes("Error, expected `username` to be unique.")){
            return response.status(400).json({error: 'Username is taken.'})
        }else if (error.message.includes("Item validation failed")){
            return response.status(400).json({error: 'Item text is too long (must be < 100 characters).'})
        }
        return response.status(400).json({error: error.message.replace("User validation failed: username:", "")})
    }
    if (error.name === 'JsonWebTokenError'){
        return response.status(400).json({error: "Authentication Error"})
    }
    response.status(500).json({error: error.name, details: error.message})
}

//extracts bearer tokens from req headers
const tokenExtractor = (request, response, next) => {
    const auth = request.get('authorization')
    if (auth && auth.startsWith('Bearer ')){
        request.token = auth.replace('Bearer ', '')
        return next()
    }
    next()
}

//extracts user from tokens for authentication
const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
        response.status(401).json({error: "Invalid auth token."})
    }
    request.user = await User.findById(decodedToken.id).populate({
        path: 'lists',
        select: 'title'
    })
    if (request.user === null){
        response.status(401).json({error: "Invalid auth token."})
    }
    console.log(request.user);
    next()
}

module.exports = {errorHandler, tokenExtractor, userExtractor}