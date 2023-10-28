import { useState } from "react";
import { backendUrl } from "../../../config.js";
import { useNavigate } from "react-router-dom";
const RegisterUser = () => {
  const navigate=useNavigate();

const navigateToLogin=()=>{
  navigate('/login')
}
const navigateToInfo=()=>{
  navigate('/info')
        
}
    const initialState ={
        name:'',
        email:'',
        password:'',
    }
    const [userData,setUserData]=useState(initialState)
    const handleSubmit = async(e) => {
      e.preventDefault();
        console.log(userData)
        const userResponse=await fetch(`${backendUrl}/user/register`,{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type': 'application/json',
            }
        })
        const data=await userResponse.json();
        if(userResponse.status===200){
          alert("user created successfully please check you email to validate")
          navigateToInfo();
          
        }
        else if(userResponse.status===409){
          alert("user already exists please login");
          setUserData(initialState)
        }
        console.log(data)

    }
  return (
    <section className="container-fluid" style={{marginTop:'7%'}}>
    <section className="row justify-content-center">
      <section className="col-12 col-sm-6 col-md-4">
      <h1 className="text-center  fs-2">Register Page</h1>
      <form >
      <div className="form-group">
          <label htmlFor="name"  className="m-1"> Name :</label>
          <input
           className="form-control m-1"
            type="text"
            name="name"
            id="name"
            value={userData.name}
            placeholder="Enter Name"
            onChange={(e)=>setUserData({...userData,name:e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email"  className="m-1">Email :</label>
          <input
           className="form-control m-1"
            type="email"
            name="email"
            id="email"
            value={userData.email}
            placeholder="Enter Email"
            onChange={(e)=>setUserData({...userData,email:e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"  className="m-1">Password :</label>
          <input
           className="form-control m-1"
            type="password"
            name="password"
            id="password"
            value={userData.password}
            placeholder="Enter Password"
            onChange={(e)=>setUserData({...userData,password:e.target.value})}
            required
          />
        </div>
        <div className="row justify-content-center m-2">
        <button type="submit" className="btn btn-primary btn-block my-4 mx-1"   onClick={(e)=>{handleSubmit(e);}}>submit</button>
        </div>
        <div className="fw-light m-3 text-center">
       <h5  className="fw-light m-3 text-center">Already have account  <button className="btn btn-outline-warning mx-5" onClick={navigateToLogin}>Login</button></h5></div>
      </form>
      </section>
    </section>
  </section>
  )
}

export default RegisterUser