import React, { useState, useEffect } from "react";
import { Button, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formType, setFormType] = useState('user');
    const [hospital, setHospital] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [key, setKey] = useState('');

    const firebase = useFirebase();
    const navigate = useNavigate();

    const handleFormTypeChange = (val) => {
        setFormType(val);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formType === 'user') {
            await firebase.logInUserWithEmailAndPassword(email, password);
        } else if (formType === 'hospital' && (key !== '147' && key !== '258' && key !== '369')) {
            alert('Wrong Pass Key for the hospital');
            return;
        } else {
            await firebase.logInUserWithEmailAndPassword(email, password);
        }
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
                <ToggleButton id="tbg-radio-1" value="user">
                    User
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value="hospital">
                    Hospital
                </ToggleButton>
            </ToggleButtonGroup>

            <Form onSubmit={handleSubmit}>
                {formType === 'hospital' && (
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
                )}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                {formType === 'hospital' && (
                    <Form.Group className="mb-3" controlId="formBasicPassKey">
                        <Form.Label>Pass Key</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter hospital's passkey"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                        />
                    </Form.Group>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                    <br />
                    <a href="/signin">Create a new account?</a>
                </div>
            </Form>
        </div>
    );
};

export default Login;
