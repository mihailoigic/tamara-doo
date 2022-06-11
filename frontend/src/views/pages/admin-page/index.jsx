import React, {useEffect, useState} from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "../../../assets/css/styles.css";
import history from "../../../utilities/history";
import axios from "axios";
import Config from "../../../config/config";
import {scrollToTop} from "../../../utilities/util";

export default function AdminPage() {
    const [renderPage, setRenderPage] = useState(false);

    useEffect(() => {
        scrollToTop();
        axios.get(`${Config.api.baseUrl}v1/auth/login`, {
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        }).then(res => {
            setRenderPage(res.status === 200 ? true : false);
        })
    }, [])

    return (
        <>
            <Header/>
            {
                renderPage ?
                <Container className="mt-5">
                    <p className='h4 text-center pt-5'>ADMIN STRANICA</p>
                    <Row className='text-center my-5'>
                        <Col md='4 mt-2'>
                            <Button variant="primary b-width"
                                    onClick={() => history.push('/add-product')}>PROIZVODI</Button>
                        </Col>
                        <Col md='4 mt-2'>
                            <Button variant="secondary b-width" onClick={() => {
                                history.push('/add-to-db', {state: 'kategorije'})
                            }}>KATEGORIJE</Button>
                        </Col>
                        <Col md='4 mt-2'>
                            <Button variant="success b-width" onClick={() => {
                                history.push('/add-to-db', {state: 'tip'})
                            }}>TIPOVI</Button>
                        </Col>
                    </Row>
                    <Row className='text-center my-5'>
                        <Col md='4 mt-2'>
                            <Button variant="warning b-width" onClick={() => {
                                history.push('/add-to-db', {state: 'brend'})
                            }}>BRENDOVI</Button>
                        </Col>
                        <Col md='4 mt-2'>
                            <Button variant="danger b-width" onClick={() => {
                                history.push('/add-to-db', {state: 'boje'})
                            }}>BOJE</Button>
                        </Col>
                        <Col md='4 mt-2'>
                            <Button variant="info b-width" onClick={() => {
                                history.push('/add-to-db', {state: 'velicine'})
                            }}>VELIČINE</Button>
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Button className='w-25 mx-auto' onClick={()=>{
                            history.push('/email-list')
                            }
                        }>
                            Mailing lista
                        </Button>
                    </Row>
                </Container> :
                    <p className='text-center h4  mt-20'>Molimo ulogujte se <a href="" className="link" onClick={()=>history.push('/admin')}>ovde</a></p>
            }

        </>
    );
}