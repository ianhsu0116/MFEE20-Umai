import React from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import UmaiHomePageLogo from "./images/UmaiHomePage.svg";
import avatar from "./images/avatar.jpg";

const NavbarHomePage = (props) => {
  return (
    <>
      <div className="NavbarHomePage">
        <div className="Navbar-container">
          <div className="Navbar-container-item">
            <button className="Navbar-container-item-btn">
              <GoSearch />
              &ensp;尋找課程
            </button>
          </div>
          <div className="Navbar-container-item">
            <button className="Navbar-container-item-btn">課程探索</button>
          </div>
          <div className="Navbar-container-item">
            <Link to="/">
              <img
                src={UmaiHomePageLogo}
                alt="Umai Logo"
                className="UmaiLogo"
              />
            </Link>
          </div>
          <div className="Navbar-container-item">
            <button className="Navbar-container-item-btn">體驗分享</button>
          </div>
          <div className="Navbar-container-item">
            <button className="Navbar-container-item-btn2">
              <MdShoppingCart className="Navbar-container-item-btn2-cart" />
            </button>
            <Link
              to="/memberCenter"
              className="Navbar-container-item-btn Navbar-container-item-btn2"
            >
              <img
                src={avatar}
                alt="avatar"
                className="Navbar-container-item-btn Navbar-container-item-btn2-avatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarHomePage;
