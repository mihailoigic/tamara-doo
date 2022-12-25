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
import {addToCart, removeUnderline, scrollToTop} from "../../../utilities/util";
import DubinaKorpe from "../../components/returnDubinuKorpe";
import Button from 'react-bootstrap/Button';

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
    const [kolicina, setKolicina] = useState(1);
    const [boja, setBoja] = useState(null);
    const [velicina, setVelicina] = useState(null);
    const [dubinaKorpe, setDubinaKorpe] = useState(null);
    const [defaultSlika, setDefaultSlika] = useState(proizvod?.defaultSlika);
    const [showPopup, setShowPopup] = useState(false);
    const [isDiscountActive, setIsDiscountActive] = useState(false);

    useEffect(() => {
        scrollToTop();
        const editItem = JSON.parse(localStorage.getItem("editItem"));
        if (editItem) {
            setVelicina(editItem.velicina);
            setKolicina(editItem.kolicina);
            setBoja(editItem.boja);
            if (editItem.dubinaKorpe) {
                setDubinaKorpe(editItem.dubinaKorpe);
            }
            setTimeout(() => {
                localStorage.setItem('editItem', null);
            }, 1000)
        }
    }, [])


    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/proizvod/${id}`)
            .then(res => {
                setProizvod(res.data.data);
                setpodTipValue(isKorpaOrCarapa(res.data.data.podtip))
                setDefaultSlika(res.data.data.defaultSlika);
                setTip(res.data.data.tip === undefined ? "" : res.data.data.tip);
                const editItem = JSON.parse(localStorage.getItem("editItem"));
                if (!editItem) {
                    setBoja(res.data.data?.boje[0]);
                    setVelicina(res.data.data.velicine[0]);
                }
            })

    }, [id]);


    function calculatePrice() {
        let price = proizvod.cena;
        if (proizvod.discounts.length > 0) {
            proizvod.discounts.forEach(discount => {
                price -= proizvod.cena * discount.procenat;
            })
            return price;
        }
    }

    function handleChangeKolicina(event) {
        setKolicina(event.target.value);
    }

    function getPhotosByColor(color) {
        const filtered = proizvod?.slike.filter((slika) => slika.includes(color));
        if (filtered && filtered.length > 0) {
            return filtered;
        }
        return proizvod?.slike;
    }

    return (
        <>
            {
                showPopup &&
                <>
                    <div className='background-popup'/>
                    <div className='popup-delete text-center p-4'>
                        <p className='h5'>Proizvod je dodat u korpu!</p>
                        <p>Klikom na korpu u gornjem desnom uglu mozete videte sve dodate proizvode</p>
                        <Button className='me-3'
                                onClick={() => setShowPopup(false)}>Ok</Button>
                    </div>
                </>
            }
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
                                            getPhotosByColor(boja).map((slika) => {
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
                                        <img
                                            className="product-overview-img rounded-3"
                                            src={process.env.PUBLIC_URL + `/Imgs/${defaultSlika}`}
                                            alt="slider-photo"
                                        />
                                </Col>
                                <Col xs='12' md='2' className='d-block d-md-none p-0 text-center'>
                                    <Row>
                                        {
                                            proizvod !== null ?
                                                getPhotosByColor(boja).map((slika) => {
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
                                                <DubinaKorpe nameOfClass='size-item cursor-pointer'
                                                             dubinaKorpe={dubinaKorpe} setDubinaKorpe={setDubinaKorpe}
                                                             product={proizvod}/>
                                            </Col>
                                        }
                                        <Col md='12'>
                                            <p className='mt-3 mb-2'>Veličine :</p>
                                            <Velicine nameOfClass='size-item cursor-pointer' product={proizvod}
                                                      velicina={velicina} setVelicina={setVelicina}
                                                      floatEnd={false} isProductOverview={true}/></Col>
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
                                            <Boje
                                                nameOfClass='color-item cursor-pointer'
                                                boja={boja}
                                                setBoja={setBoja}
                                                product={proizvod}
                                                imgClass='rounded-3'
                                                showName={true}
                                                floatEnd={false}
                                                getPhotosByColor={getPhotosByColor}
                                                setDefaultSlika={setDefaultSlika}/>
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
                                    <p className="mt-2 mb-0">Kolicina:</p>
                                    <input className="me-2 mt-1 kolicina-input" defaultValue={kolicina}
                                           onChange={handleChangeKolicina}/>
                                    <p className='mt-3 mb-0 text-22 me-5 pe-5'>Cena : {calculatePrice() ? <><del>{proizvod.cena}</del> {calculatePrice()}</> : <>{proizvod.cena}</>} <span
                                        className={'text-15'}>RSD</span></p>
                                    <div className="buy-btn text-center py-2 mt-2 justify-content-center mx-auto"
                                         onClick={() => {
                                             addToCart({
                                                 proizvod: proizvod,
                                                 kolicina: kolicina,
                                                 dubinaKorpe: dubinaKorpe,
                                                 velicina: velicina,
                                                 boja: boja
                                             });
                                             setShowPopup(true);
                                             scrollToTop();
                                         }}>Dodaj u korpu
                                    </div>
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
