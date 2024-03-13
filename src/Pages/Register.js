import "../CSS/Login-Register.css";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DataContext } from "../Contexts/DataContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import { RegisterUser } from "../Service/Api";
import { v4 as uuidv4 } from "uuid";

export default function Register() {
  const { theme } = useContext(ThemeContext);
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    gender,
    setGender,
    image,
    setImage,
  } = useContext(DataContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const id = uuidv4();

  try {
    if (gender === "Female") {
      setImage("https://i.postimg.cc/YCzWjFqK/avatar-02.jpg");
    } else if (gender === "Male") {
      setImage("https://i.postimg.cc/FH7ZLG85/avatar-01.jpg");
    }
  } catch {}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("The Passwords does not match");
      return;
    } else {
      try {
        await RegisterUser(id, name, email, password, gender, image);
        navigate("/login");
      } catch (error) {
        console.error("Registration Error:", error);
        setError("Failed to register. Please try again.");
      }
    }
  };

  return (
    <div
      className={`container-fluid bg-${theme === "light" ? "white" : "black"}`}
    >
      <div className="row d-flex justify-content-center vh-100">
        <div
          className={`col-sm-12 col-md-6 col-lg-6 col-xl-6 text-${
            theme === "light" ? "black" : "white"
          }`}
        >
          <div className="row text-center">
            <h1 className="fw-bold mt-4 mb-5">Register</h1>
          </div>
          <div className="row ps-xl-5 pe-xl-5">
            <div className="ps-lg-5 pe-lg-5">
              <form
                onSubmit={handleSubmit}
                className={`form-control text-center border-0 ps-5 pe-5 bg-${
                  theme === "light" ? "white" : "black"
                }`}
              >
                <div
                  className={`row form-floating mb-4 text-${
                    theme === "light" ? "black" : "white"
                  }`}
                >
                  <input
                    className={`form-control ${theme} bg-${
                      theme === "light" ? "white" : "black"
                    }`}
                    id="floatingInputName"
                    name="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=""
                    required
                  />
                  <label className="form-label label" htmlFor="floatingInput">
                    Full Name
                  </label>
                </div>
                <div className="row mb-4">
                  <select
                    className={`form-select p-3 bg-${
                      theme === "light" ? "white" : "black"
                    } text-${theme === "light" ? "black" : "white"} ${theme}`}
                    id="inputGroupSelect01"
                    defaultValue={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value={"default"}>Choose gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div
                  className={`row form-floating mb-4 text-${
                    theme === "light" ? "black" : "white"
                  }`}
                >
                  <input
                    className={`form-control bg-${
                      theme === "light" ? "white" : "black"
                    } ${theme}`}
                    id="floatingInputEmail"
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
                <div
                  className={`row form-floating mb-4 text-${
                    theme === "light" ? "black" : "white"
                  }`}
                >
                  <input
                    className={`form-control bg-${
                      theme === "light" ? "white" : "black"
                    } ${theme}`}
                    id="floatingPassword"
                    type="password"
                    name="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    pattern=".{4,}"
                    title="4 or more characters"
                    required
                  />
                  <label className="form-label" htmlFor="floatingPassword">
                    Password
                  </label>
                </div>
                <div
                  className={`row form-floating mb-4 text-${
                    theme === "light" ? "black" : "white"
                  }`}
                >
                  <input
                    className={`form-control bg-${
                      theme === "light" ? "white" : "black"
                    } ${theme}`}
                    id="floatingPasswordConfirm"
                    type="password"
                    name="ConfirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=""
                    pattern=".{4,}"
                    title="4 or more characters"
                    required
                  />
                  <label className="form-label" htmlFor="floatingPassword">
                    Confirm Password
                  </label>
                </div>
                <div className="row mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Enter
                  </button>
                </div>
                <div className="row error d-flex justify-content-center p-3">
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
                  <p className={`pt-4 text-`}>
                    Already have an account?{" "}
                    <Link to="/Login" className="fw-bold link-primary">
                      Login
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
