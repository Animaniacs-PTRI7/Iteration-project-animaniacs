// import { counter } from '@fortawesome/fontawesome-svg-core';
import React from "react";
// import { render } from 'react-dom';
import * as ReactDOM from "react-dom";
import App from "./App";
// import map from './components/Map'
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
