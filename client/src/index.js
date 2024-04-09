import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AllContext from "./context/AllContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AllContext>
      <App />
    </AllContext>
  </React.StrictMode>
);
