import { Navigate } from "react-router-dom";
import { JwtDecodedRole } from "./Jwt";

export function Protected({ children }) {
  const userConected = localStorage.getItem("token");

  if (userConected) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export function ProtectedBusiness({ children }) {
  if (JwtDecodedRole() === "Business") {
    return children;
  } else if (JwtDecodedRole() === "Admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export function ProtectedAdmin({ children }) {
  if (JwtDecodedRole() === "Admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
