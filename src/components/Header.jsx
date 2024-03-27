import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import "./Header.scss";
import logo from "../assets/movix-logo.svg";
import ContentWrapper from "./ContentWrapper";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const searchInput = useRef();
  const [showSearch, setShowSearch] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = () => {
    setLastScrollY(window.scrollY);

    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleMObileView = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const handleSearchView = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const handleSearchInput = (event) => {
    if (event.key === "Enter" && searchInput.current.value.trim() !== "") {
      navigate(`/search/${searchInput.current.value.trim()}`);
      searchInput.current.value = "";
      setShowSearch(false);
    }
  };

  const handleNavigate = (type) => {
    if (type === "Movies") {
      navigate("/explore/movie");
    } else if (type === "TV Shows") {
      navigate("/explore/tv");
    } else if (type === "logo") {
      navigate("/");
    }
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <div onClick={() => handleNavigate("logo")} className="logo">
        <img src={logo} alt="" />
      </div>
      <ul className="menuItems">
        <li onClick={() => handleNavigate("Movies")} className="menuItem">
          Movies
        </li>
        <li onClick={() => handleNavigate("TV Shows")} className="menuItem">
          TV Shows
        </li>
        <li className="menuItem">
          <HiOutlineSearch onClick={handleSearchView} />
        </li>
      </ul>
      <div className="mobileMenuItems">
        <HiOutlineSearch
          style={{ cursor: "pointer" }}
          onClick={handleSearchView}
        />
        {mobileMenu ? (
          <VscChromeClose
            style={{ cursor: "pointer" }}
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <SlMenu style={{ cursor: "pointer" }} onClick={handleMObileView} />
        )}
      </div>
      {showSearch && (
        <div className="searchBar">
          <div className="searchInput">
            <input
              type="text"
              ref={searchInput}
              onKeyUp={handleSearchInput}
              placeholder="Search for a movie or tv show...."
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
