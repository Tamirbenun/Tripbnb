import "../CSS/UserConnected.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { DataContext } from "../Contexts/DataContext";
import {
  JwtDecodedEmail,
  JwtDecodedName,
  JwtDecodedRole,
} from "../Service/Jwt";
import { GetUser } from "../Service/Api";

export default function UserConnection() {
  const { theme } = useContext(ThemeContext);
  const { imageList } = useContext(DataContext);
  const token = localStorage.getItem("token");
  let imageCheck = localStorage.getItem("imageProfile");

  useEffect(() => {
    LoadUser();
  });

  const LoadUser = async () => {
    if (token && !imageCheck) {
      try {
        const userDetails = await GetUser(token, JwtDecodedEmail());
        await localStorage.setItem("imageProfile", userDetails.Image);
      } catch (error) {
        console.error("Failed to load User:", error);
      }
    } else {
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("imageProfile");
    window.location.reload(true);
  };

  return (
    <>
      {token ? (
        <div className="dropdown d-flex align-items-center hide-xs">
          <button
            className={`btn user-droopdown-${theme} d-flex align-items-center rounded-3 p-0`}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={
                localStorage.getItem("imageProfile")
                  ? localStorage.getItem("imageProfile")
                  : imageList.A0
              }
              className="imageProfileSize rounded-3"
              alt="ImageProfile"
            />
            <p
              className={`user-name d-flex align-self-center mb-0 ms-2 me-2 t-${theme}`}
            >
              {JwtDecodedName()}
            </p>
          </button>
          <ul
            className={`dropdown-menu dropdown-menu-end rounded-4 dropdown-menu-${theme} mt-3`}
          >
            <li>
              <Link to="/Profile" className="dropdown-item">
                <i className="bi bi-person-vcard me-2"></i> Profile
              </Link>
            </li>
            <li>
              <Link to="/MyCards" className="dropdown-item">
                <i className="bi bi-card-heading me-2"></i> My Cards
              </Link>
            </li>
            <li>
              <Link to="/WatchList" className="dropdown-item">
                <i className="bi bi-heart me-2"></i> Watch List
              </Link>
            </li>
            {JwtDecodedRole() === "Admin" ? (
              <>
                <li>
                  <h6 className="dropdown-header">Admin:</h6>
                </li>
                <li>
                  <Link to="/Users" className="dropdown-item">
                    <i className="bi bi-people me-2"></i> Users
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            <hr className="m-2" />
            <li>
              <button onClick={handleLogOut} className="dropdown-item">
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="hide-xs02 d-flex align-items-center">
          <Link to="/Login">
            <button
              className={`btn btn-sm btn-outline-${
                theme === "light" ? "dark" : "light"
              } rounded-3 me-2`}
            >
              Login
            </button>
          </Link>
          <Link to="/Register">
            <button
              className={`btn btn-sm btn-${
                theme === "light" ? "dark" : "light"
              } rounded-3 me-2`}
            >
              Register
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
