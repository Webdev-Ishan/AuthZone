import React, { useContext, useState } from "react";
import { assets } from "../src/assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";

axios.defaults.withCredentials = true;

const Navbar = () => {
  const navigate = useNavigate();
  const { backendURL, setisLoggedin, userData, setuserdata } =
    useContext(AppContext);
  const [showOptions, setShowOptions] = useState(false);

  const sendverification = async () => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        console.log(data)
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(backendURL + "/api/auth/logout");
      data.success && setisLoggedin(false);
      data.success && setuserdata(false);
      navigate("/");
      toast.success("Logout Succesfull");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-black p-4">
      <nav>
        <ul className="flex flex-col md:flex-row justify-between items-center">
          <li className="mb-2 md:mb-0">
            <a href="#home" className="text-white text-xl hover:text-gray-400">
              Home
            </a>
          </li>
          <li className="mb-2 md:mb-0">
            <img
              className="text-white text-xl hover:text-gray-400"
              src={assets.logo}
              alt=""
            />
          </li>
          {userData ? (
            <div
              className="relative flex items-center"
              onClick={() => setShowOptions(!showOptions)}
            >
              <div className="bg-blue-600 text-white hover:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              {showOptions && (
                <div className="absolute top-12 right-0 bg-white text-black rounded-lg shadow-lg p-2">
                  <button
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={sendverification}
                  >
                    Verify
                  </button>
                  <button
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 flex items-center"
            >
              Login <img className="ml-2" src={assets.arrow_icon} alt="" />
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
