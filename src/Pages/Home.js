import "../CSS/Home.css";
import CardsList from "../Component/CardsList";
import { ThemeContext } from "../Contexts/ThemeContext";
import { DataContext } from "../Contexts/DataContext";
import { useContext } from "react";

export default function Main() {
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(DataContext);

  if (localStorage.getItem("token")) {
  } else {
    localStorage.setItem("token", token);
  }

  return (
    <main>
      <div className="container-fluid p-lg-3 p-md-3 p-sm-3 p-xs-5">
        <CardsList />
      </div>
    </main>
  );
}
