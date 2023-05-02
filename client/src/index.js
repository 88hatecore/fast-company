import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
import { Router } from "react-router";
import history from "./app/utils/history";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
