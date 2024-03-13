import "../CSS/Profile.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { DataContext } from "../Contexts/DataContext";
import { JwtDecodedEmail } from "../Service/Jwt";
import { GetUser, UpdateUser } from "../Service/Api";
import ModalImageProfile from "../Component/ModalImageProfile";

export default function Profile() {
  const { theme } = useContext(ThemeContext);
  const { imageList } = useContext(DataContext);
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [edit, setEdit] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setEmail(user?.Email || "");
    setName(user?.Name || "");
    setPassword("");
    setImage(user?.Image || "");
    setGender(user?.Gender || "");
    setID(user?.ID || "");
    setRole(user?.Role || "");
  }, [user]);

  const LoadUser = async () => {
    try {
      const userDetails = await GetUser(token, JwtDecodedEmail());
      setUser(userDetails);
    } catch (error) {
      console.error("Failed to load Cards:", error);
    }
  };

  if (user.length === 0) {
    LoadUser();
  }

  const handleSubmit = async () => {
    try {
      if (user) {
        await UpdateUser(token, ID, image, name, email, password, gender, role);
      }
      LoadUser();
      setEdit(false);
    } catch (error) {
      alert("Failed to save user:", error);
      setEdit(false);
    }
  };

  const handleCancel = () => {
    setEdit(false);
    LoadUser();
  };

  return (
    <div className="container-fluid p-3 p-sm-5 mb-3">
      <div
        className={`text-${theme === "light" ? "black" : "light"} mt-2 mb-4`}
      >
        <h1>My Profile</h1>
        <h5 className="mb-3">Here you can view and edit your information.</h5>
      </div>
      <div
        className={`col box-${theme} rounded-5 d-flex align-items-center p-4`}
      >
        <img
          src={user.Image ? user.Image : imageList.A0}
          className="imageProfileUser rounded-4 border border-5 border-light"
          alt="ImageProfile"
        />
        <div className="ms-4">
          <h5
            className={`fw-bold mb-2 text-${
              theme === "light" ? "black" : "light"
            }`}
          >
            {name}
          </h5>
          <p className={`mb-0 m-0 tag-${role} p-1 rounded-3 d-inline`}>
            {role}
          </p>
        </div>
        <button
          className="btn-edit-light p-1 ps-2 pe-2 ms-auto mb-auto"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <span className="d-none d-sm-inline">Change Image</span>
          <i className="bi bi-pencil-square ms-0 ms-sm-1"></i>
        </button>
        <ModalImageProfile user={user} LoadUser={() => LoadUser()} />
      </div>
      <div className={`box-${theme} rounded-5 p-4 mt-4`}>
        <div className="position-relative">
          {edit === false ? (
            <button
              className="btn-edit-light position-absolute end-0 p-1 ps-2 pe-2 ms-auto mb-auto"
              onClick={() => setEdit(true)}
            >
              Edit
              <i className="bi bi-pencil-square ms-1"></i>
            </button>
          ) : (
            <div className="position-absolute end-0">
              <button
                className={`btn-cancel-${theme} p-1 ps-2 pe-2 me-2`}
                onClick={handleCancel}
              >
                Cancel
                <i className="bi bi-x-circle ms-1"></i>
              </button>
              <button className="btn-save p-1 ps-2 pe-2" onClick={handleSubmit}>
                Save
                <i className="bi bi-check-circle ms-1"></i>
              </button>
            </div>
          )}
        </div>
        <div className="row p-3 mt-5 mt-sm-3">
          <div className="col-12 col-sm mb-3 mb-sm-0">
            <h6 className={`lable-${theme} d-block ms-2`}>Name</h6>
            <input
              className={`input-${theme}-edit-${edit} w-100`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={edit === true ? false : true}
            />
          </div>
          <div className="col">
            <h6 className={`lable-${theme} d-block ms-2`}>Gender</h6>
            <input
              className={`input-${theme}-edit-${edit} w-100`}
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={edit === true ? false : true}
            />
          </div>
          <div className="col">
            <h6 className={`lable-${theme} d-block ms-2`}>Role</h6>
            <input
              className={`input-${theme}-edit-${edit} bg-${
                theme === "light" ? "white" : "black"
              } w-100`}
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="row p-3 pt-0 mt-0 mt-sm-3">
          <div className="col-12 col-sm mb-3 mb-sm-0">
            <h6 className={`lable-${theme} d-block ms-2`}>Email</h6>
            <input
              className={`input-${theme}-edit-${edit} w-100`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={edit === true ? false : true}
            />
          </div>
          <div className="col-12 col-sm mb-3 mb-sm-0">
            <div className={`${edit === false ? "d-none" : ""}`}>
              <h6 className={`lable-${theme} d-block ms-2`}>password</h6>
              <input
                className={`input-${theme}-edit-${edit} w-100`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={edit === true ? false : true}
              />
            </div>
          </div>
          <div className="col-12 col-sm mt-auto mt-sm text-center text-sm-start">
            <p className={`ms-0 ms-sm-2 ID-${theme}`}>ID: {ID}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
