const loginRouter = require('express').Router()
const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body
    const user = await User.findOne({username})
    const validPass = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && validPass)){
        return response.status(401).json({error: 'Invalid username/password'})
    }

    const userObj = {
        username: username,
        id: user.id
    }
    const token = jwt.sign(userObj, process.env.SECRET)
    console.log("Logged in for ", username)
    response
        .status(200)
        .send({ token, username: user.username})
})

module.exports = loginRouter