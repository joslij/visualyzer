import React from "react";

const AuthContext = React.createContext({
  user: null,
  token: null,
  setData: (user, token) => {},
});

export default AuthContext;
