import "../CSS/ButtonTheme.css";
import React, { useContext, useLayoutEffect } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function ButtonTheme() {
  const { theme, buttonTheme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "white" : "black";
  });

  return (
    <button
      className={`btn-theme btn-theme-${theme} d-flex align-self-center justify-content-center rounded-3 ms-2 me-2 border-0`}
      onClick={buttonTheme}
    >
      <i
        className={`bi bi-${
          theme === "dark" ? "brightness-high" : "moon"
        }-fill d-flex align-self-center `}
      ></i>
    </button>
  );
}
