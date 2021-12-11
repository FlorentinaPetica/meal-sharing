import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import ShareMeal from "./pages/ShareMeal";
import OurMeals from "./pages/OurMeals";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import MealDetail from "./components/MealDetail";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/meals" component={OurMeals} />
          <Route exact path="/add" component={ShareMeal} />
          <Route path="/meals/:id" component={MealDetail} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
