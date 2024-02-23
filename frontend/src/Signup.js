import ErrorNotif from "./comps/ErrorNotif"
import { useState } from  'react'
import authService from "./service/auth-service"

function Signup() {

    const [errorMsg, setErrorMsg] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('localUser')))
    if (user !== null){
      return window.location.replace('/')
    }
    
    const handleSignup = async (e) => {
        e.preventDefault()
        try{
            const response = await authService.sendSignup({username: username, password: password})
            window.localStorage.setItem('localUser', JSON.stringify(response))
            window.location.replace('/')
        }
        catch (error){
            setErrorMsg(error.response.data.error)
        }
    }

    return (
      <div className='login' >
        <img src="logo.png" alt="TodoList Logo" style={{width: '72px'}}/>
        <h1>👋 Sign up to TodoList</h1>
        <ErrorNotif msg={errorMsg} handleClose={() => setErrorMsg('')}/>

        <div className='form-container'>
          <form className='login-form' onSubmit={e => handleSignup(e)}>
            <label>New Username</label><br />
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}>
            </input><br />
  
            <label>New Password</label><br />
            <input 
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password">
            </input><br />
  
            <button className='login-btn'>Sign up</button>
          </form>
        </div>

        <p>Already have an account? <a href="/login">Log in with account</a></p>
      </div>
    )
}

export default Signup