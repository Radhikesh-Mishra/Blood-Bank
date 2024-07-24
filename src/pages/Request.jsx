import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";


const Request = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [blood, setBlood] = useState('');

    const firebase = useFirebase();
    const navigate = useNavigate();

    const handleSubmit =async (e) => {
        e.preventDefault();
        await firebase.createRequestData(name, contact, email, blood, date);
        navigate('/');
    };

    return (
        <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto', marginTop: '40px' }}>
            <h2>Request Blood</h2>
            <Form.Group className="mb-3 mt-4" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter contact no."
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBloodGroup">
                <Form.Label>Blood Group</Form.Label>
                <Form.Select
                    aria-label="Select blood group"
                    value={blood}
                    onChange={(e) => setBlood(e.target.value)}
                >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default Request;