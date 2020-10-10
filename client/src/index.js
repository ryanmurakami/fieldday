import ReactDOM from "react-dom";
import React from "react";
import HomeLayout from "./layout/HomeLayout.jsx";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<HomeLayout />, wrapper) : false;