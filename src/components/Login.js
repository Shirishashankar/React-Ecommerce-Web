import React from "react";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

const Login = ({ setModalShow }) => {
 
  return (
    <>
      {/* Login Form */}
      <Form  style={{ marginTop: "150px"  }}>
  <div className="mb-3 loginContainer">
    <Form.Group controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
  </div>

  <div className="mb-3">
    <Form.Group controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  </div>

  <div className="mb-3">
    <Button  type="submit">
      Submit
    </Button>
  </div>
</Form>

    </>
  );
};

export default Login;