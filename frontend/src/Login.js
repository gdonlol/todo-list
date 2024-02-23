import ErrorNotif from "./comps/ErrorNotif"
import { useState } from  'react'
import authService from "./service/auth-service"

function Login() {

    const [errorMsg, setErrorMsg] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('localUser')))
    if (user !== null){
      return window.location.replace('/')
    }

    const handleLogin = async (e) => {
      e.preventDefault()
      try{
          const response = await authService.sendLogin({username: username, password: password})
          window.localStorage.setItem('localUser', JSON.stringify(response))
          window.location.replace('/')
      }
      catch{
          setErrorMsg('Log in failed. Please try again.')
      }
    }

    return (
      <div className='login' >
        <img src="logo.png" alt="TodoList Logo" style={{width: '72px'}}/>
        <h1>👉 Log in to TodoList</h1>
        <ErrorNotif msg={errorMsg} handleClose={() => setErrorMsg('')}/>

        <div className='form-container'>
          <form className='login-form' onSubmit={e => handleLogin(e)}>
            <label>Username</label><br />
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}>
            </input><br />

            <label>Password</label><br />
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}>
            </input><br />

            <button className='login-btn'>Log in</button>
          </form>
        </div>
        <p>New to TodoList? <a href="/signup">Create an account</a></p>
      </div>
    )
}

export default Login