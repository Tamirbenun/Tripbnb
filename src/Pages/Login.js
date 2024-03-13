import "../CSS/Login-Register.css";
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DataContext } from "../Contexts/DataContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import { LoginUser } from "../Service/Api";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const { email, setEmail, password, setPassword, token, setToken } =
    useContext(DataContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginUser(email, password);
      setToken(response.token);
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload(true);
    } catch (error) {
      setError("The Username or Password is incorrect");
    }
  };

  return (
    <div
      className={`container-fluid bg-${
        theme === "light" ? "white" : "black"
      } text-${theme === "light" ? "dark" : "white"}`}
    >
      <div className="row d-flex justify-content-center vh-100 ">
        <div className={`col-sm-12 col-md-6 col-lg-6 col-xl-6 text`}>
          <div className="row pt-4 ps-4 pe-4"></div>
          <div className="row text-center mt-5">
            <h1 className="fw-bold mt-4 mb-5">Login</h1>
          </div>
          <div className="row ps-xl-5 pe-xl-5">
            <div className="ps-lg-5 pe-lg-5">
              <form
                onSubmit={handleSubmit}
                className={`form-control text-center border-0 ps-5 pe-5 bg-${
                  theme === "light" ? "white" : "black"
                } text-${theme === "light" ? "dark" : "white"}`}
              >
                <div
                  className={`row form-floating mb-4 text-text-${
                    theme === "light" ? "black" : "white"
                  }`}
                >
                  <input
                    className={`form-control bg-${
                      theme === "light" ? "white" : "black"
                    } ${theme}`}
                    id="floatingInput"
                    type="email"
                    name="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    required
                  />
                  <label className="form-label label" htmlFor="floatingInput">
                    Email address
                  </label>
                </div>
                <div className={`row form-floating mb-4 text`}>
                  <input
                    className={`form-control bg-${
                      theme === "light" ? "white" : "black"
                    } ${theme}`}
                    id="floatingPassword"
                    name="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    required
                  />
                  <label className="form-label" htmlFor="floatingPassword">
                    Password
                  </label>
                </div>
                <div className="row mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Enter
                  </button>
                </div>
                <div className="row error d-flex justify-content-center p-2">
                  {error ? (
                    <>
                      <span>
                        <i className="bi bi-exclamation-circle-fill me-2"></i>
                        {error}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </form>
              <div className="row">
                <div className="d-flex justify-content-center">
                  <p className={`pt-4 text`}>
                    Do not have an account?{" "}
                    <Link to="/Register" className="fw-bold link-primary">
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
