import React, { useContext } from "react";
import { assets } from "../src/assets/assets";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = () => {
  const navigate = useNavigate();
  const { userData, isLoggedin } = useContext(AppContext);

  const producthandler = () => {
    if (isLoggedin) {
      navigate("/Product");
    } else {
      toast.error("Login is Required to Proceed");
    }
  };

  return (
    <div className="flex flex-col items-center p-5 text-center text-gray-100 ">
      <img
        src={assets.header_img}
        alt=""
        className="w-1/2 max-w-sm h-auto rounded-lg "
      />
      <h1 className="text-2xl font-bold my-5 text-black">
        Hey {userData ? userData.name : "Developer"}
        <img
          src={assets.hand_wave}
          alt=""
          style={{ border: "none" }}
          className="inline-block w-8 h-8 ml-2"
        />
      </h1>
      <h2 className="text-3xl text-black font-bold mb-2 ">
        Welcome to our App!
      </h2>
      <p className="text-black">
        Let's get started with some project tour and we will authorize you in no
        time.
      </p>
      <button
        onClick={producthandler}
        className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 hover:rounded-2xl duration-300"
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
