import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

 

const Login = () => {
    const context = useContext(AuthContext);
    const { loginInfo, updateLoginInfo, loginUser, loginError } = context;  //importing all functions from Authcontext
;
  
    const onChange = (e) =>{
      updateLoginInfo({...loginInfo,[e.target.name]:e.target.value})
    }
  
    const handleLogin = async (e) => {
      e.preventDefault();
      loginUser();
    };
    
  

  return (
    <div className='container'>
      <h1>Please login to join chat</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" autoComplete='email' onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" autoComplete='password' onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        
        {/* loginError?.error && is a short-circuit evaluation. If loginError is null or undefined, the condition fails, and the <div> is not rendered.
        If loginError exists and loginError.error is true, the <div> containing the error message is rendered.
        The {loginError.message} inside the <h4> tag displays the error message. This message coming from backend the customs error msg*/}

        {loginError?.error && (
          <div className='alert alert-danger mt-4' role='alert'>
            <h4>{loginError.message}</h4>
          </div>
        )}
      </form>
    </div>
  )
}

export default Login
