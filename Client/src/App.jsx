import React from "react";
import {Routes,Route} from 'react-router-dom'
import Login from '../Pages/Login'
import Home from '../Pages/Home'
import EmailVerify from "../Pages/EmailVerify";
import Reset_Password from "../Pages/Reset_Password";
import { ToastContainer } from 'react-toastify';
import { AppProvider } from "../context/Appcontext";
import Product from "../Pages/Product";
const App = () => {
  return(
    <AppProvider>
   <div>
<ToastContainer/>
<Routes>

<Route path="/" element={<Home/>}    />
<Route path="/Login" element={<Login/>}    />
<Route path="/verify-email" element={<EmailVerify/>}    />
<Route path="/reset-password" element={<Reset_Password/>}    />
<Route path="/Product" element={<Product/>}    />
</Routes>

  </div>
  </AppProvider>
  )
};

export default App;
