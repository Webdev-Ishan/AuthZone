import React from "react";
import { assets } from "../src/assets/assets";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
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
          <button
            onClick={() => navigate("/Login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 flex items-center"
          >
            Login <img className="ml-2" src={assets.arrow_icon} alt="" />
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
