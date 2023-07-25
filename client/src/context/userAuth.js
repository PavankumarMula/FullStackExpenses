import React, { useEffect, useState } from "react";
import axios from 'axios';

// Creating Context Api for Auth
export const userAuthContext = React.createContext();

// The Component which provide this context
const AuthContextProvider = ({ children }) => {

  const initialLoggedInState = !!localStorage.getItem('token');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(initialLoggedInState);
  const [isPremiumUser,setIsPremuisUser] = useState(false);
  const [userName,setIsUserName] = useState("");


  useEffect(()=>{
   if(isUserLoggedIn){
    fetchUser();
   }
  },[isUserLoggedIn]);
  
  // fetching user details whenever the user logged in logged out and buys premium
  const fetchUser=async()=>{
    const token=localStorage.getItem('token');
      try {
        if(token){
          const response=await axios.get(`http://localhost:4000/user`,{headers:{Authorization:token}}); 
        const {status,data}=response;
        if(status===200){
          setIsPremuisUser(data.isPremium);
          setIsUserName(data.username);
          setIsUserLoggedIn(true);
        }
        }else{
          throw new Error("some thing is wrong with fetching user");
        }
       } 
       catch (error) {
        console.log(error);
       
       }
    }
  

  // if the user logged in hit this function
  const login = (token,userName) => {
    if(token){
      localStorage.setItem('token', token);
      setIsUserLoggedIn(true);
      fetchUser()
    }
  };

  // if the user logged out hit this function
  const logout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem('token');// remove the token from local storage
    setIsPremuisUser(false)
  };

  const setPremuisUser=()=>{
    setIsPremuisUser(true);
  }

  // finally this is the value or data which is shared among all the componets
  const userAuthValue = {
    isUserLoggedIn,
    login,
    logout,
    isPremiumUser,
    userName,
    setPremuisUser
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
