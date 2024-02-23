import axios from 'axios'
const signupRoute = '/api/auth/signup'
const loginRoute = '/api/auth/login'

const sendSignup = async (signupData) => {
    console.log('Sign up requested.')
    const response = await axios.post(signupRoute, signupData)
    return response.data
}

const sendLogin = async (loginData) => {
    console.log('Log in requested.')
    const response = await axios.post(loginRoute, loginData)
    return response.data
}

export default {sendSignup, sendLogin}