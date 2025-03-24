import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setisLoggedin] = useState(false);
  const [userData, setuserdata] = useState(false);


  const getUserdata = async () => {
    try {
      const {data} = await axios.get(backendURL + '/api/user/data');
data.success ? setuserdata(data.userData): toast.error(data.message)

    } catch (error) {
      
      toast.error(data.message);
    }
  };


  const value = {
    backendURL,
    isLoggedin,
    setisLoggedin,
    userData,
    setuserdata,
    getUserdata
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
