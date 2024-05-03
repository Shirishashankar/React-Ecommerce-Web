import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import Badge from "@mui/material/Badge";
import MyVerticallyCenteredModal from "./Modals";
import { useSelector } from "react-redux";
import Logo from "../assets/Logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart, faUser,
} from "@fortawesome/free-solid-svg-icons";
import Login from "./Login";

const Header = () => {
  const items = useSelector((state) => state.cart.cartItems);
  const [modalShow, setModalShow] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false); // State to control the visibility of the login form

  // Function to toggle the visibility of the login form
  const toggleLoginForm = () => {
    setShowLoginForm((prevShowLoginForm) => !prevShowLoginForm);
  };

  return (
    <>
      <Navbar
        style={{ background: "#fff", height: 90 }}
        variant="light"
        className="fixed-top"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ height: 60 }} // Adjust height of the logo
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            &nbsp; &nbsp; &nbsp;
            <Nav.Link href="/addproducts">
              <Button >Add Cakes</Button>
            </Nav.Link>
          </Nav>

          <FontAwesomeIcon
            icon={faUser}
            style={{
              fontSize: 25,
              cursor: "pointer",
              color: "#db5275",
              paddingRight: "30px",
            }}
            onClick={toggleLoginForm} // Use toggleLoginForm function to toggle visibility
          />

          {/* react-bootsrap badge */}
          <Badge badgeContent={items.length} color="dark">
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{
                fontSize: 25,
                cursor: "pointer",
                color: "#db5275",
                paddingRight: "8",
              }}
              onClick={() => setModalShow(true)}
            />
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Badge>

        </Container>
      </Navbar>

      {/* Conditionally render the Login component based on showLoginForm state */}
      {showLoginForm && <Login setModalShow={setModalShow} />}
    </>
  );
};

export default Header;