import React, {useEffect, useState} from "react";
import '../../../assets/css/styles.css';
import './css/index.css';
import Container from 'react-bootstrap/Container';
import Header from "../../components/header";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import filtersData from "../../../data/filtersData";
import axios from "axios";
import Config from "../../../config/config";
import {getValueFromMultiSelect, prepareForSelect, scrollToTop} from "../../../utilities/util";
import history from "../../../utilities/history";

function AddProductPage() {
    const [renderPage, setRenderPage] = useState(false);
    const [category, setCategory] = useState(null);
    const [apiBrands, setApiBrands] = useState(null);
    const [pol, setPol] = useState('zenski');
    const [apiCategories, setApiCategories] = useState(null);
    const [apiColors, setApiColors] = useState(null);
    const [apiSizes, setApiSizes] = useState(null);
    const [badSubmit, setBadSubmit] = useState(false);
    const [badSubmitDesc, setBadSubmitDesc] = useState("");
    const [proizvodi, setProizvodi] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [item, setItem] = useState(null);
    const [start, setStart] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        scrollToTop();
        axios.get(`${Config.api.baseUrl}v1/auth/login`, {
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        }).then(res => {
            setRenderPage(res.status === 200);
        })
        axios.get(`${Config.api.baseUrl}v1/proizvod?start=${start}${search}&count=2000`)
            .then(res => {
                setProizvodi(res.data.data);
            })
        axios.get(`${Config.api.baseUrl}v1/brend`)
            .then(res => {
                setApiBrands(prepareForSelect(res.data.data));
            })
    }, [])

    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/proizvod?start=${start}${search}&count=2000`)
            .then(res => {
                setProizvodi(res.data.data);
            })
    }, [start, search])

    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=${pol}`)
            .then(res => {
                setApiCategories(res.data.data);
            })
        axios.get(`${Config.api.baseUrl}v1/brend`)
            .then(res => {
                setApiBrands(prepareForSelect(res.data.data));
            })
        axios.get(`${Config.api.baseUrl}v1/boje`)
            .then(res => {
                setApiColors(prepareForSelect(res.data.data));
            })
        axios.get(`${Config.api.baseUrl}v1/velicine`)
            .then(res => {
                setApiSizes(prepareForSelect(res.data.data));
            })
    }, [pol]);

    function getDefaultSlika() {
        try {
            return document.getElementById('slike').files[0].name;
        } catch {
            alert('Niste dodali sliku!');
        }
    }

    function getPicturesNames(pictures) {
        let picturesArray = [];
        if (pictures.length > 0) {
            for (var i = 0; i < pictures.length; i++) {
                picturesArray.push(pictures[i].name);
            }
        }
        return picturesArray;
    }

    const onChange = (selectedOption) => {
        setCategory(selectedOption.value);
    }

    const onChangePol = (selectedOption) => {
        setPol(selectedOption.target.value);
    }

    function validateField(value, name) {
        if (value === undefined || value === "" || value === null || value === 0) {
            setBadSubmitDesc(name);
            return false;
        }
        if (name === 'boje' || name === 'velicine') {
            if (getValueFromMultiSelect(value).length === 0) {
                setBadSubmitDesc(name);
                return false;
            }
        }
        return true;
    }

    function formValidation(form) {
        if (!validateField(form.brend.value, "brend")) return false;
        if (!validateField(form.kategorija.value, "kategorija")) return false;
        if (!validateField(form.velicina, "velicine")) return false;
        if (!validateField(form.boja, "boje")) return false;
        if (!validateField(document.getElementById('slike').files.length, "slike")) return false;
        return true;
    }



    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            if (!formValidation(form)) {
                event.preventDefault();
                setBadSubmit(true);
            } else {
                setBadSubmit(false);
                event.preventDefault();
                const product = {
                    brend: Number(event.currentTarget.brend.value),
                    naziv: event.currentTarget.naziv.value,
                    kategorija: Number(event.currentTarget.kategorija.value),
                    tip: event.currentTarget.tip.value ? Number(event.currentTarget.tip.value) : null,
                    podtip: getValueFromMultiSelect(event.currentTarget.podtip),
                    velicine: getValueFromMultiSelect(event.currentTarget.velicina),
                    boje: getValueFromMultiSelect(event.currentTarget.boja),
                    rod: event.currentTarget.rod.value === 'zenski' ? 1 : 0,
                    novo: event.currentTarget.novo.value === 'Da',
                    moda: event.currentTarget.moda.value === 'Da',
                    cena: Number(event.currentTarget.cena.value),
                    opis: event.currentTarget.opis.value,
                    defaultSlika: getDefaultSlika(),
                    slike: getPicturesNames(document.getElementById('slike').files),
                }

                axios.post(`${Config.api.baseUrl}v1/proizvod`, {
                        naziv: product.naziv,
                        rod: product.rod,
                        novo: Boolean(product.novo),
                        moda: Boolean(product.moda),
                        cena: product.cena,
                        opis: product.opis,
                        defaultSlika: product.defaultSlika,
                        kategorija: product.kategorija,
                        tip: product.tip,
                        podtipovi: product.podtip,
                        brend: product.brend,
                        velicine: product.velicine,
                        boje: product.boje,
                        slike: product.slike,
                    }, {
                        headers: {'Authorization': localStorage.getItem('BearerToken')}
                    }
                ).then((response) => {
                    if (response.status === 200) ;
                    alert("Uspesno dodat proizvod!");
                    window.location.reload();
                });
            }
        }
    };

    const deleteComponent = () => {
        if (item !== null) {
            axios.delete(`${Config.api.baseUrl}v1/proizvod/${item.id}`, {
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
        }
    }

    return (
        <>
            <Header/>
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
            {
                renderPage ?
                    <div className='mt-5'>
                        <Container className="mt-5 mb-5 mt-20">
                            <p className="mt-5 text-center h4">Dodavanje proizvoda u listu proizvoda</p>
                            <form onSubmit={handleSubmit} className="mb-5">
                                <Row className="mb-3">
                                    <Col md="2">
                                        <Form.Label>Brend:</Form.Label>
                                        <Select
                                            name="brend"
                                            options={apiBrands}
                                            className="basic-select"
                                            placeholder="Izaberi.."
                                            required={true}
                                        />
                                    </Col>
                                    <Form.Group as={Col} md="2" controlId="naziv">
                                        <Form.Label>Naziv:</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Naziv"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="2" controlId="rod">
                                        <Form.Label>Pol:</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={onChangePol}>
                                            <option key={1} value='zenski'>Ženski</option>
                                            <option key={2} value='muski'>Muški</option>
                                            {/*<option key={3} value='zenski'>UNISEX</option>*/}
                                        </Form.Select>
                                    </Form.Group>
                                    <Col md="2">
                                        <Form.Label>Kategorija:</Form.Label>
                                        <Select
                                            name="kategorija"
                                            options={apiCategories}
                                            className="basic-select"
                                            placeholder="Izaberi.."
                                            classNamePrefix="Izaberi.."
                                            onChange={onChange}
                                        />
                                    </Col>
                                    <Col md="2">
                                        <Form.Label>Tip:</Form.Label>
                                        <Select
                                            name="tip"
                                            options={apiCategories?.find(item => {
                                                return item.value === category
                                            })?.tip}
                                            className="basic-select"
                                            placeholder="Izaberi.."
                                            classNamePrefix="Izaberi.."
                                        />
                                    </Col>
                                    <Col md="2">
                                        <Form.Label>Podtip:</Form.Label>
                                        <Select
                                            isMulti
                                            name="podtip"
                                            options={filtersData.filters.woman.categories.find(item => {
                                                return item.value === category
                                            })?.subTypes}
                                            className="basic-select"
                                            placeholder="Izaberi.."
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md="4">
                                        <Form.Label>Veličine:</Form.Label>
                                        <Select
                                            isMulti
                                            name="velicina"
                                            options={apiSizes}
                                            className="basic-multi-select"
                                            placeholder="Izaberi.."
                                        />
                                    </Col>
                                    <Col md="4">
                                        <Form.Label>Boje:</Form.Label>
                                        <Select
                                            isMulti
                                            name="boja"
                                            options={apiColors}
                                            className="basic-multi-select"
                                            placeholder="Izaberi.."
                                        />
                                    </Col>
                                    <Form.Group as={Col} md="2" controlId="novo">
                                        <Form.Label>Novo:</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option key={1} value='Da'>Da</option>
                                            <option key={2} value='Ne'>Ne</option>
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
                                    <Col md="2">
                                        <input
                                            className="mt-3 pt-3"
                                            type="file"
                                            id="slike"
                                            name="slike"
                                            multiple/>
                                    </Col>
                                    <Col md="5 text-center mt-4 bg-warning rounded pt-2 ms-2">
                                        <p className={"d-inline"}>Slike imenovati u
                                            formatu: <b><i>šifra</i>_<i>tipProizvoda</i></b> npr: [020_Podsuknja.jpg]
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="opis">
                                        <Form.Label>Opis:</Form.Label>
                                        <Form.Control as="textarea" defaultValue=" " required/>
                                    </Form.Group>
                                </Row>
                                <Button type="submit">Dodaj proizvod</Button>
                            </form>
                            {
                                badSubmit &&
                                <p className='h4 text-center text-danger'>{`Nepravilan unos podataka! ${badSubmitDesc}`}</p>
                            }
                            <p className='text-center h4 mb-5'>Brisanje proizvoda</p>
                            <Row className='mb-4'>
                                <Col md='4 mt-3'></Col>
                                <Col md='4 mt-3'>
                                    <input className='w-100 mt-1' type='text' id='pretraga'/>
                                </Col>
                                <Col md='4 mt-3 text-center'>
                                    <Button className='mx-2' type='button'
                                            onClick={() => setSearch(`&searchTerm=${document.getElementById('pretraga').value}`)}>Pretraži</Button>
                                    <Button className='mx-2' type='button' onClick={() => setSearch('')}>Otkaži
                                        pretragu</Button>
                                </Col>
                            </Row>
                            <Row>
                                <div className='product-list-nav mx-auto'>
                                    <Row className='bg-masa text-center'>
                                        <Col md='1' className='pt-3 p-0 col-2'>
                                            <p>{`ID`}</p>
                                        </Col>
                                        <Col md='3' className='pt-3 p-0 col-2'>
                                            <p>{`NAZIV`}</p>
                                        </Col>
                                        <Col md='2' className='pt-3 p-0 col-2'>
                                            <p>{`BREND`}</p>
                                        </Col>
                                        <Col md='2' className='pt-3 p-0 col-3'>
                                            <p>{`KATEGORIJA`}</p>
                                        </Col>
                                        <Col md='2' className='pt-3 p-0 col-3'>
                                            <p>{`IZMENA`}</p>
                                        </Col>
                                        <Col md='2' className='pt-3 p-0 col-3'>
                                            <p>{`BRISANJE`}</p>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='product-list mx-auto'>
                                    {
                                        proizvodi && proizvodi.proizvodi.map((proizvod) => {
                                            return (
                                                <>
                                                    <Row className='text-center border-bottom-black'>
                                                        <Col md='1' className='pt-3 p-0 col-2'>
                                                            <p>{`${proizvod.id}`}</p>
                                                        </Col>
                                                        <Col md='3' className='pt-3 p-0 col-2'>
                                                            <p>{`${proizvod.naziv}`}</p>
                                                        </Col>
                                                        <Col md='2' className='pt-3 p-0 col-2'>
                                                            <p>{`${proizvod.brend}`}</p>
                                                        </Col>
                                                        <Col md='2' className='pt-3 p-0 col-3'>
                                                            <p>{`${proizvod.kategorija}`}</p>
                                                        </Col>
                                                        <Col md='2' className='pt-2 p-0 col-3'>
                                                            <Button
                                                                variant="info"
                                                                onClick={() => {
                                                                    history.push('/edit-product', {state: proizvod.id})
                                                                }}>
                                                                Izmeni
                                                            </Button>
                                                        </Col>
                                                        <Col md='2' className='pt-2 p-0 col-3'>
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => {
                                                                    setItem(proizvod);
                                                                    setShowPopup(true);
                                                                }}>
                                                                Obriši
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </>
                                            );
                                        })
                                    }
                                </div>
                            </Row>
                        </Container>
                    </div> :
                    <p className='text-center h4 mt-20'>Molimo ulogujte se <a href="" className="link"
                                                                              onClick={() => history.push('/admin')}>ovde</a>
                    </p>
            }
        </>
    );
}

export default AddProductPage;
