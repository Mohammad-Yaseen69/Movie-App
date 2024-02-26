import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./Styles.scss";
import { Wrapper } from '../'
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const Links = [
    {
      name: "Movies",
      link: "movies"
    },
    {
      name: "TV Shows",
      link: "tv"
    }
  ]

  useEffect(() => {
    window.scrollTo(0 , 0)
  }, [location])
  

  const toggleSearch = () => {
    setShowSearch(prev => !prev)
    console.log(showSearch);
    if (mobileMenu) {
      setMobileMenu(false)
    }
  }
  const toggleMenu = () => {
    setMobileMenu(prev => !prev);
    if (showSearch) {
      setShowSearch(false)
    }
  }

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query.trimEnd()}`)
      setTimeout(() => {
        setShowSearch(false)
      }, 1000);
    }
  }

  const controlScroll = (e) => {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      if (scrollY > lastScrollY && !mobileMenu) {
        setShow("hide")
      }
      else {
        setShow("show")
      }
    }
    else {
      setShow("top")
    }

    setLastScrollY(scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", controlScroll)
    return () => {
      window.removeEventListener("scroll", controlScroll)
    }
  }, [lastScrollY])


  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <Wrapper>

        <div className="logo">
          <img src={logo} onClick={() => navigate("/")} alt="" />
        </div>

        <ul className="menuItems">
          {Links.map(link => <li onClick={() => navigate(`explore/${link.link}`)} className="menuItem" key={link.name}>{link.name}</li>)}
          <li className="menuItem">
            <HiOutlineSearch onClick={toggleSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch cursor="pointer" onClick={toggleSearch} />
          {mobileMenu ? (<VscChromeClose cursor="pointer" onClick={toggleMenu} />) : (<SlMenu cursor="pointer" onClick={toggleMenu} />)}
        </div>
      </Wrapper>

      {showSearch &&
        <div className="searchBar">
          <Wrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={toggleSearch} />
            </div>
          </Wrapper>
        </div>}
    </header>
  );
};


export default Header