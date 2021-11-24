import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../config/config";
import { GoSearch } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import UmaiLogo from "./images/Umai.png";
import avatar from "./images/avatar.jpg";

const Navbar = (props) => {
  let { handleLoginClick, currentUser } = props;

  const [active, setActive] = useState("");
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY !== 0) {
        setActive(true);
      } else {
        setActive("");
      }
    });
  }, []);

  return (
    <div className={`Navbar ${active ? " Navbar-active " : ""}`}>
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
        <div className="Navbar-container-item ">
          <Link to="/">
            <img src={UmaiLogo} alt="Umai Logo" className="UmaiLogo" />
          </Link>
        </div>
        <div className="Navbar-container-item">
          <button className="Navbar-container-item-btn">體驗分享</button>
        </div>
        {currentUser && (
          <div className="Navbar-container-item">
            <button className="Navbar-container-item-btn2">
              <MdShoppingCart className="Navbar-container-item-btn2-cart" />
            </button>
            <Link
              to="/memberCenter"
              className="Navbar-container-item-btn Navbar-container-item-btn2"
            >
              {currentUser && currentUser.avatar && (
                <img
                  src={`${PUBLIC_URL}/upload-images/${currentUser.avatar}`}
                  alt="使用者頭貼"
                  className="Navbar-container-item-btn Navbar-container-item-btn2-avatar"
                />
              )}
              {currentUser && !currentUser.avatar && (
                <img
                  src={avatar}
                  alt="使用者頭貼"
                  className="Navbar-container-item-btn Navbar-container-item-btn2-avatar"
                />
              )}
            </Link>
          </div>
        )}

        {!currentUser && (
          <div className="Navbar-container-item">
            <button className="Navbar-container-item-btn2">
              <MdShoppingCart className="Navbar-container-item-btn2-cart" />
            </button>
            &thinsp;
            <button
              onClick={handleLoginClick}
              className="Navbar-container-item-btn"
            >
              登入
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
