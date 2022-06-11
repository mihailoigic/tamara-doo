import React, {useEffect} from "react";
import '../../../assets/css/styles.css';
import './css/styles.css';
import labels from '../../../language/srb';
import Container from 'react-bootstrap/Container';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {scrollToTop} from "../../../utilities/util";

function ContactPage() {

    useEffect(() => {
        scrollToTop();
    }, [])

    return (
        <>
            <Header />
            <Container className="mt-5 mt-20 pt-xs-5">
                <p className="h3 ff-releway mb-3">{labels.contact}</p>
                <Row>
                    <Col>
                        <div className="contact-info text-center">
                            <p className="h5 ff-arial pb-3 border-bottom-black">Preduzeće za unutrašnju i spoljnu trgovinu</p>
                            <p className="h5 ff-arial pb-3 pt-2 border-bottom-black">Veleprodaja donjeg veša, čarapa i kupaćih kostima</p>
                            <p className="h5 ff-arial pb-3 pt-2 border-bottom-black">YBC ul. Bulevar Mihajla Pupina 10D / II Jug N.P. 21, Novi Beograd</p>
                            <p className="h5 ff-arial pb-3 pt-2 border-bottom-black">Tel / Fax : Čarape : 011 / 2130 535, 311 0254</p>
                            <p className="h5 ff-arial pb-3 pt-2 border-bottom-black">Veš : 011 / 314 97 35, 313 9732, 2145 675</p>
                            <p className="h5 ff-arial pb-3 pt-2 border-bottom-black">(Veleprodaja) Radno vreme : Ponedeljak – Subota : 09h – 17h</p>
                            <p className="h5 ff-arial pb-3 pt-2 border-bottom-black">(Maloprodaja) Radno vreme : Ponedeljak – Petak : 09h – 20h : Subota : 09h - 16h</p>
                            <p className="h5 ff-arial mt-2 ">Email : tamara_doo@yahoo.com</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="text-center">
                            <iframe
                                className="map-size"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.942527271884!2d20.417937915751065!3d44.82273548403519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a656fbf1b5b45%3A0x6d686d786ea8b382!2sTamara%20d.o.o.%20-%20Veleprodaja%20italijanskog%20ve%C5%A1a%2C%20%C4%8Darapa%20i%20kupa%C4%87ih%20kostima!5e0!3m2!1ssr!2srs!4v1635188415419!5m2!1ssr!2srs"
                                allowfullscreen=""
                                loading="lazy" />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default ContactPage;
