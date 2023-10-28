import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../../config";
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate=useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email : "+email)
    
    const forgotResponse=await fetch(`${backendUrl}/user/forgotPassword`,{
      method: "POST",
      body:JSON.stringify({email}),
      headers:{
        'Content-Type': 'application/json',
      }
    })
    const data=await forgotResponse.json();
     console.log(data)
    
    setEmail("")
    
  }; 
  const navigateToInfo=()=>{
     navigate('/forgotInfo')
  }
  return (
    <section className="container-fluid" style={{marginTop:'11%'}}>
    <section className="row justify-content-center">
      <section className="col-12 col-sm-6 col-md-4">
      <h2>Forgot Password</h2>
      <form onSubmit={(e) => { handleSubmit(e); navigateToInfo(); }}>
        <div className="form-group">
          <label className="m-1">Email:</label>
          <input
           className="form-control m-1"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="submit"  className="btn btn-primary btn-block m-1">Send Verification Link to Email</button>
      </form>
      </section>
  </section>
</section>
  );
}


export default ForgotPassword