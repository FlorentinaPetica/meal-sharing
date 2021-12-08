import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import MealsProvider from "./contexts/MealsContext";
import ReviewsProvider from "./contexts/ReviewsContext";

ReactDOM.render(
  <Router>
    <MealsProvider>
      <ReviewsProvider>
        <App />
      </ReviewsProvider>
    </MealsProvider>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
