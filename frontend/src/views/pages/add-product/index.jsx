import React, {useState} from "react";
import '../../../assets/css/styles.css';
import './css/index.css';
import labels from '../../../language/srb';
import Container from 'react-bootstrap/Container';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import brendovi from '../../../data/brendovi';
import tipovi from '../../../data/tipovi';
import kategorije from "../../../data/kategorije";
import podtipovi from "../../../data/podtipovi";
import { AiOutlinePlus } from 'react-icons/ai';

function AddProductPage() {
    const [dodajVelicine, setDodajVelicine] = useState(false);

    function velicineItem() {
        return (
            <Form.Group className='m-2'>
                <Form.Select aria-label="Default select example">
                    <option key={1}>S</option>
                    <option key={2}>M</option>
                    <option key={3}>L</option>
                    <option key={4}>XL</option>
                </Form.Select>
            </Form.Group>
        );
    }

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            alert('Uspesno dodat proizvod!');
            const product = {
                brend: event.currentTarget.brend.value,
                naziv: event.currentTarget.naziv.value,
                kategorija: event.currentTarget.kategorija.value,
                tip: event.currentTarget.tip.value,
                podtip: event.currentTarget.podtip.value,
                velicina: event.currentTarget.velicina.value,
                boja: event.currentTarget.boja.value,
                rod: event.currentTarget.rod.value,
                novo: event.currentTarget.novo.value === 'Da',
                moda: event.currentTarget.moda.value === 'Da',
                cena: event.currentTarget.cena.value,
                opis: event.currentTarget.opis.value,
            }
        }
        setValidated(true);
    };

    return (
        <>
            <Header/>
            <p className="mt-5 text-center h4">Dodavanje proizvoda u listu proizvoda</p>
            <Container className="mt-5 mb-5">
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="mb-5">
                    <Row className="mb-3">
                        <Form.Group as={Col} md="2" controlId="brend">
                            <Form.Label>Brend:</Form.Label>
                            <Form.Select aria-label="Default select example">
                                {
                                    brendovi.brendovi.map((brend) => {
                                        return (
                                            <option key={brend.id} value={brend.naziv}>{brend.naziv}</option>
                                        );
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="naziv">
                            <Form.Label>Naziv:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Naziv"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="kategorija">
                            <Form.Label>Kategorija:</Form.Label>
                            <Form.Select aria-label="Default select example">
                                {
                                    kategorije.kategorije.map((kategorija) => {
                                        return (
                                            <option key={kategorija.id}
                                                    value={kategorija.naziv}>{kategorija.naziv}</option>
                                        );
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="tip">
                            <Form.Label>Tip:</Form.Label>
                            <Form.Select aria-label="Default select example">
                                {
                                    tipovi.tipovi.map((tip) => {
                                        return (
                                            <option key={tip.id} value={tip.naziv}>{tip.naziv}</option>
                                        );
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="podtip">
                            <Form.Label>Podtip:</Form.Label>
                            <Form.Select aria-label="Default select example">
                                {
                                    podtipovi.podtipovi.map((podtip) => {
                                        return (
                                            <option key={podtip.id} value={podtip.naziv}>{podtip.naziv}</option>
                                        );
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="naziv">
                            <Form.Label>Veličine:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="s,m,l"
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="2" controlId="naziv">
                            <Form.Label>Boje:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="crna,bela,roze"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="rod">
                            <Form.Label>Rod:</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option key={1}>Ženski</option>
                                <option key={2}>Muški</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="novo">
                            <Form.Label>Novo:</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option key={1}>Da</option>
                                <option key={2}>Ne</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="moda">
                            <Form.Label>Moda:</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option key={1}>Da</option>
                                <option key={2}>Ne</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="cena">
                            <Form.Label>Cena:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="3000"
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="opis">
                            <Form.Label>Opis:</Form.Label>
                            <Form.Control type="text" defaultValue=" " required/>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Dodaj proizvod</Button>
                </Form>
            </Container>
        </>
    );
}

export default AddProductPage;
