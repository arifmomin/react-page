import React from "react";
import MainPage from "./assets/Component/MainPage/MainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <MainPage />
      <ToastContainer />
    </>
  );
};

export default App;
