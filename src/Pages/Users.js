import "../CSS/Users.css";
import { useContext, useEffect, useState } from "react";
import ModalEditUser from "../Component/ModalEditUser";
import { ThemeContext } from "../Contexts/ThemeContext";
import { DataContext } from "../Contexts/DataContext";
import { DeleteUser, GetUsers } from "../Service/Api";
import { ModalAddUser } from "../Component/ModalAddUser";
import { JwtDecodedRole } from "../Service/Jwt";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();

  if (JwtDecodedRole() !== "Admin") {
    navigate("/");
  } else {
  }

  const { theme } = useContext(ThemeContext);
  const {
    selectedUser,
    setSelectedUser,
    showModal,
    setShowModal,
    search,
    setSearch,
  } = useContext(DataContext);
  const [users, setUsers] = useState([]);
  const [filterSearch, setFilterSearch] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    LoadUsers();
  });

  const LoadUsers = async () => {
    try {
      const usersList = await GetUsers(localStorage.getItem("token"));
      setUsers(usersList);
      if (search.length === 0) {
        setFilterSearch(users);
      } else {
      }
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const handleSearch = (e) => {
    const inputSearch = e.target.value;
    setSearch(inputSearch);

    const filterSearchByName = users.filter((user) => {
      return user.Name.toLowerCase().indexOf(inputSearch.toLowerCase()) !== -1;
    });

    setFilterSearch(filterSearchByName);
  };

  const handleDelete = async (email) => {
    try {
      await DeleteUser(token, email);
      LoadUsers();
    } catch (error) {
      alert("Failed to delete user:", error);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  let num = 1;
  let k = 1;

  return (
    <div
      className={`container-fluid bg-${
        theme === "light" ? "white" : "black"
      } p-3 p-sm-5`}
    >
      <div
        className={`text-${theme === "light" ? "black" : "light"} mt-2 mb-4`}
      >
        <h1>User Management</h1>
        <h5 className="mb-3">Here you can add, edit and delete users.</h5>
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
            <ModalAddUser />
          </div>
        </div>
      </div>
      <div className="row p-2 p-sm-4 pt-0">
        <table className={`t-${theme} p-1`}>
          <thead>
            <tr className={`bg-${theme === "light" ? "white" : "black"}`}>
              <th scope="col">#</th>
              <th scope="col">Avatar</th>
              <th scope="col">Name</th>
              <th scope="col" className="hide">
                Email
              </th>
              <th scope="col" className="hide">
                Gender
              </th>
              <th scope="col" className="hide">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {filterSearch.map((user) => (
              <tr key={k++} className={`tr-list-${theme} ${theme}`}>
                <th scope="row" className="align-middle">
                  {num++}
                </th>
                <td className="align-middle ">
                  <img
                    src={user.Image}
                    className="imageProfile rounded-3"
                    alt="imageProfile"
                  />
                </td>
                <td className="align-middle">{user.Name}</td>
                <td className="align-middle hide">{user.Email}</td>
                <td className="align-middle hide">{user.Gender}</td>
                <td className="align-middle hide">{user.Role}</td>
                <td className="text-end pt-2">
                  <div className="btn-group dropstart">
                    <button
                      type="button"
                      className={`btn-user-action-${theme} p-0`}
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="true"
                      aria-expanded="false"
                    >
                      <h4 className=" d-flex justify-content-center align-items-center pt-1 m-0">
                        <i
                          className={`bi bi-three-dots icon-btn-user-action-${theme} pt-3`}
                        ></i>
                      </h4>
                    </button>
                    <ul
                      className={`dropdown-menu text-center rounded-4 border-0 mt-2 me-3 ${theme}`}
                    >
                      <h3 className="mb-0">
                        <i
                          className={`bi bi-caret-right-fill position-absolute end-0 arrow-right-${theme}`}
                        ></i>
                      </h3>
                      <button
                        className={`btn edit-btn btn-sm rounded-3 fw-bold btn-action-${theme}`}
                        onClick={() => handleUpdate(user)}
                      >
                        <i className="bi bi-pen-fill me-2"></i>Edit
                      </button>
                      {`/`}
                      <button
                        className={`btn btn-sm delete-btn rounded-3 fw-bold btn-action-${theme}`}
                        onClick={() => handleDelete(user.Email)}
                      >
                        <i className="bi bi-trash2-fill me-1"></i> Delete
                      </button>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ModalEditUser
          show={showModal}
          onHide={() => setShowModal(false)}
          user={selectedUser}
          reloadUsers={LoadUsers}
        />
      </div>
    </div>
  );
}
