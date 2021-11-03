import React from "react";
import '../../assets/css/styles.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import facebookIcon from '../../assets/img/facebook-icon.svg';
import instagramIcon from '../../assets/img/instagram-icon.svg';
import twitterIcon from '../../assets/img/twitter-icon.svg';
import labels from '../../language/srb';
import history from '../../utilities/history';


export default function Footer() {
    return (
        <>
            <Container fluid>
                <div className="pt-5 text-center">
                    <p className="h3 pb-4 ff-vogue">Budi u toku sa novim kolekcijama, sezonskim specijalima i promocijama.</p>
                    <Form>
                        <Form.Control className="w-30 mb-3" type="email" placeholder="Unesite svoju email adresu" />
                        <Button variant="primary">PRIJAVI ME</Button>
                    </Form>
                </div>
            </ Container>
            <Container fluid className="footer-container pt-5 mt-5">
                <Row className="text-center justify-content-md-center mt-3 mb-3 p-0">
                    <Col xs lg="1" >
                        <a href="https://www.facebook.com/tamaradoo.bgd/">
                        <Image className="px40" src={facebookIcon} />
                        </a>
                    </Col>
                    <Col xs lg="1">
                        <a href="https://www.instagram.com/tamara.intimomoda/?hl=sr">
                        <Image className="px40" src={instagramIcon} />
                        </a>
                    </Col>
                    <Col xs lg="1">
                        <a href="https://twitter.com/home">
                        <Image className="px40" src={twitterIcon} />
                        </a>
                    </Col>
                </Row>
                <Row className="text-center justify-content-md-center pb-3">
                    <Col xs lg="1" className="p-0">
                        <p className="footer-item border-right-black" onClick={() => history.push('/home')}>{labels.home}</p>
                    </Col>
                    <Col xs lg="1" className="p-0">
                        <p className="footer-item border-right-black" onClick={() => history.push('/about-us')}>{labels.aboutUs}</p>
                    </Col>
                    <Col xs lg="1" className="p-0">
                        <p className="footer-item" onClick={() => history.push('/contact')}>{labels.contact}</p>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="footer-lower text-center">
                <p className="pt-2">&copy;Tamara d.o.o. | All rights reserved</p>
            </Container>
        </>
    );
}