import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import './header.css';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">AYMedica</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" className="title">Home</Nav.Link>
          <Nav.Link href="/admin" className="title">Doctors</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;