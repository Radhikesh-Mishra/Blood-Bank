import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4">
            <Container>
                <Row>
                    <Col xs={12} md={4}>
                        <h5>About Us</h5>
                        <p>
                            We are dedicated to providing a seamless platform for blood donation and requests. Our goal is to connect donors with those in need efficiently and effectively.
                        </p>
                    </Col>
                    <Col xs={12} md={4}>
                        <h5>Quick Links</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="/" className="text-light">Home</Nav.Link>
                            <Nav.Link href="/request" className="text-light">Request</Nav.Link>
                            <Nav.Link href="/donate" className="text-light">Donate</Nav.Link>
                        </Nav>
                    </Col>
                    <Col xs={12} md={4}>
                        <h5>Follow Us</h5>
                        <div className="d-flex gap-3">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                <FaFacebookF />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                <FaTwitter />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                <FaInstagram />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Blood Bank Web App. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
