import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();

    const handleClickDonate = () => {
        navigate('/donate');
    };

    const handleClickRequest = () => {
        navigate('/request');
    };

    return (
        <Carousel>
            <Carousel.Item style={{ maxHeight: '80vh' }}>
                <img
                    className="d-block w-100"
                    src="public/Blood-Donation-1.webp"
                    alt="Donate Blood"
                    style={{ objectFit: 'cover', maxHeight: '80vh' }}
                />
                <Carousel.Caption className="text-start" style={{ marginBottom: '4%' }}>
                    <Button variant="success" onClick={handleClickDonate}>Donate Blood</Button>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{ maxHeight: '80vh' }}>
                <img
                    className="d-block w-100"
                    src="public/blood-bank.jpg"
                    alt="Request Blood"
                    style={{ objectFit: 'cover', maxHeight: '80vh' }}
                />
                <Carousel.Caption className="text-end" style={{ marginRight: '1%', marginBottom:'10%' }}>
                    <Button variant="primary" onClick={handleClickRequest}>Request Blood</Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Homepage;
