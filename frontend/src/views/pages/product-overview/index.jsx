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
import {removeUnderline, scrollToTop} from "../../../utilities/util";
import DubinaKorpe from "../../components/returnDubinuKorpe";

function isKorpaOrCarapa(niz) {
    if (niz.includes('B'))
        return 'Dubina Korpe :';
    if (niz.includes('C'))
        return 'Dubina Korpe :';
    if (niz.includes('D'))
        return 'Dubina Korpe :';
    if (niz.includes('E'))
        return 'Dubina Korpe :';
    if (niz.includes('F'))
        return 'Dubina Korpe :';
    return 'Denaža :';
}

function ProductOverviewPage() {
    const {id} = useParams();
    const [proizvod, setProizvod] = useState(null);
    const [tip, setTip] = useState("");
    const [podtipValue, setpodTipValue] = useState("Dubina korpe :");

    useEffect(() => {
        scrollToTop();
    }, [])


    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/proizvod/${id}`)
            .then(res => {
                setProizvod(res.data.data);
                setpodTipValue(isKorpaOrCarapa(res.data.data.podtip))
                setDefaultSlika(res.data.data.defaultSlika);
                setTip(res.data.data.tip === undefined ? "" : res.data.data.tip);
            })
    }, [id]);

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
                        <Container className='product-overview mt-5 pt-5 pt-md-0'>
                            <div className='cursor-pointer d-none d-md-block' onClick={() => history.goBack()}>
                                <IoArrowBackCircleSharp className='back-button'/><p
                                className='d-inline-block nazad'>Nazad</p>
                            </div>
                            <Row>
                                <Col xs='12' md='2' className='d-none d-md-block p-0 text-center'>
                                    {
                                        proizvod !== null ?
                                            proizvod?.slike.map((slika) => {
                                                return (
                                                    <img
                                                        className={slika === defaultSlika ? 'active img-item mb-3 mx-auto rounded-3 p-0' : 'img-item mb-3 mx-auto rounded-3 p-0'}
                                                        src={process.env.PUBLIC_URL + `/Imgs/${removeUnderline(slika)}`}
                                                        alt={slika}
                                                        onMouseEnter={() => setDefaultSlika(slika)}
                                                        onClick={() => {
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
                                <Col xs='12' md='4'>
                                    <figure onMouseMove={(e) => handleMouseMove(e)} style={backgroundPosition}>
                                        <img
                                            className="product-overview-img rounded-3"
                                            src={process.env.PUBLIC_URL + `/Imgs/${defaultSlika}`}
                                            alt="slider-photo"
                                        />
                                    </figure>
                                </Col>
                                <Col xs='12' md='2' className='d-block d-md-none p-0 text-center'>
                                    <Row>
                                        {
                                            proizvod !== null ?
                                                proizvod?.slike.map((slika) => {
                                                    return (
                                                        <Col xs='6'>
                                                            <img
                                                                className={slika === defaultSlika ? 'active img-item mb-3 mx-auto rounded-3 p-0' : 'img-item mb-3 mx-auto rounded-3 p-0'}
                                                                src={process.env.PUBLIC_URL + `/Imgs/${slika}`}
                                                                alt={slika}
                                                                onClick={() => {
                                                                    setDefaultSlika(slika);
                                                                    window.scrollTo({
                                                                        top: 0,
                                                                        behavior: "smooth"
                                                                    });
                                                                }}
                                                            /></Col>
                                                    );
                                                }) : null
                                        }
                                    </Row>
                                </Col>
                                <Col xl='6' className='ps-5'>
                                    <Row className='me-md-5 pe-md-5'>
                                        <Col md='12'><p
                                            className="h4 fw-bold">{`${proizvod.kategorija.toUpperCase()} ${tip.toUpperCase()} ${proizvod.naziv.toUpperCase()}`}</p>
                                        </Col>
                                        <div className='mt-3 hr'/>
                                        <Col md='12'>
                                            <p className='mt-3 mb-0'>Brend : {proizvod.brend.toUpperCase()}</p>
                                        </Col>
                                        {
                                            proizvod.podtip[0] &&
                                            <Col md='12'>
                                                <p className='mt-3 mb-2 d-inline-block'>{podtipValue}</p>
                                            </Col>
                                        }
                                        {
                                            proizvod.podtip[0] && proizvod.podtip.length >= 1 &&
                                            <Col md='12'>
                                                <DubinaKorpe nameOfClass='size-item' product={proizvod}/>
                                            </Col>
                                        }
                                        <Col md='12'>
                                            <p className='mt-3 mb-2'>Veličine :</p>
                                            <Velicine nameOfClass='size-item' product={proizvod} floatEnd={false}/></Col>
                                        <Col md='12'>
                                            <ul>
                                                <li className='d-inline-block'>
                                                    <p className='mt-3 mb-0'>Stil
                                                        : {proizvod.moda ? 'Moda' : 'Klasika'}</p>
                                                </li>
                                                {/*<li className='d-inline-block'>*/}
                                                {/*    <p className='ps-5 mt-3 mb-0'>Novo : {proizvod.novo ? ' DA' : 'NE'}</p>*/}
                                                {/*</li>*/}
                                            </ul>
                                        </Col>
                                        <Col md='12'>
                                            <p className='mt-3 mb-2'>Boje :</p>
                                            <Boje nameOfClass='color-item' product={proizvod} imgClass='rounded-3' showName={true} floatEnd={false}/>
                                        </Col>
                                        <div className='mt-3 hr'/>
                                    </Row>

                                    {
                                        proizvod.opis !== ' ' &&
                                        <p className='mt-3 mb-0 text-justify'>Opis : {
                                            proizvod.opis.split('\n').map((item) => {
                                                return (
                                                    <p className='mb-0'>{item}</p>
                                                );
                                            })
                                        }</p>
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
