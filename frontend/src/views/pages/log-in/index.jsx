import React from "react";
import '../../../assets/css/styles.css';
import labels from '../../../language/srb';
import Container from 'react-bootstrap/Container';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function LogInPage() {

    function handleSubmit() {
        //
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
