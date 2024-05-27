import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'



const Signup = () => {
  const context = useContext(AuthContext);
  const { registerInfo, updateRegisterInfo, registerUser, registerError } = context;  //importing all functions from Authcontext


  const onChange = (e) =>{
    updateRegisterInfo({...registerInfo,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    registerUser()  
  }



  return (
    <div className='container'>
      <h1>Please Signup to chat</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" autoComplete='name' onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" autoComplete='email' onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" autoComplete='current-password' onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>

        {/* registerError?.error && is a short-circuit evaluation. If registerError is null or undefined, the condition fails, and the <div> is not rendered.
        If registerError exists and registerError.error is true, the <div> containing the error message is rendered.
        The {registerError.message} inside the <h4> tag displays the error message. This message coming from backend the customs error msg*/}

        {registerError?.error && (
          <div className='alert alert-danger mt-4' role='alert'>
            <h4>{registerError.message}</h4>
          </div>
        )}
      </form>
    </div>
  )
}

export default Signup
