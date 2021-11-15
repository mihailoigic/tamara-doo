import React, { useState } from "react";
import '../../../assets/css/styles.css';
import labels from '../../../language/srb';
import Container from 'react-bootstrap/Container';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Config from "../../../config/config";
import axios from "axios";

function LogInPage() {
    const [users, setUsers] = useState(null);

    function handleSubmit(event) {
        const form = event.currentTarget;
        const username = form.formBasicEmail.value;
        const password = form.formBasicPassword.value;

        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IldhbHRlciBXaGl0ZSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJjcmVhdGVkX2F0IjoiMjAyMS0xMS0wN1QxNDozNzo0My44NzhaIiwiaWF0IjoxNjM2NjgwNTg4LCJleHAiOjE2MzY2ODE0ODh9.AMjmWmhbzj-RirjbV9wRGPBdRyvb2K4iB0kmhRwcsgs',
        };
        axios.get(`${Config.api.baseUrl}v1/users`, { headers })
            .then(response => setUsers(response.data.data));
        console.log(users);
        if (username === users.username && password === users.password) {
            //ubaci u store
        }
    }

    return (
        <>
            <Header />
            <Container className="mt-5 justify-content-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Col} md="4" className="mb-3 mx-auto" controlId="formBasicEmail">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="email" placeholder="Unesi username" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3 mx-auto" controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Unesi Password" />
                    </Form.Group>

                    <Form.Group as={Col} md="4" className="mb-3 mx-auto" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Čekiraj" />
                    </Form.Group>

                    <div className="text-center">
                        <Button as={Col} className="text-center" variant="primary" type="submit">
                            PRIJAVI SE
                        </Button>
                    </div>
                </Form>
            </Container>
            <Footer />
        </>
    );
}

export default LogInPage;
