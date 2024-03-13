import jwt_decode from "jwt-decode";

export const JwtDecodedID = () => {
  try {
    const TokenToDecode = localStorage.getItem("token");
    var decoded = jwt_decode(TokenToDecode);
    return decoded.ID;
  } catch (error) {}
};

export const JwtDecodedName = () => {
  try {
    const TokenToDecode = localStorage.getItem("token");
    var decoded = jwt_decode(TokenToDecode);
    return decoded.Name;
  } catch (error) {}
};

export const JwtDecodedRole = () => {
  try {
    const TokenToDecode = localStorage.getItem("token");
    var decoded = jwt_decode(TokenToDecode);
    return decoded.Role;
  } catch (error) {}
};

export const JwtDecodedEmail = () => {
  try {
    const TokenToDecode = localStorage.getItem("token");
    var decoded = jwt_decode(TokenToDecode);
    return decoded.Email;
  } catch (error) {}
};
