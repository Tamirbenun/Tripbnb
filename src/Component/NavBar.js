import "../CSS/NavBar.css";
import ButtonTheme from "./ButtonTheme";
import UserConnected from "./UserConnected";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { JwtDecodedRole, JwtDecodedName } from "../Service/Jwt";

export default function NavBar() {
  const { theme } = useContext(ThemeContext);

  const userConected = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload(true);
  };

  return (
    <header>
      <nav
        className={`navbar navbar-expand-md navbar-${theme} bg-nv-${theme} p-0`}
      >
        <div className="container-fluid d-flex justify-content-start p-lg-3 p-md-3 p-sm-3 p-2 pt-3 ">
          <button
            className="navbar-toggler navbar-toggler-btn me-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className="navbar-brand p-0 d-flex">
            <h4 className="p-0 m-0 fw-bold">Trip</h4>
            <h4 className="bnb fw-bold m-0">bnb</h4>
          </Link>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className={`offcanvas-header bg-nv-s-${theme} p-4`}>
              <div className="offcanvas-title" id="offcanvasNavbarLabel">
                <span>
                  <h3 className="fw-light p-4 pt-0 pb-0 m-0">
                    Hello,{userConected ? " " + JwtDecodedName() : " Guest"}
                  </h3>
                </span>
              </div>
              <button
                type="button"
                className={`btn-close-${theme} rounded-5 p-0`}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <h1 className="d-flex align-items-center justify-content-center m-0">
                  <i className="bi bi-x"></i>
                </h1>
              </button>
            </div>
            <div
              className={`offcanvas-body bg-nv-s-${theme} p-md-0 p-5`}
              data-bs-dismiss="offcanvas"
            >
              <ul className="navbar-nav justify-content-start flex-grow-1">
                <li className="nav-item d-flex justify-self-center">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <>
                  {userConected ? (
                    <>
                      <li className="nav-item d-md-none">
                        <Link to="/Profile" className="nav-link">
                          Profile
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/WatchList" className="nav-link">
                          Watch List
                        </Link>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </>
                <>
                  {JwtDecodedRole() === "Business" ? (
                    <li className="nav-item">
                      <Link to="/MyCards" className="nav-link">
                        My Cards
                      </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                </>
                <>
                  {JwtDecodedRole() === "Admin" ? (
                    <li className="nav-item">
                      <Link to="/MyCards" className="nav-link">
                        My Cards
                      </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                </>
                <li className="nav-item">
                  <Link to="/AboutUs" className="nav-link">
                    About Us
                  </Link>
                </li>

                <div className="d-md-none position-absolute bottom-0 mb-5">
                  {userConected ? (
                    <>
                      <li>
                        <button onClick={handleLogOut} className="btn p-0">
                          <i className="bi bi-box-arrow-right me-2"></i> Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link
                          to="/Login"
                          className="nav-link d-flex align-items-center"
                        >
                          <h5 className="d-inline d-flex align-items-center m-0">
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                          </h5>
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Register" className="nav-link">
                          <i className="bi bi-pencil-square ms-1 me-2"></i>
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </div>
              </ul>
            </div>
          </div>
          <div className="ms-auto">
            <div className="d-flex justify-content-end">
              <ButtonTheme />
              <UserConnected />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
