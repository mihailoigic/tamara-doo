import React, { useState } from "react";
import '../../assets/css/styles.css';
import labels from '../../language/srb';
import SubHeader from './subHeader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import history from '../../utilities/history';

function Header() {
    const [showWoman, setShowWoman] = useState(false);
    const [showMan, setShowMan] = useState(false);

    function handleMouseOver() {
        setShowWoman(true);
    }

    function handleMouseOut() {
        setTimeout(function(){ 
            setShowWoman(false);
        }, 3000);
    }

    return (
        <>
            <Container fluid className="header-container-lower" />
            <Container fluid className="header-container">
                <Row>
                    <Col>
                        <ul className="header-items-left text-center">
                            <li className="header-item" onClick={() => history.push('/product-list')} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{labels.woman}</li>
                            <li className="header-item" onClick={() => history.push('/product-list')} onMouseOver={handleMouseOver} >{labels.man}</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul className="header-items-middle">
                            <li className="logo-item" onClick={() => history.push('/home')}>{labels.tamara}</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul className="header-items-right text-center">
                            <li className="header-item" onClick={() => history.push('/about-us')}>{labels.aboutUs}</li>
                            <li className="header-item" onClick={() => history.push('/contact')}>{labels.contact}</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            {/* <Container fluid className="header-container-lower" /> */}
            {
                showWoman && <SubHeader gender={labels.woman}/>
            }

        </>
    );
}

export default Header;
