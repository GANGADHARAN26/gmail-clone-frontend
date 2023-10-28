import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";
import { backendUrl } from "../../../config";
const PasswordVerify = () => {
    const [params,]=useSearchParams();
 
    const [isLoading,setLoading]=useState(false);
    const [isVerified,setVerified]=useState(false);
    const verifyUser=async()=>{
      setLoading(true);
      await fetch(`${backendUrl}/user/passwordVerify`,{
          method:'POST',
          body: JSON.stringify({token:params.get('token')}),
          headers:{
              'Content-Type': 'application/json',
          }
      }) 
      setVerified(true);
      setLoading(false)
    }
    useEffect(()=>{
      verifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <section className="container-fluid" style={{marginTop:'11%'}}>
      <section className="row justify-content-center">
        <section className="col-12 col-sm-6 col-md-4">
          {isLoading&&"Email Verifing please wait..."}
          {!isLoading&&isVerified&&<UpdatePassword token={params.get('token')}/>}
          {!isLoading && !isVerified && 'Unable to verify your email  please wait...'}
          </section>
      </section>
    </section>
  )
}

export default PasswordVerify