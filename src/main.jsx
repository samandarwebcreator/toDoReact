import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import "./scss/styles.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
