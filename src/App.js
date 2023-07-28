import { ToastContainer } from "react-toastify";
import "./App.css";
import Bots from "./components/Bots";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Bots />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
