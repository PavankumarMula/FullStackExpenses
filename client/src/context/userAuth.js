import React, { useState } from "react";

// Creating Context Api for Auth
export const userAuthContext = React.createContext();

// The Component which provide this context
const AuthContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  

  // if the user logged in hit this function
  const login = (token,userName) => {
    if(token){
      localStorage.setItem('token', token);
      setIsUserLoggedIn(true);
      
    }
  };

  // if the user logged out hit this function
  const logout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem('token');// remove the token from local storage
  };

  // finally this is the value or data which is shared among all the componets
  const userAuthValue = {
    isUserLoggedIn,
    login,
    logout,
  };

  return (
    <>
      <userAuthContext.Provider value={userAuthValue}>
        {children}
      </userAuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
