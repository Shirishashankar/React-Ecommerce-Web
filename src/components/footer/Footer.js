import React from "react";
import "./Footer.css";


// _____________Importing react icons___________//
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { AiFillTwitterCircle } from "react-icons/ai";

// ___________________Main Footer Component___________//
const Footer = () => {
  return (
    <footer>
      <a href="/" className="footer__logo">
        MUNCH
      </a>

      <ul className="permalinks">
        <li>
          <a href="/">Home</a>
        </li>
        
        <li>
          <a href="/cart">Your Cart</a>
        </li>
        <li>
          <a href="/">Service</a>
        </li>
        
        <li>
          <a href="/">Sell Your Food</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
      </ul>

      <div className="footer__socials">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          <BsFacebook />
        </a>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          <GrInstagram />
        </a>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillTwitterCircle />
        </a>
      </div>
      <div>
        <p>Contact : munch@gmail.com</p>
        <p>Address : Bangalore , Karnataka</p>
      </div>

      <div className="footer__copyright">
        <small>&copy;Shirisha : All right reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;