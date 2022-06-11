import React, {useEffect, useState} from "react";
import '../../../assets/css/styles.css';
import Container from 'react-bootstrap/Container';
import Header from "../../components/header";
import {
    useLocation
} from "react-router-dom";
import {prepareForSelect, scrollToTop} from "../../../utilities/util";
import axios from "axios";
import Config from "../../../config/config";
import {useParams} from "react-router-dom";
import history from "../../../utilities/history";
import Select from "react-select";
import filtersData from "../../../data/filtersData";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditProduct() {
    const [renderPage, setRenderPage] = useState(false);
    const {id} = useParams();
    const [proizvod, setProizvod] = useState(null);
    const [tip, setTip] = useState("");
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
        const naziv = event.currentTarget.naziv.value;
        const opis = event.currentTarget.opis.value;
        const slike = getPicturesNames(document.getElementById('slike').files);

        axios.put(`${Config.api.baseUrl}v1/izmeni-proizvod/${proizvod.id}`, { naziv: naziv, opis: opis, slike: slike }, {
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("Uspesno izmenjen proizvod!");
                } else {
                    alert("Neuspesno izmenjen proizvod!");

                }
                window.location.reload();
            });
    };

    function getPicturesNames(pictures) {
        let picturesArray = [];
        if (pictures.length > 0) {
            for (var i = 0; i < pictures.length; i++) {
                picturesArray.push(pictures[i].name);
            }
        }
        return picturesArray;
    }

    return (
        <>
            <Header/>
            {
                renderPage && proizvod ?
                    <Container className="mt-5">
                        <form onSubmit={handleSubmit} className="mb-5">
                            <Row className="mb-3">
                                {/*<Col md="2">*/}
                                {/*    <Form.Label>Brend:</Form.Label>*/}
                                {/*    <Select*/}
                                {/*        name="brend"*/}
                                {/*        options={apiBrands}*/}
                                {/*        className="basic-select"*/}
                                {/*        placeholder="Izaberi.."*/}
                                {/*        required={true}*/}
                                {/*    />*/}
                                {/*</Col>*/}
                                <Form.Group as={Col} md="2" controlId="naziv">
                                    <Form.Label>Naziv:</Form.Label>
                                    <Form.Control
                                        defaultValue={proizvod.naziv}
                                        required
                                        type="text"
                                        placeholder="Naziv"
                                    />
                                </Form.Group>
                                {/*<Form.Group as={Col} md="2" controlId="rod">*/}
                                {/*    <Form.Label>Pol:</Form.Label>*/}
                                {/*    <Form.Select aria-label="Default select example" onChange={onChangePol}>*/}
                                {/*        <option key={1} value='zenski'>Ženski</option>*/}
                                {/*        <option key={2} value='muski'>Muški</option>*/}
                                {/*        /!*<option key={3} value='zenski'>UNISEX</option>*!/*/}
                                {/*    </Form.Select>*/}
                                {/*</Form.Group>*/}
                                {/*<Col md="2">*/}
                                {/*    <Form.Label>Kategorija:</Form.Label>*/}
                                {/*    <Select*/}
                                {/*        name="kategorija"*/}
                                {/*        options={apiCategories}*/}
                                {/*        className="basic-select"*/}
                                {/*        placeholder="Izaberi.."*/}
                                {/*        classNamePrefix="Izaberi.."*/}
                                {/*        onChange={onChange}*/}
                                {/*    />*/}
                                {/*</Col>*/}
                                {/*<Col md="2">*/}
                                {/*    <Form.Label>Tip:</Form.Label>*/}
                                {/*    <Select*/}
                                {/*        name="tip"*/}
                                {/*        options={apiCategories?.find(item => {*/}
                                {/*            return item.value === category*/}
                                {/*        })?.tip}*/}
                                {/*        className="basic-select"*/}
                                {/*        placeholder="Izaberi.."*/}
                                {/*        classNamePrefix="Izaberi.."*/}
                                {/*    />*/}
                                {/*</Col>*/}
                                {/*<Col md="2">*/}
                                {/*    <Form.Label>Podtip:</Form.Label>*/}
                                {/*    <Select*/}
                                {/*        isMulti*/}
                                {/*        name="podtip"*/}
                                {/*        options={filtersData.filters.woman.categories.find(item => {*/}
                                {/*            return item.value === category*/}
                                {/*        })?.subTypes}*/}
                                {/*        className="basic-select"*/}
                                {/*        placeholder="Izaberi.."*/}
                                {/*    />*/}
                                {/*</Col>*/}
                            </Row>
                            <Row className="mb-3">
                                {/*<Col md="4">*/}
                                {/*    <Form.Label>Veličine:</Form.Label>*/}
                                {/*    <Select*/}
                                {/*        isMulti*/}
                                {/*        name="velicina"*/}
                                {/*        options={apiSizes}*/}
                                {/*        // options={filtersData.filters.sizes.find(item => {*/}
                                {/*        //     return item.id === category*/}
                                {/*        // })?.options}*/}
                                {/*        className="basic-multi-select"*/}
                                {/*        placeholder="Izaberi.."*/}
                                {/*    />*/}
                                {/*</Col>*/}
                                {/*<Col md="4">*/}
                                {/*    <Form.Label>Boje:</Form.Label>*/}
                                {/*    <Select*/}
                                {/*        isMulti*/}
                                {/*        name="boja"*/}
                                {/*        options={apiColors}*/}
                                {/*        className="basic-multi-select"*/}
                                {/*        placeholder="Izaberi.."*/}
                                {/*    />*/}
                                {/*</Col>*/}
                                {/*<Form.Group as={Col} md="2" controlId="novo">*/}
                                {/*    <Form.Label>Novo:</Form.Label>*/}
                                {/*    <Form.Select aria-label="Default select example">*/}
                                {/*        <option key={1} value='Da'>Da</option>*/}
                                {/*        <option key={2} value='Ne'>Ne</option>*/}
                                {/*    </Form.Select>*/}
                                {/*</Form.Group>*/}
                                {/*<Form.Group as={Col} md="2" controlId="moda">*/}
                                {/*    <Form.Label>Moda:</Form.Label>*/}
                                {/*    <Form.Select aria-label="Default select example">*/}
                                {/*        <option key={1}>Da</option>*/}
                                {/*        <option key={2}>Ne</option>*/}
                                {/*    </Form.Select>*/}
                                {/*</Form.Group>*/}
                                {/*<Form.Group as={Col} md="2" controlId="cena">*/}
                                {/*    <Form.Label>Cena:</Form.Label>*/}
                                {/*    <Form.Control*/}
                                {/*        required*/}
                                {/*        type="text"*/}
                                {/*        placeholder="3000"*/}
                                {/*    />*/}
                                {/*</Form.Group>*/}
                                <Col md="2">
                                    <input
                                        className="mt-3 pt-3"
                                        type="file"
                                        id="slike"
                                        name="slike"
                                        multiple/>
                                </Col>
                                {/*<Col md="5 text-center mt-4 bg-warning rounded pt-2 ms-2">*/}
                                {/*    <p className={"d-inline"}>Slike imenovati u*/}
                                {/*        formatu: <b><i>šifra</i>_<i>tipProizvoda</i></b> npr: [020_Podsuknja.jpg]*/}
                                {/*    </p>*/}
                                {/*</Col>*/}
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="opis">
                                    <Form.Label>Opis:</Form.Label>
                                    <Form.Control as="textarea" defaultValue={proizvod.opis} required/>
                                </Form.Group>
                            </Row>
                            <Button type="submit">Izmeni proizvod</Button>
                        </form>
                    </Container> :
                    <p className='text-center h4 mt-20'>Molimo ulogujte se <a href="" className="link"
                                                                              onClick={() => history.push('/admin')}>ovde</a>
                    </p>
            }
        </>
    );
}

export default EditProduct;
