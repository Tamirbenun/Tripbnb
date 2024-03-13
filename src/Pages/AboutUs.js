import { ThemeContext } from "../Contexts/ThemeContext";
import { useContext } from "react";

export default function AboutUs() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`container-fluid text-${
        theme === "light" ? "black" : "light"
      } p-3 p-sm-5 pt-sm-2`}
    >
      <div
        className={`text-${theme === "light" ? "black" : "light"} mt-2 mb-5`}
      >
        <h1>About Us</h1>
        <h5 className="mb-3">
          A site to search for vacation cabins that include bed and breakfast
          around the world
        </h5>
      </div>
      <div className={`bg-${theme} rounded-4 p-4`}>
        <h3 className="fw-bold mb-3">Site Map</h3>
        <ul>
          <li>
            <p className="m-0">
              <span className="fw-bold">Home Page</span> - On this page you can
              view all the cards that have been created and a search bar to
              filter cards by name.
            </p>
            <p className="m-0">
              Each card has a button <i className="bi bi-bookmark-fill"></i>,
              clicking on it adds the card to your watch list. Once added to
              your list the button turns red{" "}
              <i className="bi bi-bookmark-fill text-danger"></i>. Clicking it
              again deletes the card from your watch list and the button returns
              to its original color
            </p>
            <p className="fw-bold">Access: Everyone</p>
          </li>
          <li>
            <p className="m-0">
              <span className="fw-bold">Watch List</span> - On this page you can
              view all the cards that have been created and a search bar to
              filter cards by name.
            </p>
            <p className="m-0">
              Each card has a button <i className="bi bi-bookmark-fill"></i>,
              clicking on it adds the card to your watch list. Once added to
              your list the button turns red{" "}
              <i className="bi bi-bookmark-fill text-danger"></i>. Clicking it
              again deletes the card from your watch list and the button returns
              to its original color
            </p>
            <p className="fw-bold">
              Access: Registered users only {`(Role: Guest, Business, Admin)`}
            </p>
          </li>
          <li>
            <p className="m-0">
              <span className="fw-bold">Card View</span> - On this page you can
              view all the details of the card. You can reach this page by
              clicking on the "View" button, located at the bottom of the card.
            </p>
            <p className="m-0">
              the right part of the page {`(on a large screen)`} or at the
              bottom of the page {`(on a small screen)`} there is a comment
              system.
              <br />
              Unregistered users can view comments only Registered users can
              comment on any card and of course also delete their comment only.
              <br />
              An admin user can delete all comments in all cards.
              <br />
              *The card creator cannot delete user comments, To increase the
              level of credibility of the responses.
            </p>
            <p className="fw-bold">
              Access: Everyone {`(Role: Guest, Business, Admin)`}
            </p>
          </li>
          <li>
            <p className="m-0">
              <span className="fw-bold">My Cards</span> - On this page you can
              view all the cards you have created.
            </p>
            <p className="m-0">
              on each card at the bottom. There are 2 action buttons "delete"
              and "edit".
              <br />
              The "Edit" button will open a model for editing the card details.
              <br />
              The "delete" button will open a model asking if you are sure you
              want to delete to avoid accidental deletion
            </p>
            <p className="fw-bold">
              Access: Business users only {`(Role: Business, Admin)`}
            </p>
          </li>
          <li>
            <p className="m-0">
              <span className="fw-bold">Profile</span> - On this page you can
              view and edit your user information.
            </p>
            <p className="m-0">
              There is an option to change the profile picture from the database
              on the website or via an external link.
            </p>
            <p className="fw-bold">
              Access: Registered users only {`(Role: Guest, Business, Admin)`}
            </p>
          </li>
          <li>
            <p className="m-0">
              <span className="fw-bold">User Management</span> - On this page
              you can see the list of all users registered to the site.
            </p>
            <p className="m-0">
              At the end of each row of user details there is a button with 2
              actions "edit" and "delete".
            </p>
            <p className="fw-bold">
              Access: Admin users only {`(Role: Admin)`}
            </p>
          </li>
          <li>
            <p className="m-0">
              <span className="fw-bold">About Us</span> - On this page{" "}
              {`(the page
              you are on)`}{" "}
              you can get complete information about the site and how to
              interface with it.
            </p>
            <p className="fw-bold">Access: Everyone</p>
          </li>
        </ul>
      </div>
      <p
        className={`d-flex justify-content-center mt-5 text-${
          theme === "light" ? "black" : "light"
        }`}
      >
        <span className="fw-bold me-2">Built using:</span> React Js & Bootstrap
        | <span className="fw-bold ms-2 me-2"> Modules used:</span>
        Rauter, axios, jwt, uuid {`(generator id)`}
      </p>
    </div>
  );
}
