require.context("@img/", true, /\.(png|jpg|svg|webp)$/);
require.context("@style/", true, /\.(css|scss|sass|less)$/);
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);