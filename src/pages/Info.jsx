import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";

const Info = () => {
    const [requests, setRequests] = useState([]);
    const [donations, setDonations] = useState([]);
    const firebase = useFirebase();

    useEffect(() => {
        const fetchRequests = async () => {
            const requestsSnapshot = await firebase.fetchRequests();
            setRequests(requestsSnapshot.docs.map(doc => doc.data()));
        };

        fetchRequests();
    }, [firebase]);

    useEffect(() => {
        const fetchHospitalAndDonations = async () => {
            try {
                const user = firebase.user;
                if (user) {
                    const hospitalData = await firebase.fetchHospital(user.email);
                    const donationsData = await firebase.fetchDonate(hospitalData.hospital);
                    setDonations(donationsData);
                }
            } catch (error) {
                console.error("Error fetching donations: ", error);
            }
        };

        fetchHospitalAndDonations();
    }, [firebase]);

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h2>Information About Blood Requests</h2>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Blood Group</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{request.name}</td>
                                    <td>{request.contact}</td>
                                    <td>{request.email}</td>
                                    <td>{request.blood}</td>
                                    <td>{request.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="my-4">
                <Col>
                    <h2>Information About Blood Donations</h2>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Blood Group</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donate, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{donate.name}</td>
                                    <td>{donate.contact}</td>
                                    <td>{donate.email}</td>
                                    <td>{donate.blood}</td>
                                    <td>{donate.date}</td>
                                    <td>{donate.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Info;
