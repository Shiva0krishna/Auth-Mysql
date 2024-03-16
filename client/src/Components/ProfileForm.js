import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function ProfileForm() {
    const navigate = useNavigate();
    const [name ,setName] = useState('');
    const [dob ,setdob] = useState('');
    const [degree,setDegree] = useState('');
    const [department ,setDepartment] = useState('');
    const [reg, setReg] =useState('');
    const [adress, setAdress] =useState('');
    const [email, setEmail] =useState('');
    const [phoneNumber, setPhoneNumber] =useState('');
    
    async function getDetails(event){
      event.preventDefault()
      try {
        const response=await fetch('http://localhost:4000/api/ProfileForm',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            name,
            reg,
            email,
            phoneNumber,
            adress,
            dob,
            department,
            degree,
          }),
        });
        const info = await response.json();
        if(info.status === "data received"){
          navigate('/StudentProfile');
        }
        else{
          console.log("Data-Not found");
        }
        console.log(info);
      } catch (error) {
        console.log("Error Occured:" + error)
      }
        
    }
return (
    <div style={{display:"flex", justifyContent:'center',alignItems:'center',height:'100vh',}}>
      <form onSubmit={getDetails} 
            style={{width:'55%',
            height:"90%",
            border:'1px solid lightgrey',
            padding:'7%',
            scrollbarWidth:'none',
            overflow:'scroll',
            borderRadius:'10px',
            boxShadow:'0px 0px 5px 5px lightgrey'}}>
        <h4 style={{color:'dodgerblue'}}>Complete Your Profile</h4>
        <div class="form-row">
          <div class="col">
            <input type="text" value={name} onChange={(e)=>{
                setName(e.target.value)
            }} required class="form-control" placeholder="Enter your Name"/> <br/>
          </div>
          <div class="col">
            <input type="text" value={reg} onChange={(e)=>{
                setReg(e.target.value)
            }} required class="form-control" placeholder="RegId"/>
          </div>
          <br/>
          <div class="col">
            <input type="email" value={email} onChange={(e)=>{
                setEmail(e.target.value)
            }} class="form-control" placeholder="Email"/> <br/>
          </div>

          <div class="col">
            <input type="text" value={phoneNumber} onChange={(e)=>{
                setPhoneNumber(e.target.value)
            }} required class="form-control" placeholder="phoneNumber"/> <br/>
          </div>

          <div class="col">
            <input type="text" value={dob} onChange={(e)=>{
                setdob(e.target.value)
            }} required class="form-control" placeholder="DOB in form of YYYY-MM-DD"/> <br/>
          </div>

          <div class="col">
            <input type="text" value={adress} onChange={(e)=>{
                setAdress(e.target.value)
            }} required class="form-control" placeholder="Adress"/> <br/>
          </div>

          <div class="col">
            <input type="text" value={department} onChange={(e)=>{
                setDepartment(e.target.value)
            }} required class="form-control" placeholder="Department"/> <br/>
          </div>


          <div class="col">
            <input type="text" value={degree} onChange={(e)=>{
                setDegree(e.target.value)
            }} required class="form-control" placeholder="Degree"/> <br/>
          </div>

          <input style={{padding:'5px 20px' , background:'dodgerblue', border:'none',borderRadius:'6px'}}  type='submit' placeholder='Register'/>
        </div>
      </form>
    </div>
  )
}
