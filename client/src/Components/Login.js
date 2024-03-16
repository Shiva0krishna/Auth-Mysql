import React from 'react'
import { useContext,createContext } from 'react'; 
import { useState } from 'react';
import {Link ,Outlet,useNavigate} from 'react-router-dom'
// import useFetchapi from '../Coustom/useFetchapi';

let userContext = createContext({level:false ,logged :()=>{}}) ;

function Login() {
  const auth = useContext(userContext);
    const [email,setEmail] = useState('');
    const [err,setErr] =useState('');
    const [pass,setPass]  = useState('');
    const navigate = useNavigate();

    async function LoginUser(event){
      event.preventDefault()
      // const Fetchinstance =useFetchapi('http://localhost:4000/');
      // const [getfnc ,getreq] = Fetchinstance('api/login' ,"POST",JSON.stringify({
      //   email,
      //   pass,
      // }));

      // const response =  await getfnc(getreq);
      const response =await fetch('http://localhost:4000/api/login',{
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
      if(data.status === "User-Found"){
        setErr("Correct Credentails")
        setTimeout(()=>{
          navigate('/Home')
        },0);
        auth.level = true;
      }
      else if(data.status === "User-NotFound"){
        auth.level =false; 
        navigate('/login')
        setErr("Email or Password is incorrect")
      }
      console.log(data);
    }
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"16%",flexDirection:'column'}}>      
    <h1>Login</h1>
      <br/>
      <p style={{color:"red"}}>{err}</p>
      <form onSubmit={LoginUser}>
        <input style={{marginBottom:"9px", border:"2px solid lightgrey",borderRadius:"4px", padding:"2px 30px 2px 5px"}}

        value={email}
        type='email' 
        onChange={(e)=> setEmail(e.target.value)}
        required 
        placeholder='Email'/>
        <br/>
        <input style={{marginBottom:"9px", border:"2px solid lightgrey",borderRadius:"4px", padding:"2px 30px 2px 5px"}}

        value={pass}
        onChange={(e)=>{setPass(e.target.value)}}
        type='password' 
        placeholder='Password'
        required />
        <br/>
        <input style={{marginBottom:"9px", border:"2px solid lightgrey",borderRadius:"4px",}}
         type='submit' placeholder='Register'/>
      </form>
      <h6>Not registered yet ? </h6>
      <Link style={{textDecoration:"none"}} to="/register">Register</Link>
      <Outlet/>
    </div>
  )
}

export default Login;
