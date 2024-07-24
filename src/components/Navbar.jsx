import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase'; // Ensure the correct path

function MyNav() {
  const navigate = useNavigate();
  const { user } = useFirebase();

  const handleClick = () => {
    navigate('/login');
  };

  if (user === null) {
    return (
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/" style={{ color: 'red' }}>BLOOD BANK</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant='success' type="submit" onClick={handleClick}>Log In</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" style={{ color: 'red' }}>BLOOD BANK</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
           <a href="/user">{user.displayName || user.email}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;
