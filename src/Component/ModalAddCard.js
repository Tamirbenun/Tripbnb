import "../CSS/Modals.css";
import { useContext, useState } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { PostItem } from "../Service/Api";
import { JwtDecodedID } from "../Service/Jwt";
import { Link } from "react-router-dom";

export function ModalAddCard() {
  const { theme } = useContext(ThemeContext);
  const [number, setNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const reviews = [];
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const watchList = [];
  const token = localStorage.getItem("token");

  const cardData = {
    UpdatedAt: new Date(),
    Data: {
      CreatedBy: JwtDecodedID(),
      Address: {
        Number: number,
        Country: country,
        City: city,
        Street: street,
      },
      Reviews: reviews,
      Price: price,
      Title: title,
      Description: description,
      Image: image,
      Phone: phone,
      Guests: guests,
      WatchList: watchList,
    },
    Scope: "Public",
    CreatedAt: new Date(),
  };

  const checkValue = () => {
    if (
      street &&
      number > 0 &&
      city &&
      country &&
      price > 0 &&
      title &&
      description &&
      guests > 0 &&
      phone &&
      image.includes("https://")
    ) {
      return "modal";
    } else {
      return "no";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PostItem(token, cardData);
    } catch (error) {
      console.error("Failed Add Card Error:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <span className="d-none d-sm-inline">Add Card</span>
        <i className="bi bi-plus-circle-fill ms-sm-2 ms-0"></i>
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className={`modal-content modal-${theme} rounded-5 p-4`}>
            <div className="modal-header d-flex justify-content-between border-0 p-0 mb-3">
              <h3
                className={`text-${
                  theme === "light" ? "black" : "light"
                } ps-2 mb-0 mt-1`}
              >
                Add Card
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
              <form onSubmit={handleSubmit} className="form-ontrol">
                <div className="row m-0">
                  <div className="col-12 col-sm m-0 m-sm-2">
                    <div
                      className={`row form-floating text-${
                        theme === "light" ? "black" : "light"
                      }`}
                    >
                      <input
                        className={`form-control bg-${
                          theme === "light" ? "white" : "black"
                        } ${theme}`}
                        id="floatingInput"
                        type="text"
                        name="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder=""
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Title
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-sm m-0 mt-2 m-sm-2">
                    <div
                      className={`row form-floating text-${
                        theme === "light" ? "black" : "light"
                      }`}
                    >
                      <input
                        className={`form-control bg-${
                          theme === "light" ? "white" : "black"
                        } ${theme}`}
                        id="floatingInput"
                        type="tel"
                        name="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder=""
                        pattern="[0-9]{3}-[0-9]{7}"
                        title="Fill in the following form: 050-1231234"
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Phone
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col-8 col-sm m-0 me-2 mt-2 m-sm-2">
                    <div
                      className={`row form-floating text-${
                        theme === "light" ? "black" : "light"
                      }`}
                    >
                      <input
                        className={`form-control bg-${
                          theme === "light" ? "white" : "black"
                        } ${theme}`}
                        id="floatingInput"
                        type="text"
                        name="Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder=""
                        pattern="[a-zA-Z]+"
                        title="Upper and lower case letters in English only"
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Street
                      </label>
                    </div>
                  </div>
                  <div className=" col col-sm m-0 mt-2 m-sm-2">
                    <div
                      className={`row form-floating text-${
                        theme === "light" ? "black" : "light"
                      }`}
                    >
                      <input
                        className={`form-control bg-${
                          theme === "light" ? "white" : "black"
                        } ${theme}`}
                        id="floatingInput"
                        type="number"
                        name="Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder=""
                        min="0"
                        title="Number Only"
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Number
                      </label>
                    </div>
                  </div>
                  <div className="col-6 col-sm m-0 me-2 mt-2 m-sm-2">
                    <div
                      className={`row form-floating text-${
                        theme === "light" ? "black" : "light"
                      }`}
                    >
                      <input
                        className={`form-control bg-${
                          theme === "light" ? "white" : "black"
                        } ${theme}`}
                        id="floatingInput"
                        type="text"
                        name="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder=""
                        pattern="[a-zA-Z]+"
                        title="Upper and lower case letters in English only"
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        City
                      </label>
                    </div>
                  </div>
                  <div className="col col-sm m-0 mt-2 m-sm-2">
                    <div
                      className={`row form-floating text-${
                        theme === "light" ? "black" : "light"
                      }`}
                    >
                      <input
                        className={`form-control bg-${
                          theme === "light" ? "white" : "black"
                        } ${theme}`}
                        id="floatingInput"
                        type="text"
                        name="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder=""
                        pattern="[a-zA-Z]+"
                        title="Upper and lower case letters in English only"
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Country
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col-6 col-sm m-0 me-2 mt-2 m-sm-2">
                    <div
                      className={`row form-floating text-${
                        theme === "light" ? "black" : "light"
                      }`}
                    >
                      <input
                        className={`form-control bg-${
                          theme === "light" ? "white" : "black"
                        } ${theme}`}
                        id="floatingInput"
                        type="number"
                        name="Guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        placeholder=""
                        min="1"
                        max="100"
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Maximum Guests
                      </label>
                    </div>
                  </div>
                  <div className="col col-sm m-0 mt-2 m-sm-2">
                    <div
                      className={`row form-floating text-${
                        theme === "light" ? "black" : "light"
                      }`}
                    >
                      <input
                        className={`form-control ${theme}`}
                        id="floatingInput"
                        type="number"
                        name="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder=""
                        min="1"
                        max="99999"
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Price
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col m-0 mt-2 m-sm-2">
                    <div
                      className={`row form-floating text-${
                        theme === "light" ? "black" : "light"
                      }`}
                    >
                      <textarea
                        className={`form-control ${theme}`}
                        style={{ height: "100px" }}
                        id="floatingInput"
                        type="text"
                        name="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder=""
                        required
                      />
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Description
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row p-0 p-sm-2 m-0 mt-2 mt-sm-0">
                  <div className={`div-img-${theme} rounded-4 p-0`}>
                    {image ? (
                      <img
                        className="img-card rounded-4"
                        src={image}
                        alt="ImageCard"
                      />
                    ) : (
                      <div className="p-2">
                        <div className="d-flex justify-content-center">
                          <img
                            className={`img-bg-${theme} mt-3 ms-2 me-2`}
                            src="https://i.postimg.cc/zGfbPX77/uploadimg.png"
                            alt="ImageCard"
                          />
                        </div>
                        <h5
                          className={`fs-6 text-center mb-0 mt-3 text-${
                            theme === "light" ? "" : "light"
                          } text-img-preview-${theme}`}
                        >
                          A preview of the image will appear here.
                          <br />
                          If the image does not appear, the link is apparently
                          incorrect
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col m-0 mt-2 m-sm-2">
                    <div
                      className={`row form-floating text-${
                        theme === "light" ? "black" : "light"
                      }`}
                    >
                      <input
                        className={`form-control ${theme}`}
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
                      <label
                        className="form-label label"
                        htmlFor="floatingInput"
                      >
                        Image Link
                      </label>
                      <div className="d-flex p-0 m-1 mt-3">
                        <i className="bi bi-info-circle me-1 i"></i>
                        <p className="p-0 m-0 fs">
                          to uploading photos for free and getting a link to
                          share go to:
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
                <div className="d-flex justify-content-end mt-3">
                  <button
                    type="button"
                    className={`btn modal-btn-cancel-${theme} rounded-4 me-2`}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss={checkValue()}
                    className={`btn rounded-4 modal-btn-create-${theme}`}
                  >
                    Create<i className="bi bi-check-circle ms-1"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
