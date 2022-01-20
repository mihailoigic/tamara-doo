import React, {useState} from "react";
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
import axios from "axios";
import Config from "../../config/config";

function handleOnSubmit(e) {
    e.preventDefault();
    axios.post(`${Config.api.baseUrl}v1/email-list`, {
        email: e.target.emailLista.value
    });
}

export default function Footer() {
    const [showSuccess, setShowSuccess] = useState(false);
    return (
        <>
            <Container fluid>
                <div className="pt-5 text-center">
                    <p className="h3 pb-4 ff-releway">Budi u toku sa novim kolekcijama, sezonskim specijalima i promocijama.</p>
                    <Form onSubmit={(e)=>handleOnSubmit(e)}>
                        <Form.Control name="emailLista" className="w-30 mb-3 sign-me-input" type="email" placeholder="Unesite svoju email adresu" />
                        {
                            showSuccess &&
                            <p className='text-success text-center mt-3 fw-bold'>Uspešno ste se prijavili na mailing listu!</p>
                        }
                        <Button type='submit' className="sign-me-btn" variant="primary" onClick={()=>setShowSuccess(true)}>PRIJAVI ME</Button>
                    </Form>
                </div>
            </ Container>
            <Container fluid className="footer-container pt-5 mt-5">
                <Row className="text-center justify-content-md-center mt-3 mb-3 p-0">
                    <Col xs lg="1" >
                        <a href="https://www.facebook.com/tamaradoo.bgd/">
                        <Image className="px40 mx-auto" src={facebookIcon} />
                        </a>
                    </Col>
                    <Col xs lg="1">
                        <a href="https://www.instagram.com/tamara.intimomoda/?hl=sr">
                        <Image className="px40 mx-auto" src={instagramIcon} />
                        </a>
                    </Col>
                    <Col xs lg="1">
                        <a href="https://twitter.com/home">
                        <Image className="px40 mx-auto" src={twitterIcon} />
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
