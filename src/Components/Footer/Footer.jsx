import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import { Wrapper } from "../";

import "./Styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Wrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="socialIcons">
          <span className="icon">
            <a target="_blank" href="https://www.facebook.com/mohammadyaseen.developer/"><FaFacebookF color="white" /></a>
          </span>
          <span className="icon">
            <a target="_blank" href="https://www.instagram.com/_yaxeen_098_/"><FaInstagram color="white" /></a>
          </span>
          <span className="icon">
            <a target="_blank" href="https://twitter.com/MohammadYa50019"> <FaTwitter color="white" /></a>
          </span>
          <span className="icon">
            <a target="_blank" href="https://github.com/Mohammad-Yaseen69"><FaGithub color="white" /></a>
          </span>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;