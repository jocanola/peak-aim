import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../media/logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Badge from "@material-ui/core/Badge";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";

const Header = () => {
  const history = useHistory();
  const [{ basket, user }] = useStateValue();

  const [searchexpand, setSearchexpand] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 300) {
      setSearchexpand(true);
    } else {
      setSearchexpand(false);
    }
  });

  console.log(user);
  return (
    <div className="header">
      <Link to="/">
        {/* <img src={logo} alt="amazon-logo" className="header__logo" /> */}
        <h3 id="h3">
          <span>PEAK</span>
          <span>AIM</span>
        </h3>
      </Link>

      <div className="header__nav">
        <Link to={user ? "/orders" : "/login"} style={{ color: "black" }}>
          <div className="header__option">
            <span className="header__optionTwo">
              <PersonIcon />
            </span>
            <span className="header__optionOne">
              {user ? `Hello,${user?.email}` : "Account"}{" "}
            </span>
          </div>
        </Link>

        <Link to="/" style={{ color: "black" }}>
          <div className="header__option">
            <span className="header__optionTwo">
              <HomeIcon />
            </span>
            <span className="header__optionOne">Home </span>
          </div>
        </Link>

        <Link to="/checkout" style={{ color: "black" }}>
          <div className="header__optionBasket">
            <Badge badgeContent={basket?.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
