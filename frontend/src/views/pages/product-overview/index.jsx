import React, { useState } from "react";
import '../../../assets/css/styles.css';
import './css/index.css';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import product from "../../../data/product";
import Boje from "../../components/returnBoje";
import Velicine from "../../components/returnVelicine";

function ProductOverviewPage() {
    const [defaultSlika, setDefaultSlika] = useState(product.defaultSlika);
    const [backgroundPosition, setBackgroundPosition] = useState({
        backgroundImage: `url(${process.env.PUBLIC_URL + `/Imgs/${defaultSlika}.jpg`})`,
        backgroundPosition: '0% 0%'
    });

    const handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        setBackgroundPosition({
            backgroundImage: `url(${process.env.PUBLIC_URL + `/Imgs/${defaultSlika}.jpg`})`,
            backgroundPosition: `${x}% ${y}%`
        });
    }
    return (
        <>
            <Header/>
            <Container className='product-overview'>
                <Row>
                    <Col xs='6' md='2' className='p-0'>
                        {
                            product.slike.map((slika) => {
                                return (
                                    <img
                                        className='img-item float-end mb-3 p-0'
                                        src={process.env.PUBLIC_URL + `/Imgs/${slika}.jpg`}
                                        alt={slika}
                                        onClick={() => {
                                            setDefaultSlika(slika);
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth"
                                            });
                                        }}
                                    />
                                );
                            })
                        }
                    </Col>
                    <Col xs='6' md='4'>
                        <figure className='ms-5' onMouseMove={(e)=>handleMouseMove(e)} style={backgroundPosition}>
                            <img
                                className="product-overview-img"
                                src={process.env.PUBLIC_URL + `/Imgs/${defaultSlika}.jpg`}
                                alt="slider-photo"
                            />
                        </figure>
                    </Col>
                    <Col xs='12' md='6' className='float-start'>
                        <p className="h5">{`${product.rod.toUpperCase()} ${product.kategorija.toUpperCase()} ${product.tip.toUpperCase()} ${product.naziv.toUpperCase()}`}</p>
                        <p className='mt-3 mb-0'>Brend: {product.brend}</p>
                        <p className='mt-3 mb-0'>Veličine:</p>
                        <Velicine nameOfClass='size-item' product={product} />
                        <p className='mt-3 mb-0'>Boje:</p>
                        <Boje nameOfClass='color-item' product={product} />

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
