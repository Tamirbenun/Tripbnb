import "../CSS/Modals.css";
import React, { useState, useContext } from "react";
import { DataContext } from "../Contexts/DataContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import { RegisterUser } from "../Service/Api";
import { v4 as uuidv4 } from "uuid";

export function ModalAddUser() {
  const { theme, reversedTheme } = useContext(ThemeContext);
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
  const id = uuidv4();

  if (gender === "Female") {
    setImage("https://i.postimg.cc/YCzWjFqK/avatar-02.jpg");
  } else if (gender === "Male") {
    setImage("https://i.postimg.cc/FH7ZLG85/avatar-01.jpg");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("The Passwords does not match");
      return;
    } else {
      try {
        await RegisterUser(id, name, email, password, gender, image);
      } catch (error) {
        console.error("Registration Error:", error);
        setError("Failed to register. Please try again.");
      }
    }
  }

  const checkValue = () => {
    if (
      name &&
      email &&
      password.length > 3 &&
      gender &&
      password === confirmPassword
    ) {
      return "modal";
    } else {
      return "no";
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary rounded-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <span className="d-none d-sm-inline">Add User</span>
        <i className="bi bi-plus-circle-fill ms-sm-2 ms-0"></i>
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className={`modal-content modal-${theme} rounded-5 p-4`}>
            <div className="modal-header d-flex justify-content-between border-0 p-0 mb-3">
              <h3
                className={`text-${
                  theme === "light" ? "black" : "light"
                } ps-2 mb-0 mt-1`}
              >
                Add User
              </h3>
              <button
                type="button"
                className={`close-${theme} border-0 rounded-5`}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <h3 className="d-flex align-items-center justify-content-center m-0">
                  <i className="bi bi-x"></i>
                </h3>
              </button>
            </div>
            <div className="modal-body p-0 mt-3">
              <form onSubmit={handleSubmit} className="form-ontrol">
                <div className="row p-2">
                  <div className="col-12 mb-3">
                    <div className={`form-floating`}>
                      <input
                        className="form-control"
                        id="floatingInputName"
                        name="Name"
                        type="text"
                        placeholder=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Full Name
                      </label>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <select
                      className="form-select p-3"
                      id="inputGroupSelect01"
                      defaultValue={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Choose gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="floatingInputEmail"
                        type="email"
                        name="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=""
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Email address
                      </label>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-floating">
                      <input
                        className="form-control"
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
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="floatingPasswordConfirm"
                        type="password"
                        name="Password"
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
                  </div>
                  <div className="error d-flex justify-content-center p-3">
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
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="button"
                      className={`btn modal-btn-cancel-${theme} rounded-4 me-2`}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      data-bs-dismiss={checkValue()}
                      className={`btn rounded-4 modal-btn-create-${theme}`}
                    >
                      Create<i className="bi bi-check-circle ms-1"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
