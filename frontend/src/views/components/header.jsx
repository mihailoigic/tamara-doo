import React, {useEffect, useState} from "react";
import '../../assets/css/styles.css';
import labels from '../../language/srb';
import SubHeader from './subHeader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import history from '../../utilities/history';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import Filter from "../product-list/filter";
import filtersData from "../../data/filtersData";

function Header(props) {
    const [showSubMenu, setShowSubMenu] = useState(false);

    return (
        <>
            <div className='header-desktop'>
                <Container fluid className="header-container">
                    <Row>
                        <Col>
                            <ul className="header-items-left ps-3">
                                <li className="logo-item" onClick={() => history.push('/home')}>{labels.tamara}</li>
                            </ul>
                        </Col>
                        <Col>
                            <ul className="header-items-middle">
                                <li className="header-item border-right-nav">
                                    <p
                                        className='mb-0'
                                        onClick={() => {
                                            history.push('/product-list', {pol: 'zenski'})
                                        }}>{labels.woman}</p>
                                    <div className='woman'><SubHeader gender={labels.woman}/></div>
                                </li>
                                <li
                                    className="header-item border-right-nav"

                                ><p
                                    className='mb-0'
                                    onClick={() => {
                                        history.push('/product-list', {pol: 'zenski'})
                                    }}>{labels.man}</p>
                                    <div className='man'><SubHeader gender={labels.man}/></div>
                                </li>
                                <li className="header-item border-right-nav"
                                    onClick={() => history.push('/about-us')}>{labels.aboutUs}</li>
                                <li className="header-item"
                                    onClick={() => history.push('/contact')}>{labels.contact}</li>
                            </ul>
                        </Col>
                        <Col>
                            <ul className="header-items-right text-center">

                            </ul>
                        </Col>
                    </Row>
                </Container>
                {/*<Container fluid className="header-container-lower" />*/}

            </div>
            <div className='header-mobile'>
                <Row>
                    <Col>
                        <AiOutlineMenu onClick={() => setShowSubMenu(!showSubMenu)} className='mt-3 ms-3 menu-icon'/>
                    </Col>
                    <Col>
                        <ul className="header-items-middle">
                            <li className="logo-item" onClick={() => history.push('/home')}>Tamara</li>
                        </ul>
                    </Col>
                    <Col/>
                </Row>
                <div className={showSubMenu ? 'mobile-sub-menu show' : 'mobile-sub-menu'}>
                    <Row>
                        <Col/>
                        <Col>
                            <ul className="header-items-middle">
                                <li className="logo-item" onClick={() => history.push('/home')}>Tamara</li>
                            </ul>
                        </Col>
                        <Col>
                            <AiOutlineClose onClick={() => setShowSubMenu(false)}
                                            className='float-end mt-4 me-4 menu-icon'/>
                        </Col>
                    </Row>
                    <div className="filter-section pt-4 ps-4 pe-4">
                        {
                            filtersData.filters.woman.categories.map((filter) => {
                                return (
                                    <>
                                        <div className='top-line mb-3'/>
                                        <Filter filter={filter}/>
                                    </>
                                );
                            })
                        }
                    </div>
                </div>
            </div>


        </>
    );
}

export default Header;
