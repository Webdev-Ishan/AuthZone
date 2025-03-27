import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../src/assets/assets";
import { AppContext } from "../context/Appcontext";
import axios from 'axios'
import { toast } from "react-toastify";


axios.defaults.withCredentials = true;

const Reset_Password = () => {
  const { backendURL } = useContext(AppContext);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [isEmailsent, setisEmailsent] = useState("");
  const [otp, setotp] = useState('');
  const [isOtpsubmited, setisOtpsubmited] = useState('');

  const onsubmithandler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        backendURL + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.error);
      data.success && setisEmailsent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const otpsubmit = async (e)=>{

    try {
      e.preventDefault();
      setotp(inputRef.current.value)
      setisOtpsubmited(true)
      
    } catch (error) {
      toast.error(error.message)
    }
  }

const newpasswordSubmit = async(e)=>{

  try {
    e.preventDefault()
  
    const {data}= await axios.post(backendURL + '/api/auth/reset-password',{email,otp,newpassword})
    data.success ? toast.success(data.message) : toast.error(data.error);
    data.success &&  navigate('/login')
  } catch (error) {
   toast.error(error.message) 
  }
}

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
          Reset Your Password
        </h1>

        {!isEmailsent && (
          <form onSubmit={onsubmithandler} className="space-y-4">
            <div>
              <label className="block text-white mb-3">Registered Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full px-4 py-2 border bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter EmailId"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </form>
        )}
      </div>

      { !isOtpsubmited && isEmailsent  && (
        <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full text-white max-w-md">
          <form onSubmit={otpsubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-3">Enter 6-digit OTP</label>
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
              Submit
            </button>
          </form>
        </div>
      )}

      {isEmailsent && isOtpsubmited && (
        <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full text-white max-w-md">
          <form onSubmit={newpasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-3">New Password</label>
              <input
                type="password"
                value={newpassword}
                onChange={(e) => setnewpassword(e.target.value)}
                className="w-full px-4 py-2 border bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter New Password"
                maxLength="20"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reset_Password;
