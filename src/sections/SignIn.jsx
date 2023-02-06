import React from 'react'
import {useState} from 'react'
import {useAuth} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

const SignIn = ()=>{

  const navigate = useNavigate()
  const [data, setData]= useState({
    email: '',
    password: ''
  })
const {signIn,error} = useAuth()

const handleSubmit = async(event)=>{
  event.preventDefault()
 try{
  await signIn(data)
  return navigate('/admin', {replace: true})
  
 }catch(error){
  console.log(error.message)
 }
}


	return (
<div className="body">		
	<form method="POST" onSubmit={handleSubmit} className="form">
      <div className="title">Welcome</div>
      <div className="subtitle">Let's update clients account!</div>
      {error? <span className="error">{error}</span>:<span></span>}
      <div className="input-container ic2">
        <input id="email" className="input" required type="email" placeholder=" " onChange={(e)=> setData({...data, email: e.target.value})}/>
        <div className="cut"></div>
        <label htmlFor="email" className="placeholder">Email</label>
      </div>
      <div className="input-container ic2">
        <input id="password" required className="input" type="password" placeholder=" " onChange={(e)=> setData({...data, password: e.target.value})}/>
        <div className="cut cut-short"></div>
        <label htmlFor="password" className="placeholder">Password</label>
      </div>
      <button type="text" className="submit">submit</button>
    </form>
</div>	
		)
}

export default SignIn