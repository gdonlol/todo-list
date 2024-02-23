const signupRouter = require('express').Router()
const User = require("../models/user-model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

signupRouter.post('/', async (request, response) => {
    console.log('POST: Sign up requested.')
    const {username, password} = request.body
    const regex = /^[a-zA-Z0-9!@#$%^&*]+$/ 
    if (password === ""){
        return response.status(400).json({error: 'Password is missing.'})
    }else if (password.length < 8){
        return response.status(400).json({error: 'Password length must be at least 8.'})
    }else if (password.length > 64){
        return response.status(400).json({error: 'Password length must be less than 64.'})
    }else if (!regex.test(password)){
        return response.status(400).json({error: 'Unacceptable characters in password.'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({username: username, passwordHash: passwordHash})
    await user.save()
    const userObj = {
        username: username,
        id: user.id
    }
    const token = jwt.sign(userObj, process.env.SECRET)
    console.log('POST: Log in success for ', username)
    response
        .status(201)
        .send({ token, username: user.username})
})

module.exports = signupRouter