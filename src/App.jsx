import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registration from "./assets/Registration/Registration";
import Login from "./assets/Login/Login";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Home from "./assets/Home/Home";
import RootLayout from "./assets/RootLayout/RootLayout";
import Chat from "./assets/Chat/Chat"
import Setting from "./assets/Setting/Setting";
import Notification from "./assets/Notification/Notification";
const router = createBrowserRouter (createRoutesFromElements(
  <Route>
    <Route path="/" element = {<RootLayout/>}>
    <Route index element = {<Home/>}></Route>
    <Route path="/Chat" element = {<Chat/>}></Route>
    <Route path="/Notification" element = {<Notification/>}></Route>
    <Route path="/Setting" element = {<Setting/>}></Route>
    </Route>
    <Route path="/Registration" element={<Registration/>}></Route>
    <Route path="/Login" element={<Login/>}></Route>
  </Route>
));





const App = () => {
  return (
<>
<RouterProvider  router ={router}>
      <Home/>
      </RouterProvider >
      <ToastContainer /></>
      
  );
};

export default App;
