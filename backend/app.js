const express = require('express')
require('express-async-errors')
require('dotenv').config()
const path = require('path');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const mongourl = process.env.MONGOURL
const userRouter = require('./routes/user-router')
const signupRouter = require('./routes/signup-router')
const loginRouter = require('./routes/login-router')
const middleware = require('./middleware')

console.log('connecting to ', mongourl)

mongoose
    .connect(mongourl)
    .then(() => {
        console.log('Database connection succsessful.');
    })
    .catch(() => {
        console.error('Database connection failed.')
    })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use('/api/user', userRouter)
app.use('/api/auth/signup', signupRouter)
app.use('/api/auth/login', loginRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(middleware.errorHandler)

module.exports = app