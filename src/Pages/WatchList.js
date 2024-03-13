import "../CSS/CardList.css";
import { DataContext } from "../Contexts/DataContext";
import { useEffect, useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { GetItems, UpdateItem } from "../Service/Api";
import { JwtDecodedID } from "../Service/Jwt";

export default function Favorite() {
  const { theme } = useContext(ThemeContext);
  const { cards, setCards } = useContext(DataContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleView = async (card) => {
    localStorage.setItem("itemID", card.ItemID);
    navigate("/CardView");
  };

  useEffect(() => {
    LoadCards();
  });

  const LoadCards = async () => {
    try {
      const cardsList = await GetItems();
      const filterCards = await cardsList.filter((C) => {
        return C.Data.WatchList.indexOf(JwtDecodedID()) !== -1;
      });
      setCards(filterCards);
    } catch (error) {
      console.error("Failed to load Cards:", error);
    }
  };

  const WatchListPushID = (card) => {
    const WatchList = card.Data.WatchList;
    console.log(WatchList.indexOf(JwtDecodedID()));
    if (WatchList.indexOf(JwtDecodedID()) === -1) {
      WatchList.push(JwtDecodedID());
      return WatchList;
    } else {
      const x = WatchList.indexOf(JwtDecodedID());
      WatchList.splice(x, 1);
      return WatchList;
    }
  };

  const WatchListIsMarked = (card) => {
    if (card.Data.WatchList.indexOf(JwtDecodedID()) === -1) {
      return "false";
    } else {
      return "true";
    }
  };

  const handleWatchList = async (card) => {
    try {
      const cardEditData = {
        UpdatedAt: new Date(),
        Data: {
          CreatedBy: card.Data.CreatedBy,
          Address: {
            Number: card.Data.Address.Number,
            Country: card.Data.Address.Country,
            City: card.Data.Address.City,
            Street: card.Data.Address.Street,
          },
          Reviews: card.Data.Reviews,
          Price: card.Data.Price,
          Title: card.Data.Title,
          Description: card.Data.Description,
          Image: card.Data.Image,
          Phone: card.Data.Phone,
          Guests: card.Data.Guests,
          WatchList: WatchListPushID(card),
        },
        Scope: card.Scope,
        CreatedAt: card.CreatedAt,
      };
      await UpdateItem(token, card.ItemID, cardEditData);
    } catch (error) {
      console.error("Failed Update cardEdit Error:", error);
    }
  };

  return (
    <div className="container-fluid p-3 p-sm-5">
      <div
        className={`text-${theme === "light" ? "black" : "light"} mt-2 mb-4`}
      >
        <h1>Watch List</h1>
        <h5 className="mb-3">
          Here you can view all the cards you have saved and of course also
          remove them from the list.
        </h5>
      </div>
      <>
        <div className="row mt-3">
          {cards.map((card) => (
            <div
              key={card.ItemID}
              className="col-lg-3 col-md-4 col-sm-6 pb-4 pt-2 px-sm-3"
            >
              <div className={`card card-mod-${theme} rounded-5 h-100`}>
                <div className="card-header bg-none rounded-4 border-0 p-0">
                  {token ? (
                    <button
                      className={`btn-whatchlist whatchlist- position-absolute end-0 m-3`}
                      onClick={(e) => handleWatchList(card)}
                    >
                      <i
                        className={`bi bi-bookmark-fill whatchlist-${WatchListIsMarked(
                          card
                        )}`}
                      ></i>
                    </button>
                  ) : (
                    <></>
                  )}
                  <img
                    src={card.Data.Image}
                    alt="ImageCard"
                    className="card-image rounded-top-5"
                  />
                </div>

                <div className="card-body body p-0 rounded-5">
                  <div className={`card-mod-${theme} rounded-5 w-100 p-4 pb-0`}>
                    <h5 className="fw-bold m-0">{card.Data.Title}</h5>
                    <p className="m-0">
                      {card.Data.Address.City}, {card.Data.Address.Country}
                    </p>
                  </div>
                </div>
                <div className="card-footer bg-none rounded-4 border-0 p-4 d-flex justify-content-between align-items-center">
                  <p className="fw-bold m-0">{card.Data.Price}$ / Night</p>
                  <button
                    className={`btn btn-mod-${theme} rounded-4`}
                    onClick={() => handleView(card)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
}
