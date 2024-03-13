import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { DataProvider } from "./Contexts/DataContext";
import NavBar from "./Component/NavBar";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CardView from "./Pages/CardView";
import AboutUs from "./Pages/AboutUs";
import { Protected } from "./Service/Protected";
import { ProtectedBusiness } from "./Service/Protected";
import { ProtectedAdmin } from "./Service/Protected";
import NavBarUser from "./Component/NavBarUser";
import Profile from "./Pages/Profile";
import MyCards from "./Pages/MyCards";
import WatchList from "./Pages/WatchList";
import Users from "./Pages/Users";

export default function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/CardView" element={<CardView />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route
              path="/Profile"
              element={
                <Protected>
                  <NavBarUser />
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="/MyCards"
              element={
                <ProtectedBusiness>
                  <NavBarUser />
                  <MyCards />
                </ProtectedBusiness>
              }
            />
            <Route
              path="/WatchList"
              element={
                <Protected>
                  <NavBarUser />
                  <WatchList />
                </Protected>
              }
            />
            <Route
              path="/Users"
              element={
                <ProtectedAdmin>
                  <NavBarUser />
                  <Users />
                </ProtectedAdmin>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </DataProvider>
  );
}
