import React, {useEffect, useState} from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "../../../assets/css/styles.css";
import Form from 'react-bootstrap/Form';
import {
    useLocation
} from "react-router-dom";
import axios from "axios";
import Config from "../../../config/config";
import Loader from "../../components/Loader";
import history from "../../../utilities/history";
import querystring from "querystring";
import Select from "react-select";
import {scrollToTop} from "../../../utilities/util";


export default function AddToDBPage(props) {
    const [renderPage, setRenderPage] = useState(false);
    const [component, setComponent] = useState(null);
    const [data, setData] = useState(null);
    const [pol, setPol] = useState('zenski');
    const [kategorijeData, setKategorijeData] = useState(null);
    const [selectedKategorija, setKategorija] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [item, setItem] = useState(null);

    let location = useLocation();
    useEffect(() => {
        scrollToTop();
        axios.get(`${Config.api.baseUrl}v1/auth/login`, {
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        }).then(res => {
            setRenderPage(res.status === 200);
        })
    }, [])

    useEffect(() => {
        if (location.state !== undefined) {
            setComponent(location.state.state);
        } else {
            history.push('/admin-page');
        }
    }, [location]);
    useEffect(() => {
        if (component !== null) {
            axios.get(`${Config.api.baseUrl}v1/${component}`)
                .then(res => {
                    setData(res.data.data);
                })
        }
        if (component === 'tip') {
            axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=${pol}`)
                .then(res => {
                    setKategorijeData(res.data.data);
                })
        }

    }, [component]);
    useEffect(() => {
        if (component === 'tip') {
            axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=${pol}`)
                .then(res => {
                    setKategorijeData(res.data.data);
                })
        }

    }, [pol]);

    const deleteComponent = () => {
        if (item !== null) {
            axios.delete(`${Config.api.baseUrl}v1/${component}/${item.id}`, {
                data: {naziv: item.naziv},
                headers: {"Authorization": localStorage.getItem("BearerToken")}
            }).then((response) => {
                if (response.status === 200) {
                    alert(`Uspešno obrisana komponenta: ${item.naziv}`);
                }
                if (response.status === 401) {
                    alert(`Nemate prava za brisanje proizvoda, Molimo vas da se ulogujete.`);
                }
            });
            setShowPopup(false);
            //refresh tabele
            if (component !== null) {
                axios.get(`${Config.api.baseUrl}v1/${component}`)
                    .then(res => {
                        setData(res.data.data);
                    })
            }
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            const value = form.naziv.value;
            axios.post(`${Config.api.baseUrl}v1/${component}`, {naziv: value}, {headers: {'Authorization': localStorage.getItem('BearerToken')}})
                .then((response) => {
                    if (response.status === 200) {
                        if (component === 'kategorije') {
                            const polForm = form.pol.value;
                            axios.post(`${Config.api.baseUrl}v1/kategorijatip`, {
                                pol: polForm,
                                kategorija: response.data.data.id,
                                tip: 42
                                },{
                                headers: {'Authorization': localStorage.getItem('BearerToken')}
                            });
                            alert(`Uspešno dodata komponenta: ${value}`);
                        }
                        if (component === 'tip') {
                            const polForm = form.pol.value;
                            const kategorijaForm = form.kategorija.value;
                            axios.post(`${Config.api.baseUrl}v1/kategorijatip`,{
                                pol: polForm,
                                kategorija: kategorijaForm,
                                tip: response.data.data.id
                            },{
                                headers: {'Authorization': localStorage.getItem('BearerToken')}
                            });
                            alert(`Uspešno dodata komponenta: ${value}`);
                        }
                    }

                })
        }
    };

    const onChangePol = (selectedOption) => {
        setPol(selectedOption.target.value);
    }

    const onChangeTip = (selectedOption) => {
        setKategorija(selectedOption.value);
    }

    return (
        <>
        {
            renderPage ?
                <>
                    {
                        data === null ? <Loader/> :
                            <>
                                {
                                    showPopup &&
                                    <>
                                        <div className='background-popup'/>
                                        <div className='popup-delete text-center p-4'>
                                            <p>{`Da li ste sigurni da želite da obrišete komponentu ${item.naziv}?`}</p>
                                            <Button variant="danger" className='me-3'
                                                    onClick={() => deleteComponent()}>Da</Button>
                                            <Button onClick={() => setShowPopup(false)}>Ne</Button>
                                        </div>
                                    </>
                                }
                                <Header/>
                                <Container>
                                    <div className='mt-5'>
                                        <Row>
                                            <Col md='6'>
                                                <p className='h5 mt-5 mb-5'>{`Dodaj komponentu: ${component.toUpperCase()}`}</p>
                                                <form onSubmit={handleSubmit} className="mb-5">
                                                    <Row className="mb-3">
                                                        {
                                                            (component === 'kategorije' || component === 'tip') ?
                                                                <Form.Group as={Col} md="7 mt-3 mb-3" controlId="pol">
                                                                    <Form.Label>Pol:</Form.Label>
                                                                    <Form.Select aria-label="Default select example"
                                                                                 onChange={onChangePol}>
                                                                        <option key={1} value='zenski'>Ženski</option>
                                                                        <option key={2} value='muski'>Muški</option>
                                                                    </Form.Select>
                                                                </Form.Group> : null
                                                        }
                                                        {
                                                            component === 'tip' &&
                                                            <Col md="7 mb-3">
                                                                <Form.Label>Kategorija:</Form.Label>
                                                                <Select
                                                                    name="kategorija"
                                                                    options={kategorijeData}
                                                                    className="basic-select"
                                                                    placeholder="Izaberi.."
                                                                    classNamePrefix="Izaberi.."
                                                                    onChange={onChangeTip}
                                                                />
                                                            </Col>
                                                        }
                                                        <Form.Group as={Col} md="7" controlId="naziv">
                                                            <Form.Label>Naziv:</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Naziv"
                                                            />
                                                        </Form.Group>


                                                        <Col md='12' className='mt-4'>
                                                            <Button type="submit">Dodaj komponentu</Button>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </Col>
                                            <Col md='6' className='p-0'>
                                                <p className='h5 mt-5 mb-5'>{`Lista komponente: ${component.toUpperCase()}`}</p>
                                                <Row className='text-center border-top border-bottom bg-masa mt-2'>
                                                    <Col md='2' className='py-2 p-0 border-right-black'>ID:</Col>
                                                    <Col md='8' className='py-2 p-0 border-right-black'>NAZIV</Col>
                                                    <Col md='2' className='py-2 p-0'>BRISANJE:</Col>
                                                </Row>
                                                <div className='show-table'>
                                                    {
                                                        data.map((item) => {
                                                            return (
                                                                <Row className='text-center border mt-2'>
                                                                    <Col md='2' className='pt-3 p-0'>{item.id}</Col>
                                                                    <Col md='8' className='pt-3 p-0'>{item.naziv}</Col>
                                                                    <Col md='2' className='py-2 p-0'>
                                                                        <Button
                                                                            variant="danger"
                                                                            onClick={() => {
                                                                                setItem(item);
                                                                                setShowPopup(true);
                                                                            }}>
                                                                            Obriši
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            );

                                                        })
                                                    }
                                                </div>
                                            </Col>
                                        </Row>

                                    </div>
                                </Container>
                            </>
                    }
                </> :
                <p className='text-center h4  mt-20'>Molimo ulogujte se <a href="" className="link" onClick={()=>history.push('/admin')}>ovde</a></p>
        }
        </>
    );
}