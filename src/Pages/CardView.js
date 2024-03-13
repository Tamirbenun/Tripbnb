import "../CSS/CardView.css";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { DataContext } from "../Contexts/DataContext";
import { GetItems, UpdateItem } from "../Service/Api";
import { JwtDecodedID, JwtDecodedName, JwtDecodedRole } from "../Service/Jwt";

export default function CardView() {
  const { imageList } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [card, setCard] = useState([]);
  const token = localStorage.getItem("token");
  const [itemId, setItemId] = useState();
  let k = 0;

  if (itemId) {
    localStorage.setItem("itemID", itemId);
  } else {
    setItemId(localStorage.getItem("itemID"));
  }

  useEffect(() => {
    LoadCards();
  });

  const LoadCards = async () => {
    try {
      const cardsList = await GetItems();
      const cardFilter = cardsList.filter((c) => {
        return c.ItemID === itemId;
      });
      setCard(cardFilter);
      setReviews(cardFilter[0].Data.Reviews);
    } catch (error) {
      console.error("Failed to load Cards:", error);
    }
  };

  const DateComments = () => {
    const date = new Date().toLocaleDateString("en-GB");
    return date;
  };

  const handleAddReview = async () => {
    LoadCards();
    reviews.push({
      ID: JwtDecodedID(),
      Date: DateComments(),
      Image: localStorage.getItem("imageProfile"),
      Name: JwtDecodedName(),
      Comment: comment,
    });
    LoadCards();
    try {
      const cardEditData = {
        UpdatedAt: new Date(),
        Data: {
          CreatedBy: card[0].Data.CreatedBy,
          Address: {
            Number: card[0].Data.Address.Number,
            Country: card[0].Data.Address.Country,
            City: card[0].Data.Address.City,
            Street: card[0].Data.Address.Street,
          },
          Reviews: reviews,
          Price: card[0].Data.Price,
          Title: card[0].Data.Title,
          Description: card[0].Data.Description,
          Image: card[0].Data.Image,
          Phone: card[0].Data.Phone,
          Guests: card[0].Data.Guests,
          WatchList: card[0].Data.WatchList,
        },
        Scope: card[0].Scope,
        CreatedAt: card[0].CreatedAt,
      };
      await UpdateItem(token, card[0].ItemID, cardEditData);
      setComment("");
    } catch (error) {
      console.error("Failed Update cardEdit Error:", error);
    }
  };

  const handleDeleteReview = async (review) => {
    LoadCards();
    const index = reviews.indexOf(review);
    reviews.splice(index, 1);
    try {
      const cardEditData = {
        UpdatedAt: new Date(),
        Data: {
          CreatedBy: card[0].Data.CreatedBy,
          Address: {
            Number: card[0].Data.Address.Number,
            Country: card[0].Data.Address.Country,
            City: card[0].Data.Address.City,
            Street: card[0].Data.Address.Street,
          },
          Reviews: reviews,
          Price: card[0].Data.Price,
          Title: card[0].Data.Title,
          Description: card[0].Data.Description,
          Image: card[0].Data.Image,
          Phone: card[0].Data.Phone,
          Guests: card[0].Data.Guests,
          WatchList: card[0].Data.WatchList,
        },
        Scope: card[0].Scope,
        CreatedAt: card[0].CreatedAt,
      };
      await UpdateItem(token, card[0].ItemID, cardEditData);
    } catch (error) {
      console.error("Failed Update cardEdit Error:", error);
    }
  };

  return (
    <>
      {card.map((c) => (
        <div
          key={c.ItemID}
          className={`container-fluid text-${
            theme === "light" ? "black" : "light"
          }`}
        >
          <div className="row">
            <div className="col-md-8 col-sm-12 p-4">
              <div className="bg-gray rounded-4 w-100">
                <img
                  className="imageCard rounded-4"
                  src={c.Data.Image}
                  alt="PhotoCard"
                />
              </div>
              <div className="row p-3">
                <h2 className="m-0 mt-3 p-0">{c.Data.Title}</h2>
                <p className="text-secondary p-0 m-0">
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  {c.Data.Address.City + ", " + c.Data.Address.Country}
                </p>
              </div>
              <div className="row p-3 pt-0">
                <div className="col d-flex align-items-center p-0">
                  <div className="bg-icon rounded-3 d-flex align-items-center justify-content-center">
                    <h5 className="mb-0">
                      <i className="bi bi-tag-fill icon"></i>
                    </h5>
                  </div>
                  <h6 className="fw-bold mb-0 ms-2">{c.Data.Price}$ / Night</h6>
                </div>
                <div className="col d-flex align-items-center p-0">
                  <div className="bg-icon rounded-3 d-flex align-items-center justify-content-center">
                    <h5 className="mb-0">
                      <i className="bi bi-people-fill icon"></i>
                    </h5>
                  </div>
                  <h6 className="fw-bold mb-0 ms-2">{c.Data.Guests} Guests</h6>
                </div>
                <div className="col d-flex align-items-center p-0">
                  <div className="bg-icon rounded-3 d-flex align-items-center justify-content-center">
                    <h5 className="mb-0">
                      <i className="bi bi-telephone-fill icon"></i>
                    </h5>
                  </div>
                  <h6 className="fw-bold mb-0 ms-2">{c.Data.Phone}</h6>
                </div>
              </div>
              <div className="row p-0 mt-4">
                <h5 className="fw-bold">Description</h5>
                <p className="m-0">{c.Data.Description}</p>
              </div>
              <div className="row m-0 mt-5 p-0">
                <div className="col-12 m-0 p-0">
                  <iframe
                    title="Maps"
                    loading="async"
                    className="map w-100 rounded-4"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2347.0256925184326!2d-2.0049129765214513!3d53.96681147247572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bf3ec4fc789e1%3A0x1e3957fda1ecf5d!2zMTggR3JlZW5hY3JlcywgU2tpcHRvbiBCRDIzIDFCWCwg15HXqNeZ15jXoNeZ15Q!5e0!3m2!1siw!2sil!4v1709037624153!5m2!1siw!2sil`}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 p-4 ps-md-0">
              <div className={`review-bg-${theme} rounded-4 p-3 w-100`}>
                <h4 className="mb-4 fw-bold">Review</h4>
                {card[0].Data.Reviews.length ? (
                  card[0].Data.Reviews.map((review) => (
                    <div
                      key={k++}
                      className={`comment-bg-${theme} rounded-3 p-3 mt-3`}
                    >
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center mb-3">
                          <img
                            className="imageProfile rounded-3"
                            src={review.Image ? review.Image : imageList.A0}
                            alt="ImageUser"
                          />
                          <div className="ms-3">
                            <h6 className="mb-0 fw-bold">{review.Name}</h6>
                            <p className="time m-0">{review.Date}</p>
                          </div>
                        </div>
                        {JwtDecodedRole() === "Admin" ? (
                          <>
                            <i
                              className="bi bi-trash btn-delete p-0 mb-auto"
                              onClick={() => handleDeleteReview(review)}
                            ></i>
                          </>
                        ) : (
                          <>
                            {review.ID === JwtDecodedID() ? (
                              <i
                                className="bi bi-trash btn-delete p-0 mb-auto"
                                onClick={() => handleDeleteReview(review)}
                              ></i>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </div>
                      <p className="m-0">{review.Comment}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <h5 className=" text-secondary fw-light">
                      Be the first to share your experience
                    </h5>
                  </>
                )}
                {token ? (
                  <div className="input-group mt-3">
                    <textarea
                      type="text"
                      className={`form-control rounded-start-3 input-mod-${theme} ${theme}`}
                      placeholder="Share your experience here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-secondary rounded-end-3"
                      type="button"
                      id="button-addon2"
                      onClick={() => handleAddReview()}
                    >
                      Share
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
