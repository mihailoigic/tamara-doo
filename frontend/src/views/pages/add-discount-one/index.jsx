import React, {useEffect, useState} from "react";
import '../../../assets/css/styles.css';
import Container from 'react-bootstrap/Container';
import Header from "../../components/header";
import {
    useLocation
} from "react-router-dom";
import {getValueFromMultiSelect, prepareForSelect, prepareValuesForSelect, scrollToTop} from "../../../utilities/util";
import axios from "axios";
import Config from "../../../config/config";
import {useParams} from "react-router-dom";
import history from "../../../utilities/history";
import Select from "react-select";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {IoCloseSharp} from "react-icons/all";

export default function AddDiscountOnePage() {
    const [renderPage, setRenderPage] = useState(false);
    const [proizvod, setProizvod] = useState(null);
    const [component, setComponent] = useState(null);
    let location = useLocation();

    useEffect(() => {
        scrollToTop();
        axios.get(`${Config.api.baseUrl}v1/auth/login`, {
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        }).then(res => {
            setRenderPage(res.status === 200);
        })
    }, []);

    useEffect(() => {
        if (location.state !== undefined) {
            setComponent(location.state.state);
        } else {
            history.push('/admin-page');
        }
    }, [location]);

    useEffect(() => {
        component &&
        axios.get(`${Config.api.baseUrl}v1/proizvod/${component}`)
            .then(res => {
                setProizvod(res.data.data);
            })

    }, [component]);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        const procenat = form.procenat.value / 100;

        axios.post(`${Config.api.baseUrl}v1/add-discount/${proizvod.id}`, { procenat: procenat }, {
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("Uspesno dodat popust!");
                } else {
                    alert("Neuspesno dodat popust!");

                }
                history.push('/add-product')
            });
    };

    return (
        <>
            <Header/>
            {
                renderPage && proizvod ?
                    <Container className="mt-5">
                        <p>Naziv: {proizvod.naziv}</p>
                        <p>Kategorija: {proizvod.kategorija}</p>
                        <p>Brend: {proizvod.brend}</p>
                        <form onSubmit={handleSubmit} className="mb-5">
                                <Form.Group as={Col} md="2" controlId="procenat">
                                    <Form.Label>Popust:</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Procenat"
                                    /><p className='d-inline-block'>%</p>
                                </Form.Group>
                            <Button type="submit">Dodaj popust</Button>
                        </form>
                    </Container> :
                    <p className='text-center h4 mt-20'>Molimo ulogujte se <a href="" className="link"
                                                                              onClick={() => history.push('/admin')}>ovde</a>
                    </p>
            }
        </>
    );
}
