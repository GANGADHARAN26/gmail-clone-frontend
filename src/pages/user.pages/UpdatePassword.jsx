import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../../config";
// eslint-disable-next-line react/prop-types
const UpdatePassword = ({token}) => {
  const navigate=useNavigate();

  const navigateToSuccess=()=>{
    navigate('/success');

}
    const [password, setPassword] = useState('');
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit =async (e) => {
      e.preventDefault();
     const payload={password,token}
     console.log("token"+token,"password :"+password)
     const updateResponse=await fetch(`${backendUrl}/user/updatePassword`,{
      method: "POST",
      body:JSON.stringify(payload),
      headers:{
        'Content-Type': 'application/json',
      }
    })
    const data=await updateResponse.json();
     console.log(data)
    setPassword('');
    if(updateResponse.status==401){
      alert('still password reset validation failed please try again');
  }
  navigateToSuccess();
    };
  
  return (
    <section className="container-fluid" style={{marginTop:'11%'}}>
      <section className="row justify-content-center">
        <section className="col-12 col-sm-6 col-md-4">
        <h2>Enter your new pass to update</h2>
        <form onSubmit={handleSubmit}>
        
          <div className="form-group">
            <label  className="m-1">Password:</label>
            <input
              type="password
              "
              className="form-control m-1"
              placeholder="Enter your password need to change"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit"  className="btn btn-primary btn-block m-2" onClick={()=>{handleSubmit;}}>Submit</button>
        </form>
        </section>
    </section>
  </section>
    );
  }
  

export default UpdatePassword