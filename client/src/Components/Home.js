import React from 'react'
import { useEffect ,useState} from 'react';
import Navbar from './Navbar';

export default  function Home() {
  const [value,setValue] =useState('');

  useEffect(()=>{

    async function Retrivedata(){
        const response =await fetch('http://localhost:4000/api/home',{
                method:'GET',
                headers:{
                  'Content-Type':'application/json',
                },
          });
          let key= await response.json();
          setValue(key.Email);
    }
    Retrivedata();
  })
  

  return (
    <div>
      <Navbar/>
      <p>Home</p>
      This  is the MVP product of the simple implimentation of the  user authentication.It is yet to be modified .
      <p>{value}</p>
    </div>
  )
}
