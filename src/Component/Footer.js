import "../CSS/Footer.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { JwtDecodedRole } from "../Service/Jwt";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const userConected = localStorage.getItem("token");

  return (
    <footer className={`footer-${theme} mt-auto p-4`}>
      <div className="container-fluid p-0">
        <div className="row ps-4 pe-4">
          <div className="col-sm-12 col-md-2 p-0 text-md-start text-sm-center text-center">
            <h3 className="fw-medium mb-0">Tripbnb</h3>
          </div>
          <div className="col-sm-12 col-md-10 d-md-flex align-items-center justify-content-md-end d-sm-block text-sm-center text-center mt-md-0 mt-sm-4 mt-4 p-0">
            <p>
              <Link className={`link-mod-${theme}`} to="/">
                Home
              </Link>
            </p>
            {userConected ? (
              <>
                <p>
                  <Link className={`link-mod-${theme}`} to="/Profile">
                    Profile
                  </Link>
                </p>
                <p>
                  <Link className={`link-mod-${theme}`} to="/WatchList">
                    Watch List
                  </Link>
                </p>
              </>
            ) : (
              <></>
            )}
            {JwtDecodedRole() === "Business" ? (
              <p>
                <Link className={`link-mod-${theme}`} to="/MyCards">
                  My Cards
                </Link>
              </p>
            ) : (
              <></>
            )}
            {JwtDecodedRole() === "Admin" ? (
              <>
                <p>
                  <Link className={`link-mod-${theme}`} to="/MyCards">
                    My Cards
                  </Link>
                </p>
                <p>
                  <Link className={`link-mod-${theme}`} to="/Users">
                    Users
                  </Link>
                </p>
              </>
            ) : (
              <></>
            )}
            <p>
              <Link className={`link-mod-${theme}`} to="/AboutUs">
                About us
              </Link>
            </p>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="row ps-4 pe-4">
          <div className="col-md-5 col-sm-12 p-0 d-flex align-items-center justify-content-md-start justify-content-sm-center justify-content-center">
            <p className="m-0">
              <i className="bi bi-c-circle me-1 mt-md-0 mt-sm-3 mt-4"></i>
              2024 Copyright
              <Link
                className={`link-mod-${theme} ms-2`}
                to="https://www.facebook.com/tamir.bennun/"
                target="_blank"
              >
                Tamir Benun
              </Link>
            </p>
          </div>
          <div className="col d-flex justify-content-md-end justify-content-sm-center justify-content-center ms-sm-3 p-0 mt-md-0 mt-sm-3 mt-3">
            <Link
              className="btn m-1"
              to="https://www.facebook.com/tamir.bennun/"
              target="_blank"
            >
              <i className={`bi bi-facebook social-btn-${theme}`}></i>
            </Link>
            <Link
              className="btn m-1"
              to="https://www.instagram.com/tamirbenun/"
              target="_blank"
            >
              <i className={`bi bi-instagram social-btn-${theme}`}></i>
            </Link>
            <Link
              className="btn m-1"
              to="https://twitter.com/home"
              target="_blank"
            >
              <i className={`bi bi-twitter social-btn-${theme}`}></i>
            </Link>
            <Link
              className="btn m-1"
              to="https://www.Google.com"
              target="_blank"
            >
              <i className={`bi bi-google social-btn-${theme}`}></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
