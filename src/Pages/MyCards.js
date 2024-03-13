import "../CSS/MyCards.css";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import { GetItems } from "../Service/Api";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Contexts/ThemeContext";
import { JwtDecodedID } from "../Service/Jwt";
import { ModalAddCard } from "../Component/ModalAddCard";
import { ModalEditCard } from "../Component/ModalEditCard";
import ModalDeleteCard from "../Component/ModalDeleteCard";

export default function MyCards() {
  const { theme } = useContext(ThemeContext);
  const { search, setSearch } = useContext(DataContext);
  const [myCards, setMyCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [selectedCardID, setSelectedCardID] = useState("");
  const [selectedCardTitle, setSelectedCardTitle] = useState("");
  const [filterSearch, setFilterSearch] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    LoadCards();
  });

  const LoadCards = async () => {
    try {
      const cardsList = await GetItems();
      const filterCards = await cardsList.filter((C) => {
        return C.Data.CreatedBy === JwtDecodedID();
      });
      setMyCards(filterCards);
      if (search.length === 0) {
        setFilterSearch(filterCards);
      } else {
      }
    } catch (error) {
      console.error("Failed to load Cards:", error);
    }
  };

  const handleSearch = (e) => {
    const inputSearch = e.target.value;
    setSearch(inputSearch);

    const filterSearchByName = myCards.filter((c) => {
      return (
        c.Data.Title.toLowerCase().indexOf(inputSearch.toLowerCase()) !== -1
      );
    });

    setFilterSearch(filterSearchByName);
  };

  const handleView = async (card) => {
    localStorage.setItem("itemID", card.ItemID);
    navigate("/CardView");
  };

  const handleSelect = (card) => {
    setSelectedCard(card);
    return selectedCard;
  };

  return (
    <div className="container-fluid p-3 p-sm-5">
      <div
        className={`text-${theme === "light" ? "black" : "light"} mt-2 mb-4`}
      >
        <h1>My Cards</h1>
        <h5 className="mb-3">
          Here you can view, edit and delete all the cards you have created.
        </h5>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-between m-md-1 m-0 mt-md-0">
          <input
            className={`search-${theme} border-secondary ps-5 rounded-4 border-0`}
            type="search"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
          <i className="bi bi-search position-absolute d-flex align-self-center text-secondary ps-3"></i>
        </div>
        <div className="col">
          <div className="d-flex justify-content-end">
            <ModalAddCard />
          </div>
        </div>
      </div>
      {filterSearch[0] ? (
        <div
          className={`row bg-${theme === "light" ? "white" : "black"} m-0 mt-3`}
        >
          {filterSearch.map((card) => (
            <div
              key={card.ItemID}
              className="col-lg-3 col-md-4 col-sm-6 pb-4 pt-2 px-sm-3"
            >
              <div className={`card card-mod-${theme} rounded-5 h-100`}>
                <div className="card-header bg-none rounded-4 border-0 p-0">
                  <img
                    src={card.Data.Image}
                    alt="logo"
                    className="card-image rounded-top-5"
                  />
                </div>
                <div className="card-body body p-0 rounded-5">
                  <div className={`card-mod-${theme} rounded-5 p-4 pb-0`}>
                    <h5 className="fw-bold m-0">{card.Data.Title}</h5>
                    <p className="m-0">
                      {card.Data.Address.City}, {card.Data.Address.Country}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-4">
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
                <div
                  className={`card-footer bg-card-footer d-flex align-items-center justify-content-between bg-gray rounded-5 border-0 card-footer-${theme} mt-3 p-4`}
                >
                  <p className="fw-bold m-0">Action:</p>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className={`btn edit-btn-${theme} rounded-4 p-1 me-2`}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop2"
                      onClick={() => handleSelect(card)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={`btn delete-btn-${theme} rounded-4 p-1`}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleSelect(card)}
                    >
                      Delete
                    </button>
                    <ModalEditCard card={selectedCard} />
                    <ModalDeleteCard card={selectedCard} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`d-flex justify-content-center bg-${
            theme === "light" ? "white" : "black"
          } p-5`}
        >
          <div className="p-5 text-center">
            <h4 className="text-secondary mb-0">
              You haven't created a card yet
            </h4>
            <h4 className="text-secondary">
              Or the search does not match the title of the Cards you have
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}
