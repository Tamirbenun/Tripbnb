import "../CSS/MyCards.css";
import "../CSS/Modals.css";
import { useContext } from "react";
import { DeleteItem } from "../Service/Api";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function ModalDeleteCard({ card }) {
  const { theme } = useContext(ThemeContext);
  const token = localStorage.getItem("token");

  const handleDelete = async (ItemId) => {
    try {
      await DeleteItem(token, ItemId);
    } catch {
      alert("Card Deletion Failed");
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content modal-${theme} rounded-5 p-4`}>
            <div className="modal-header d-flex justify-content-end border-0 p-0">
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
            <div className="modal-body mb-3">
              <h3>Are you sure?</h3>
              <p className="m-0">
                You are about to delete your{" "}
                <span className="fw-bold">
                  "{card.Data ? card.Data.Title : "error getting Card"}"
                </span>{" "}
                card
              </p>
              <p className="m-0">All your information will be gone</p>
            </div>
            <div className="modal-footer border-0 p-0">
              <button
                type="button"
                className={`btn modal-btn-cancel-${theme} rounded-4`}
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-4"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => handleDelete(card.ItemID)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
