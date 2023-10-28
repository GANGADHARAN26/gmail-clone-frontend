import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate=useNavigate();

  const navigateToLogin=()=>{
      navigate('/login');
  }
  return (
    <section className="container-fluid" style={{marginTop:'11%'}}>
    <section className="row justify-content-center">
      <section className="col-12 col-sm-6 col-md-4">
    <h1>password succesfully updated please login with new password<button onClick={navigateToLogin}    className="btn btn-danger btn-block m-4">login</button>
    </h1>
    </section>
    </section>
  </section>
  )
}

export default SuccessPage