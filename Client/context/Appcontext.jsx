import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const AppContext = createContext();

const AppProvider = ({ children }) => {
  const backendURL = "https://authzone-backend.onrender.com";
  const [isLoggedin, setisLoggedin] = useState(false);
  const [userData, setuserdata] = useState(false);

  const getAuthstate = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/auth/is-Auth");
      if (data.success) {
        setisLoggedin(true);
        getUserdata();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserdata = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/data");
      data.success ? setuserdata(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthstate();
  }, []);

  const value = {
    backendURL,
    isLoggedin,
    setisLoggedin,
    userData,
    setuserdata,
    getUserdata,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
