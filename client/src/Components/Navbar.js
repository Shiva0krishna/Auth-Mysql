import React from 'react'

export default function Navbar() {
  return (
    <div>
        <nav style={{width:"100vw" ,
                    height :"7vh",
                    padding :"10px ",
                    display:"flex",
                    flexDirection:"row",
                    alignItems:'center',
                    justifyContent:'flex-start',
                    gap:'30px',
                    background:'dodgerblue',
                    textDecoration:'none',
                    color:'whitesmoke',
                    boxShadow:"2px 2px 5px 5px lightgrey",
                     }}>
            <a href='/StudentProfile'style={{color:"whitesmoke",textDecoration:'none', fontSize:"24px"}}>Secure Her</a>
            <a href='/login'style={{color:"whitesmoke",textDecoration:'none'}}>Login</a>
            <a href='/register' style={{color:"whitesmoke",textDecoration:'none'}}>Register</a>
            <a href='/ProfileForm' style={{color:"whitesmoke",textDecoration:'none'}}>ProfileForm</a>
        </nav>
    </div>
  )
}
