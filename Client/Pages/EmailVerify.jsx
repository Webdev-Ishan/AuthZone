import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import { assets } from "../src/assets/assets";

axios.defaults.withCredentials = true;

const EmailVerify = () => {
  const navigate = useNavigate();
  const { backendURL, isLoggedin, userData, getUserdata } =
    useContext(AppContext);
  const inputRef = useRef(null);

  const submitHandlere = async (e) => {
    try {
      e.preventDefault();
      const otp = inputRef.current.value;

      const { data } = await axios.post(
        backendURL + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserdata();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error");
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen bg-gradient-to-r from-fuchsia-400 to-indigo-500 p-4">
      <h1>
        <img
          onClick={() => navigate("/")}
          className="text-white text-xl mb-5 hover:text-gray-400"
          src={assets.logo}
          alt=""
        />
      </h1>

      <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full text-white max-w-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Verify Your Email
        </h1>
        <form onSubmit={submitHandlere} className="space-y-4">
          <div>
            <label className="block text-white">Enter 6-digit OTP</label>
            <input
              type="text"
              className="w-full px-4 py-2 border bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter OTP"
              maxLength="6"
              ref={inputRef}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
