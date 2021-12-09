import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import Payment from "./Components/Payment";
import Myaccount from "./Components/Myaccount";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Admin from "./Components/Admin";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import CategoryOverview from "./Components/CategoryOverview";
import ProductOverview from "./Components/ProductOverview";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Admin Route */}
          <Route path="/admin">
            <Admin />
            <Footer />
          </Route>

          <Route path="/orders">
            <Header />
            <Myaccount
              ShoppingBasketIcon={ShoppingBasketIcon}
              PermIdentityIcon={PermIdentityIcon}
            />
            <Footer />
          </Route>

          <Route path="/login">
            <Header />
            <Login />
            <Footer />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/Payment">
            <Header />
            <Payment />
            <Footer />
          </Route>

          <Route path="/Category/:categoryId">
            <Header />
            <ProductOverview />
          </Route>

          <Route path="/">
            <Home />
            <CategoryOverview />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
