import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../src/assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { backendURL, setisLoggedin, getUserdata } = useContext(AppContext);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const { data } = await axios.post(backendURL + "/api/auth/register", {
          name,
          email,
          password,
        });

        // Handle successful signup (e.g., show a success message, redirect, etc.)

        if (data.success) {
          // Handle successful login (e.g., set user context, redirect, etc.)
          setisLoggedin(true);
          getUserdata();
          navigate("/"); // Redirect to dashboard or another page
        } else {
          toast.error("Something went wrong");
        }
      } else {
        const { data } = await axios.post(backendURL + "/api/auth/login", {
          email,
          password,
        });

        // Handle successful signup (e.g., show a success message, redirect, etc.)

        if (data.success) {
          // Handle successful login (e.g., set user context, redirect, etc.)
          setisLoggedin(true);
          getUserdata();
          navigate("/"); // Redirect to dashboard or another page
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      toast.error(error);
      // Handle error (e.g., show an error message)
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
          {isSignup ? "Create Your Account" : "Login to Your Account"}
        </h1>
        <form className="space-y-4" onSubmit={submithandler}>
          {isSignup && (
            <div>
              <label className="block text-white">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full px-4 py-2 border bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-4 py-2 border bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full px-4 py-2 border bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

        <p className="mt-4 text-center">
          <button
            className="text-blue-700 text-center "
            onClick={() => navigate("/reset-password")}
          >
            Forgot Password?
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
