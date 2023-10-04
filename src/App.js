import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/authen/login";
import Signup from "./components/authen/signup";
import {Cart} from "./components/dashboard/cart";
import Checkout from "./components/dashboard/Checkout";
import Placedorder from "./components/dashboard/placedorder";
import Updateprofile from "./components/authen/updateprofile";

import Homepage from "./components/dashboard/homepage";
import Notfound from "./components/dashboard/Notfound";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/placedorder" element={<Placedorder />}></Route>
    <Route path="/cart/:product_id/:c_id" element={<Cart />}></Route>
    <Route path="/checkout" element={<Checkout />}></Route>
    <Route path="/update/:user_id" element={<Updateprofile />}></Route>
    <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
// new comment .
export default App;
