import React, {useState} from "react";
import '../../../assets/css/styles.css';
import './css/index.css';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import product from "../../../data/product";

function ProductOverviewPage() {
    const [defaultSlika, setDefaultSlika] = useState(product.defaultSlika);
    return (
        <>
            <Header/>
            <Container className='product-overview'>
                <Row>
                    <Col xs='6' md='2' className='p-0'>
                        <img
                            className='img-item float-end mb-3 p-0'
                            src={process.env.PUBLIC_URL + `/Imgs/${product.defaultSlika}.jpg`}
                            alt={product.defaultSlika}
                            onClick={() => setDefaultSlika(product.defaultSlika)}
                        />
                        {
                            product.slike.map((slika) => {
                                return (
                                    <img
                                        className='img-item float-end mb-3 p-0'
                                        src={process.env.PUBLIC_URL + `/Imgs/${slika}.jpg`}
                                        alt={slika}
                                        onClick={() => setDefaultSlika(slika)}
                                    />
                                );
                            })
                        }
                    </Col>
                    <Col xs='6' md='4'>
                        <div className='img-hover-zoom'>
                            <img
                                className="product-overview-img float-end me-5"
                                src={process.env.PUBLIC_URL + `/Imgs/${defaultSlika}.jpg`}
                                alt="slider-photo"
                            />
                        </div>
                    </Col>
                    <Col xs='12' md='6' className='float-start'>
                        <p className="h5">{`${product.rod.toUpperCase()} ${product.kategorija.toUpperCase()} ${product.tip.toUpperCase()} ${product.naziv.toUpperCase()}`}</p>
                        <p className='mt-3 mb-0'>Brend: {product.brend}</p>
                        <p className='mt-3 mb-0'>Veličine:</p>
                        <ul className='d-inline-block'>
                            {
                                product.velicine.map((velicina) => {
                                    return (
                                        <li className='size-item'><p className='text-center pt-1'>{velicina}</p></li>
                                    );
                                })
                            }
                        </ul>
                        <p className='mt-3 mb-0'>Boje:</p>
                        <ul className='d-inline-block'>
                            {
                                product.boje.map((boja) => {
                                    return (
                                        <li className='color-item'>
                                            <img
                                                src={process.env.PUBLIC_URL + `/Imgs/${boja}.jpg`}
                                                alt={boja}
                                            /></li>
                                    );
                                })
                            }
                        </ul>
                        <p className='mt-3 mb-0'>Moda: {product.moda ? 'Da' : 'Ne'}</p>
                        <p className='mt-3 mb-0'>Novo: {product.novo ? ' Da' : 'Ne'}</p>
                        <p className='mt-3 mb-0'>Opis: {product.opis}</p>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default ProductOverviewPage;
