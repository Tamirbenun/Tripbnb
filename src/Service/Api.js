import axios from "axios";

export const API_ROOT =
  "https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev";
export const PROJECT_ID = "dd62a593-85a7-4aa0-8046-13ee5310f317";
export const CARDS = "Cards";

const api = axios.create({
  baseURL: API_ROOT,
});

export const LoginUser = (email, password) => {
  return api
    .post(`/login/${PROJECT_ID}`, {
      Email: email,
      Password: password,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error logging in:", error);
      throw error;
    });
};
export const RegisterUser = (
  id,
  name,
  email,
  password,
  gender,
  image,
  role
) => {
  return api
    .post("/user/", {
      ProjectID: PROJECT_ID,
      ID: id,
      Name: name,
      Email: email,
      Password: password,
      Gender: gender,
      Image: image,
      Role: role,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error registering user:", error);
      throw error;
    });
};

export const UpdateUser = (
  token,
  id,
  image,
  name,
  email,
  password,
  gender,
  role
) => {
  return api
    .put(
      `/user/${PROJECT_ID}/${email}`,
      {
        ProjectID: PROJECT_ID,
        ID: id,
        Image: image,
        Name: name,
        Email: email,
        Password: password,
        Gender: gender,
        Role: role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      alert("Error updating user:", error);
      throw error;
    });
};

export const GetUser = (token, email) => {
  return api
    .get(`/user/object/${PROJECT_ID}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};

export const GetUsers = (token) => {
  return api
    .get(`/user/${PROJECT_ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};

export const DeleteUser = (token, email) => {
  return api
    .delete(`/user/object/${PROJECT_ID}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};

export const PostItem = (token, data) => {
  return api
    .post(`/item/${PROJECT_ID}_${CARDS}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error posting item:", error);
      throw error;
    });
};

export const GetItems = () => {
  return api
    .get(`/item/${PROJECT_ID}_${CARDS}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting items:", error);
      throw error;
    });
};

export const UpdateItem = (token, itemId, data) => {
  return api
    .put(`/item/${PROJECT_ID}_${CARDS}/${itemId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating item:", error);
      throw error;
    });
};

export const DeleteItem = (token, itemId) => {
  return api
    .delete(`/item/${PROJECT_ID}_${CARDS}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
};
