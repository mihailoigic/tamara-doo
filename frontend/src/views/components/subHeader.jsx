import React from "react";
import '../../assets/css/styles.css';
import labels from '../../language/srb';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SubHeader(props) {
    return (
        <div className="sub-header">
            <Container fluid className="sub-header-title">
                <p className="h4 ps-3 pt-3">{props.gender}</p>
            </Container>
            <Container fluid className="header-on-mouse-hover">
                <Row>
                    <Col />
                    <Col />
                    <Col className="type-column type-column-border-right">
                        <ul className="type-items">
                            <li className="type-item bold-arial">
                                <p className="h6">DONJI VEŠ</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Brushalteri</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Gaćice</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Majice</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Bodi</p>
                            </li>
                        </ul>
                    </Col>
                    <Col className="type-column type-column-border-right">
                        <ul className="type-items">
                            <li className="type-item bold-arial">
                                <p className="h6">SPAVAĆI PROGRAM</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Pidžame</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Spavaćice</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Bademantili</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Maska za spavanje</p>
                            </li>
                        </ul>
                    </Col>
                    <Col className="type-column type-column-border-right">
                        <ul className="type-items">
                            <li className="type-item bold-arial">
                                <p className="h6">KLASIKA</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Gaćice</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Brushalteri</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Majice</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Bodi</p>
                            </li>
                        </ul>
                    </Col>
                    <Col className="type-column">
                        <ul className="type-items">
                            <li className="type-item bold-arial">
                                <p className="h6">KUPAĆI KOSTIMI</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Jednodelni kupaći</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Bikini kupaći</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Kupaći sa B korpom</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Kupaći sa C korpom</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Kupaći sa D korpom</p>
                            </li>
                            <li className="type-item">
                                <p className="h6">Donji deo</p>
                            </li>
                        </ul>
                    </Col>
                    <Col />
                    <Col />
                </Row>
            </Container>
        </div>
    );
}

export default SubHeader;

