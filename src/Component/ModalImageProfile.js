import "../CSS/Modals.css";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { DataContext } from "../Contexts/DataContext";
import { UpdateUser } from "../Service/Api";
import { Link } from "react-router-dom";

export default function ModalImageProfile({ user, LoadUser }) {
  const { theme } = useContext(ThemeContext);
  const { imageList } = useContext(DataContext);
  const [image, setImage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setImage(user?.Image || "");
  }, [user]);

  const handleSubmit = async () => {
    try {
      if (user) {
        await UpdateUser(
          token,
          user.ID,
          image,
          user.Name,
          user.Email,
          user.Password,
          user.Gender,
          user.Role
        );
      }
      localStorage.setItem("imageProfile", image);
      window.location.reload();
    } catch (error) {
      alert("Failed to Change Image Profile:", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className={`modal-content modal-${theme} rounded-5 p-4`}>
          <div className="modal-header d-flex justify-content-between border-0 p-2 mb-2">
            <h3
              className={`mb-0 text-${theme === "light" ? "black" : "light"}`}
            >
              Image Profile
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
          <div className="modal-body p-0">
            <div className="row rounded-3 m-2 m-md-0 m-lg-2 p-2 p-md-2 p-lg-4 d-flex justify-content-center border border-1">
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A1 === image ? "selected" : ""
                  }`}
                  src={imageList.A1}
                  onClick={() => setImage(imageList.A1)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A2 === image ? "selected" : ""
                  }`}
                  src={imageList.A2}
                  onClick={() => setImage(imageList.A2)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A3 === image ? "selected" : ""
                  }`}
                  src={imageList.A3}
                  onClick={() => setImage(imageList.A3)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A4 === image ? "selected" : ""
                  }`}
                  src={imageList.A4}
                  onClick={() => setImage(imageList.A4)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A5 === image ? "selected" : ""
                  }`}
                  src={imageList.A5}
                  onClick={() => setImage(imageList.A5)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A6 === image ? "selected" : ""
                  }`}
                  src={imageList.A6}
                  onClick={() => setImage(imageList.A6)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A7 === image ? "selected" : ""
                  }`}
                  src={imageList.A7}
                  onClick={() => setImage(imageList.A7)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A8 === image ? "selected" : ""
                  }`}
                  src={imageList.A8}
                  onClick={() => setImage(imageList.A8)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A9 === image ? "selected" : ""
                  }`}
                  src={imageList.A9}
                  onClick={() => setImage(imageList.A9)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A10 === image ? "selected" : ""
                  }`}
                  src={imageList.A10}
                  onClick={() => setImage(imageList.A10)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A11 === image ? "selected" : ""
                  }`}
                  src={imageList.A11}
                  onClick={() => setImage(imageList.A11)}
                  alt="image1"
                />
              </div>
              <div className="col-4 col-sm-3 col-lg-2 d-flex justify-content-center p-sm-0">
                <img
                  className={`img-list m-2 rounded-4  ${
                    imageList.A12 === image ? "selected" : ""
                  }`}
                  src={imageList.A12}
                  onClick={() => setImage(imageList.A12)}
                  alt="image1"
                />
              </div>
            </div>
            <div className="row p-0 m-2 mt-3 m-md-0 mt-md-3 m-lg-2 mt-lg-3">
              <div className="col">
                <div
                  className={`row form-floating text-${
                    theme === "light" ? "black" : "light"
                  }`}
                >
                  <input
                    className={`form-control rounded-3 ${theme}`}
                    id="floatingInput"
                    type="text"
                    name="Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder=""
                    pattern="https?://.+"
                    title="Include http://"
                    required
                  />
                  <label className="form-label label" htmlFor="floatingInput">
                    Image Link
                  </label>
                  <div className="d-flex p-0 m-1 mt-3">
                    <i className="bi bi-info-circle me-1 i"></i>
                    <p className="p-0 m-0 fs">
                      to uploading photos for free and getting a link to share
                      go to:
                      <Link
                        className="p-0 m-0 ms-2"
                        to="https://postimages.org/"
                        target="_blank"
                      >
                        www.postimages.org
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-0 p-0 d-flex justify-content-end">
            <button
              type="button"
              className={`btn modal-btn-cancel-${theme} rounded-4 me-2`}
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setImage(user.Image)}
            >
              Cancel
            </button>
            <button
              type="submit"
              data-bs-dismiss="modal"
              className={`btn rounded-4 modal-btn-create-${theme}`}
              onClick={handleSubmit}
            >
              Save<i className="bi bi-check-circle ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
