import React, {useEffect, useState} from "react";
import '../../../assets/css/styles.css';
import './css/index.css';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Boje from "../../components/returnBoje";
import Velicine from "../../components/returnVelicine";
import axios from "axios";
import Config from "../../../config/config";
import {useParams} from "react-router-dom";
import Loader from "../../components/Loader";
import {IoArrowBackCircleSharp} from 'react-icons/io5';
import history from "../../../utilities/history";

function ProductOverviewPage() {
    const {id} = useParams();
    const [proizvod, setProizvod] = useState(null);

    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/proizvod/${id}`)
            .then(res=>{
                setProizvod(res.data.data);
                setDefaultSlika(res.data.data.defaultSlika)
            })
    },[id]);

    const [defaultSlika, setDefaultSlika] = useState(proizvod?.defaultSlika);
    const [backgroundPosition, setBackgroundPosition] = useState({
        backgroundImage: `url(${process.env.PUBLIC_URL + `/Imgs/${defaultSlika}`})`,
        backgroundPosition: '0% 0%'
    });

    const handleMouseMove = e => {
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        setBackgroundPosition({
            backgroundImage: `url(${process.env.PUBLIC_URL + `/Imgs/${defaultSlika}`})`,
            backgroundPosition: `${x}% ${y}%`
        });
    }
    return (
        <>
            {
                proizvod === null ? <Loader/> :
                    <>
                        <Header/>
                        <Container className='product-overview'>
                            <div className='cursor-pointer' onClick={()=> history.goBack()}>
                                <IoArrowBackCircleSharp className='back-button'/><p className='d-inline-block nazad'>Nazad</p>
                            </div>
                            <Row>
                                <Col xs='6' md='2' className='p-0 text-center'>
                                    {
                                        proizvod !== null ?
                                        proizvod?.slike.map((slika) => {
                                            return (
                                                <img
                                                    className={slika === defaultSlika ? 'active img-item mb-3 mx-auto rounded-3 p-0' : 'img-item mb-3 mx-auto rounded-3 p-0'}
                                                    src={process.env.PUBLIC_URL + `/Imgs/${slika}`}
                                                    alt={slika}
                                                    onMouseEnter={()=>setDefaultSlika(slika)}
                                                    onMouseLeave={()=>setDefaultSlika(proizvod.defaultSlika)}
                                                    onClick={() => {
                                                        setDefaultSlika(slika);
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: "smooth"
                                                        });
                                                    }}
                                                />
                                            );
                                        }) : null
                                    }
                                </Col>
                                <Col xs='6' md='4'>
                                    <figure onMouseMove={(e) => handleMouseMove(e)} style={backgroundPosition}>
                                        <img
                                            className="product-overview-img rounded-3"
                                            src={process.env.PUBLIC_URL + `/Imgs/${defaultSlika}`}
                                            alt="slider-photo"
                                        />
                                    </figure>
                                </Col>
                                <Col xs='12' md='6' className='float-start'>
                                    <p className="h4 fw-bold">{`${proizvod.rod.toUpperCase()} ${proizvod.kategorija.toUpperCase()} ${proizvod?.tip.toUpperCase()} ${proizvod.naziv.toUpperCase()}`}</p>
                                    <div className='mt-3 hr'/>
                                    <p className='mt-3 mb-0'>Brend : {proizvod.brend.toUpperCase()}</p>
                                    <p className='mt-3 mb-0'>Veličine :</p>
                                    <Velicine nameOfClass='size-item' product={proizvod}/>
                                    <ul>
                                        <li className='d-inline-block'>
                                            <p className='mt-3 mb-0'>Stil : {proizvod.moda ? 'Moda' : 'Klasika'}</p>
                                        </li>
                                        <li className='d-inline-block'>
                                            <p className='ps-5 mt-3 mb-0'>Novo : {proizvod.novo ? ' DA' : 'NE'}</p>
                                        </li>
                                    </ul>
                                    <p className='mt-3 mb-0'>Boje :</p>
                                    <Boje nameOfClass='color-item' product={proizvod} imgClass='rounded-3'
                                          showName={true}/>

                                    <div className='mt-3 hr'/>
                                    {
                                        proizvod.opis !== '' &&
                                        <p className='mt-3 mb-0 text-justify'>Opis : {proizvod.opis}</p>
                                    }
                                </Col>
                            </Row>
                        </Container>
                        <Footer/>
                    </>
            }

        </>
    );
}

export default ProductOverviewPage;
