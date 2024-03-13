import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  const [image, setImage] = useState("");
  const [imageUser, setImageUser] = useState("");
  const [imageList, setImageList] = useState({
    A0: "https://i.postimg.cc/hPx0tY04/avatar-00.jpg",
    A1: "https://i.postimg.cc/FH7ZLG85/avatar-01.jpg",
    A2: "https://i.postimg.cc/YCzWjFqK/avatar-02.jpg",
    A3: "https://i.postimg.cc/Y0JXS4hh/avatar-03.jpg",
    A4: "https://i.postimg.cc/pV7cCSqR/avatar-04.jpg",
    A5: "https://i.postimg.cc/t4drX4y4/avatar-05.jpg",
    A6: "https://i.postimg.cc/7Y2sWNW7/avatar-06.jpg",
    A7: "https://i.postimg.cc/YCBnKm5P/avatar-07.jpg",
    A8: "https://i.postimg.cc/CKmmqrRy/avatar-08.jpg",
    A9: "https://i.postimg.cc/zBvpSwhy/avatar-09.jpg",
    A10: "https://i.postimg.cc/bvzmdfNH/avatar-10.jpg",
    A11: "https://i.postimg.cc/bJ5g6G03/avatar-11.jpg",
    A12: "https://i.postimg.cc/fknKN6rd/avatar-12.jpg",
    A13: "https://i.postimg.cc/hv7rNSpg/avatar-13.jpg",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState([]);

  return (
    <DataContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        token,
        setToken,
        id,
        setId,
        name,
        setName,
        gender,
        setGender,
        confirmPassword,
        setConfirmPassword,
        cards,
        setCards,
        card,
        setCard,
        image,
        setImage,
        imageUser,
        setImageUser,
        imageList,
        setImageList,
        selectedUser,
        setSelectedUser,
        selectedCard,
        setSelectedCard,
        showModal,
        setShowModal,
        search,
        setSearch,
        filterSearch,
        setFilterSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
