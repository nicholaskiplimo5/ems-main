import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Login = () => {
    if (username === "admin" && password === "@2022!") {
      navigate("/Admin/Dashboard");
    }
  };
  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Administrator
                    </h5>
                    <p className="text-center small">
                      Admin Login - MTRH Extension{" "}
                    </p>
                  </div>

                  <form className="row g-3 needs-validation" novalidate>
                    <div className="col-12">
                      <label for="Username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label for="Password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <button onClick={Login} className="btn btn-primary w-40 me-5">
                        Admin Login
                      </button>
                      <button
                        className="btn btn-danger w-40 mr-0"
                      >
                        <Link to={'/'}>Cancel</Link>
                        
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
