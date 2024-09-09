import { useContext, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handelRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const url = form.url.value;
    const password = form.password.value;
    const confirmPass = form.confirmPass.value;
    setSuccess("");
    setError("");
    //password validation
    if (password.length < 6) {
      setError("Password must be 6 characters");
      return;
    } else if (password !== confirmPass) {
      setError("Password not match");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must include at least one uppercase letter.");
    } else if (!/[!@#$%^&*()_+\-={}[\]|:";'<>?,./]/.test(password)) {
      setError("Password must include at least one special character.");
    }
    const user = {
      name,
      url,
      password,
      confirmPass,
      email,
    };
    console.log(user);
    registerUser(email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("Login Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="text"
                placeholder="url"
                name="url"
                className="input input-bordered"
              />
            </div>
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
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPass"
                placeholder="Confirm password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            {error && <p className="text-red-600"> {error}</p>}
            {success && <p className="text-green-600"> {success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
