import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const User = () => {
  const [userDetails, setUserDetails] = useState(null);
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (firebase.user) {
        const details = await firebase.fetchUserDetails(firebase.user.email);
        setUserDetails(details);
      }
    };

    fetchUserDetails();
  }, [firebase]);

  const handleLogout = async () => {
    await firebase.logOutUser();
    navigate('/');
  };

  const handleNavigate = () => {
    navigate('/info');
  }

  if (!userDetails) return null;

  return (
    <Container className="my-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <Card.Title>User Details</Card.Title> <br />
              <Card.Text>
                <strong>Name:</strong> {userDetails.name} <br /><br />
                <strong>Contact:</strong> {userDetails.contact} <br /><br />
                <strong>Email:</strong> {userDetails.email} <br /><br />
                {userDetails.hospital && (
                  <>
                    <strong>Hospital:</strong> {userDetails.hospital} <br />
                  </>
                )}
              </Card.Text>
             <div style={{display:'flex', justifyContent:'space-between'}}>
             {userDetails.hospital && (
                <Button variant='danger' onClick={handleNavigate}>View Details</Button>
              )}
               <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
             </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default User;
