import { useContext, useEffect } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, googleLogin,setUser,facebook,user } = useContext(AuthContext);
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location)
  const handelLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = {
      password,
      email,
    };
    console.log(user);
    loginUser(email, password)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const handelFacebookLogin = () => {
    facebook()
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  useEffect(() =>{
    if(user){
      navigate(location.state)
    }
  },[user])
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <button onClick={handelGoogleLogin} className="btn btn-secondary">
              Google Login
            </button>
            <button onClick={handelFacebookLogin} className="btn btn-secondary">
              Facebook Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
