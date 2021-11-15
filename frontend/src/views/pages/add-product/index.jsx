import React, {useEffect, useState} from "react";
import '../../../assets/css/styles.css';
import './css/index.css';
import labels from '../../../language/srb';
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

function AddProductPage() {
    const [category, setCategory] = useState(null);
    const [apiBrands, setApiBrands] = useState(null);
    const [pol, setPol] = useState('zenski');
    const [apiCategories, setApiCategories] = useState(null);

    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=${pol}`)
            .then(res=>{
                setApiCategories(res.data.data);
            })
        axios.get(`${Config.api.baseUrl}v1/brend`)
            .then(res=>{
                setApiBrands(res.data.data);
            })
    }, [pol]);

    function getDefaultSlika() {
        try {
            return document.getElementById('slika').files[0].name;
        }catch {
            alert('Niste dodali sliku!');
        }
    }

    function getPicturesNames(pictures) {
        let picturesArray = [];
        if (pictures.length>0) {
            for (var i=0;i<pictures.length;i++){
                picturesArray.push(pictures[i].name.split('.')[0]);
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

    function getValueFromMultiSelect(selectedOptions) {
        let options = [];
        if(selectedOptions.length !== undefined) {
            selectedOptions.forEach((option) => {
                options.push(option.value);
            })
        }
        return options;
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const product = {
                brend: event.currentTarget.brend.value,
                naziv: event.currentTarget.naziv.value,
                kategorija: event.currentTarget.kategorija.value,
                tip: event.currentTarget.tip.value,
                podtip: event.currentTarget.podtip.value,
                velicina: getValueFromMultiSelect(event.currentTarget.velicina),
                boja: getValueFromMultiSelect(event.currentTarget.boja),
                rod: event.currentTarget.rod.value === 'Ženski' ? 1 : 2,
                novo: event.currentTarget.novo.value === 'Da',
                moda: event.currentTarget.moda.value === 'Da',
                cena: event.currentTarget.cena.value,
                opis: event.currentTarget.opis.value,
                defaultSlika: getDefaultSlika(),
                slike: getPicturesNames(document.getElementById('slike').files),
            }
            console.log(product);
            alert('Uspesno dodat proizvod!');
        }
    };
    return (
        <>
            <Header/>
            <p className="mt-5 text-center h4">Dodavanje proizvoda u listu proizvoda</p>
            <Container className="mt-5 mb-5">
                <form onSubmit={handleSubmit} className="mb-5">
                    <Row className="mb-3">
                        <Col md="2">
                            <Form.Label>Brend:</Form.Label>
                            <Select
                                name="brend"
                                options={apiBrands}
                                className="basic-select"
                                placeholder="Izaberi.."
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
                                options={filtersData.filters.sizes.find(item => {
                                    return item.id === category
                                })?.options}
                                className="basic-multi-select"
                                placeholder="Izaberi.."
                            />
                        </Col>
                        <Col md="4">
                            <Form.Label>Boje:</Form.Label>
                            <Select
                                isMulti
                                name="boja"
                                options={filtersData.filters.colors}
                                className="basic-multi-select"
                                placeholder="Izaberi.."
                            />
                        </Col>
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
                        <Col md="2">
                            <input
                                className="mt-3 pt-3"
                                type="file"
                                id="slike"
                                name="slike"
                                multiple/>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="opis">
                            <Form.Label>Opis:</Form.Label>
                            <Form.Control type="text" defaultValue=" " required/>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Dodaj proizvod</Button>
                </form>
            </Container>
        </>
    );
}

export default AddProductPage;
