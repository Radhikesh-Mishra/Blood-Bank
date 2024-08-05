import React, { useState, useEffect } from "react";
import { Button, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const [formType, setFormType] = useState('user');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hospital, setHospital] = useState('');
    const [error, setError] = useState('');

    const firebase = useFirebase();
    const navigate = useNavigate();

    const handleFormTypeChange = (val) => {
        setFormType(val);
    };

    useEffect(() => {
        if (firebase.user) {
            if (formType === 'user') {
                navigate('/');
            } else if (formType === 'hospital') {
                navigate('/info');
            }
        }
    }, [firebase.user, formType, navigate]);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error

        if (contact.length !== 10) {
            setError('Contact number must be exactly 10 digits.');
            return;
        }

            await firebase.signInUserWithEmailAndPassword(email, password);
            await firebase.createUserData(name, contact, email);
    };

    const handleCreateHospitalStaff = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error

        if (contact.length !== 10) {
            setError('Contact number must be exactly 10 digits.');
            return;
        }

        try {
            await firebase.signInUserWithEmailAndPassword(email, password);
            await firebase.createHospitalData(name, contact, email, hospital);
        } catch (error) {
            console.error("Error during hospital staff creation: ", error);
            setError(error.message);
        }
    };

    return (
        <div style={{ marginTop: '40px', maxWidth: '500px', margin: 'auto' }}>
            <ToggleButtonGroup
                type="radio"
                name="formType"
                value={formType}
                onChange={handleFormTypeChange}
                className="mb-3"
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <ToggleButton id="tbg-radio-1" value={'user'}>
                    User
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value={'hospital'}>
                    Hospital Staff
                </ToggleButton>
            </ToggleButtonGroup>

            {formType === 'user' ? (
                <Form onSubmit={handleCreateUser}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicContact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="text" placeholder="Enter contact no." onChange={(e) => setContact(e.target.value)} value={contact} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </Form.Group>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button variant="primary" type="submit">
                            Create Account
                        </Button>
                        <br />
                        <a href="/login">Already have an account?</a>
                    </div>
                </Form>
            ) : (
                <Form onSubmit={handleCreateHospitalStaff}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicContact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="text" placeholder="Enter contact no." onChange={(e) => setContact(e.target.value)} value={contact} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicHospital">
                        <Form.Label>Hospital</Form.Label>
                        <Form.Select
                            aria-label="Select hospital"
                            value={hospital}
                            onChange={(e) => setHospital(e.target.value)}
                        >
                            <option value="">Select Hospital</option>
                            <option value="hospital1">Hospital 1</option>
                            <option value="hospital2">Hospital 2</option>
                            <option value="hospital3">Hospital 3</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </Form.Group>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button variant="primary" type="submit">
                            Create Account
                        </Button>
                        <br />
                        <a href="/login">Already have an account?</a>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default Signin;
