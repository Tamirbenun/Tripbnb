import "../CSS/NavBarUser.css";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { JwtDecodedRole } from "../Service/Jwt";

export default function NavBarUser() {
  const { theme } = useContext(ThemeContext);
  const correctPage = useLocation();
  const page = correctPage.pathname.slice(1);

  return (
    <div className={`row nav-bg-${theme} m-0 p-0`}>
      <ul className="d-flex justify-content-center align-items-center list-unstyled m-0 p-0">
        <li
          className={`li-${theme} ${
            page === "Profile" ? `profile-${theme}` : ""
          }`}
        >
          <Link to="/Profile" className="nav-link active p-2">
            Profile
          </Link>
        </li>
        <li
          className={`li-${theme} ${
            page === "WatchList" ? `watch-list-${theme}` : ""
          }`}
        >
          <Link to="/WatchList" className="nav-link active p-2">
            Watch List
          </Link>
        </li>
        {JwtDecodedRole() === "Business" ? (
          <li
            className={`li-${theme} ${
              page === "MyCards" ? `my-cards-${theme}` : ""
            }`}
          >
            <Link to="/MyCards" className="nav-link active p-2">
              My Cards
            </Link>
          </li>
        ) : (
          <></>
        )}
        {JwtDecodedRole() === "Admin" ? (
          <li
            className={`li-${theme} ${
              page === "MyCards" ? `my-cards-${theme}` : ""
            }`}
          >
            <Link to="/MyCards" className="nav-link active p-2">
              My Cards
            </Link>
          </li>
        ) : (
          <></>
        )}
        {JwtDecodedRole() === "Admin" ? (
          <li
            className={`li-${theme} ${
              page === "Users" ? `users-${theme}` : ""
            }`}
          >
            <Link to="/Users" className="nav-link active p-2">
              Users
            </Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
