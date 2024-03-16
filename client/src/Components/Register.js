import React from 'react'
import {useState} from 'react';
import {Link,Outlet, useNavigate} from 'react-router-dom'

function Register() {
    const [email,setEmail] = useState('');
    const [pass,setPass]  = useState('');
    const navigate = useNavigate();
    async function registerUser(event){
      event.preventDefault()
      const response =await fetch('http://localhost:4000/api/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          email,
          pass,
        }),
      });
      const data = await response.json();
      if(data.status === "registered"){
        navigate('/login')
      }
      else{
        navigate('/register')
      }
      console.log(data);
    }
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"16%",flexDirection:'column'}}>
      <h1>Register</h1>
      <br/>
      <form onSubmit={registerUser}>
        <input
        style={{marginBottom:"9px", border:"2px solid lightgrey",borderRadius:"4px", paddingRight:"15px"}} 
        value={email}
        type='email' 
        onChange={(e)=> setEmail(e.target.value)}
        required 
        placeholder='Email'/>
        <br/>
        <input 
        style={{marginBottom:"9px", border:"2px solid lightgrey",borderRadius:"4px", paddingRight:"15px"}} 
        value={pass}
        onChange={(e)=>{setPass(e.target.value)}}
        type='password' 
        placeholder='Password'
        required />
        <br/>
        <input   style={{marginBottom:"9px", border:"2px solid lightgrey",borderRadius:"4px", paddingRight:"15px"}} 
                type='submit' placeholder='Register'/>
      </form>
      <h6 style={{color:"green"}}>Already have an account ?</h6>
      <Link style={{textDecoration:"none"}} to="/login">LOGIN</Link>
      <Outlet/>
    </div>
  )
}


export default Register;
