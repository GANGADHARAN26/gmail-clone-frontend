import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { backendUrl } from './../../../config';
const UserVerification = () => {
  const navigate=useNavigate();

    const [params,]=useSearchParams();
    const [loading,setLoading]=useState(false);
    const [isVerified,setVerified]=useState(false);
    const verify=async()=>{
        setLoading(true);
        await fetch(`${backendUrl}/user/verify`,{
            method: 'POST',
            body: JSON.stringify({token:params.get('token')}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        setVerified(true)
        setLoading(false)
    }
    useEffect(()=>{
        verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    console.log(params.get('token'));
    const navigateToLogin=()=>{
        navigate('/login')
    }
  return (
    <section className="container-fluid" style={{marginTop:'11%'}}>
    <section className="row justify-content-center">
      <section className="col-12 col-sm-6 col-md-4">
        {loading && 'verifying please wait'}
           {!loading && isVerified  &&<h1>verification completed please login <button onClick={navigateToLogin}>login</button></h1> }
           {!loading && !isVerified && 'unable to verify'}
           </section>
    </section>
  </section>
  )
}

export default UserVerification