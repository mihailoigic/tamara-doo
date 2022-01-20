import React, {useEffect, useState} from "react";
import '../../../assets/css/styles.css';
import Container from 'react-bootstrap/Container';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Config from "../../../config/config";
import axios from "axios";
import querystring from "querystring";
import history from "../../../utilities/history";
import {scrollToTop} from "../../../utilities/util";

function LogInPage() {

    useEffect(() => {
        scrollToTop();
    }, [])

    const [notValidLogin, setNotValidLogin] = useState(false);

    function handleSubmit() {
        const username = document.getElementById('formBasicEmail').value;
        const password = document.getElementById('formBasicPassword').value;

        try {
            axios.post(`${Config.api.baseUrl}v1/auth/login`, querystring.stringify({
                email: username.toString(),
                password: password.toString(),
            })).then((response) => {
                if (response.status === 200) {
                    sessionStorage.setItem('BearerToken', response.data.data);
                    history.push('/admin-page');
                } else {
                    setNotValidLogin(true);
                }
            });
        } catch (err) {
            setNotValidLogin(true);
        }
    }

    return (
        <>
            <Header />
            <Container className="justify-content-center mt-20">
                {
                    notValidLogin &&
                        <p className='p4 text-danger text-center'>Username i password se ne podudaraju!</p>
                }
                <Form>
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
                        <Button as={Col} className="text-center" variant="primary" type="button" onClick={()=>handleSubmit()}>
                            PRIJAVI SE
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default LogInPage;
