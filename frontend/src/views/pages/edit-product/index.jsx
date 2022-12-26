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

function EditProduct() {
    const [renderPage, setRenderPage] = useState(false);
    const {id} = useParams();
    const [proizvod, setProizvod] = useState(null);
    const [tip, setTip] = useState("");
    const [component, setComponent] = useState(null);
    const [apiSizes, setApiSizes] = useState(null);
    const [apiColors, setApiColors] = useState(null);
    const [slike, setSlike] = useState([]);
    let location = useLocation();

    useEffect(() => {
        scrollToTop();
        axios.get(`${Config.api.baseUrl}v1/auth/login`, {
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        }).then(res => {
            setRenderPage(res.status === 200);
        })

        axios.get(`${Config.api.baseUrl}v1/velicine`)
            .then(res => {
                setApiSizes(prepareForSelect(res.data.data));
            })
        axios.get(`${Config.api.baseUrl}v1/boje`)
            .then(res => {
                setApiColors(prepareForSelect(res.data.data));
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
                setSlike(res.data.data.slike);
            })

    }, [component]);

    const handleDeleteDiscount = (id) => {
        axios.delete(`${Config.api.baseUrl}v1/add-discount/${id}`, {
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("Uspesno obrisan popust!");
                } else {
                    alert("Neuspesno obrisan popust!");

                }
                window.location.reload();
            });
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        const cena = Number(event.currentTarget.cena.value);
        const boje = getValueFromMultiSelect(event.currentTarget.boja);
        const velicine = getValueFromMultiSelect(event.currentTarget.velicina);
        const naziv = event.currentTarget.naziv.value;
        const opis = event.currentTarget.opis.value;
        const formatedSlike = slike;

        axios.put(`${Config.api.baseUrl}v1/izmeni-proizvod/${proizvod.id}`, { naziv: naziv, opis: opis, slike: formatedSlike, boje: boje, velicine: velicine, cena: cena }, {
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

    function deletePhoto(slika) {
        const slikeNiz = slike.filter((s) => s !== slika);
        setSlike(slikeNiz);
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
                                <Col md="4">
                                    <Form.Label>Veličine:</Form.Label>
                                    <Select
                                        defaultValue={prepareValuesForSelect(proizvod.velicine, apiSizes)}
                                        isMulti
                                        name="velicina"
                                        options={apiSizes}
                                        // options={filtersData.filters.sizes.find(item => {
                                        //     return item.id === category
                                        // })?.options}
                                        className="basic-multi-select"
                                        placeholder="Izaberi.."
                                    />
                                </Col>
                                <Col md="4">
                                    <Form.Label>Boje:</Form.Label>
                                    <Select
                                        defaultValue={prepareValuesForSelect(proizvod.boje, apiColors)}
                                        isMulti
                                        name="boja"
                                        options={apiColors}
                                        className="basic-multi-select"
                                        placeholder="Izaberi.."
                                    />
                                </Col>
                                <Form.Group as={Col} md="2" controlId="cena">
                                    <Form.Label>Cena:</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="3000"
                                        defaultValue={proizvod.cena}
                                    />
                                </Form.Group>
                            <div className='d-flex'>
                                {
                                    slike && slike.map((slika) => {
                                        return(
                                                <div className='mx-2'>
                                                    <IoCloseSharp onClick={()=>deletePhoto(slika)} className='cursor-pointer'/>
                                                    <img
                                                        className="cart-item-img rounded-3 m-3"
                                                        src={process.env.PUBLIC_URL + `/Imgs/${slika}`}
                                                        alt="slider-photo"
                                                    />
                                                </div>
                                        );
                                    })
                                }
                            </div>
                                <Row className="mb-3">
                                <Col md="2">
                                    <input
                                        onChange={(event)=> {
                                            const slikeArray = slike;
                                            setSlike(slikeArray.concat(getPicturesNames(document.getElementById('slike').files)))
                                        }}
                                        className="mt-3 pt-3"
                                        type="file"
                                        id="slike"
                                        name="slike"
                                        multiple
                                        accept="image/*"/>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="opis">
                                    <Form.Label>Opis:</Form.Label>
                                    <Form.Control as="textarea" defaultValue={proizvod.opis} required/>
                                </Form.Group>
                            </Row>
                            <Button type="submit">Izmeni proizvod</Button>
                        </form>
                        <hr/>
                        <div className='mt-3'>
                            <p>Popusti:</p>
                            {
                                proizvod.discountOne?.map(item => {
                                    return(
                                        <div>
                                            <p className='d-inline-block me-3'>{item.procenat}</p><Button className='d-inline-block' onClick={()=>handleDeleteDiscount(item.id)}>Izbrisi popust</Button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Container> :
                    <p className='text-center h4 mt-20'>Molimo ulogujte se <a href="" className="link"
                                                                              onClick={() => history.push('/admin')}>ovde</a>
                    </p>
            }
        </>
    );
}

export default EditProduct;
