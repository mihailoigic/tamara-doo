import Footer from './footer';
import Header from './header';
import Slider from './slider/slider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../assets/css/styles.css';
import CenterMode from "./itemCarousel";
import history from "../../utilities/history";
import {useEffect} from "react";
import {scrollToTop} from "../../utilities/util";
import store from "../../app/store";
import {setPolSearchParams} from "../../app/store/searchParams/actions";

export default function Root() {

    useEffect(() => {
        scrollToTop();
    }, [])

    return (
        <>
            <Header />
            <Slider />
            <Container className='mt-1 mb-5' fluid>
                <Row>
                    <Col md='6 mt-3'>
                        <div className='gender-box mt-50-mobile cursor-pointer' onClick={() => {
                            history.push('/product-list');
                            store.dispatch(setPolSearchParams('zenski'));
                        }}>
                            <p className='gender-text ff-releway fs-3 fw-bold'>ŽENE</p>
                            <img
                                className='box-img'
                                src={process.env.PUBLIC_URL + `/Imgs/zene-box.jpg`}>
                            </img>
                        </div>
                    </Col>
                    <Col md='6 mt-3'>
                        <div className='gender-box cursor-pointer' onClick={() => {
                            history.push('/product-list');
                            store.dispatch(setPolSearchParams('muski'));
                        }}>
                            <img
                                className='box-img'
                                src={process.env.PUBLIC_URL + `/Imgs/muskarci-boxx.jpg`}>
                            </img>
                            <p className='gender-text ff-releway fs-3 fw-bold'>MUŠKARCI</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <p className='ff-releway fs-3 fw-bold text-center d-none d-md-block'>Najprodavaniji modeli</p>
            <Container className='my-5 d-none d-md-block'>
                <CenterMode />
            </Container>
            <Footer />
        </>
    );
}