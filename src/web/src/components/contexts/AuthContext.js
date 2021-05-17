import React from "react";

const AuthContext = React.createContext({
  user: null,
  token: null,
  setData: () => {},
});

export default AuthContext;
