import React, {useEffect, useRef, useState} from "react";
import '../../assets/css/styles.css';
import labels from '../../language/srb';
import SubHeader from './subHeader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import history from '../../utilities/history';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import Filter from "../product-list/filter";
import axios from "axios";
import Config from "../../config/config";
import ReactDOM from "react-dom";
import {FaSearch, FaUser} from 'react-icons/fa';
import {BsInfoLg} from 'react-icons/bs';
import {IoAddCircle} from 'react-icons/io5';
import store from "../../app/store";
import {clearSearchParams, setPolSearchParams, setSearchSearchParams} from "../../app/store/searchParams/actions";


function Header(props) {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showInfoMenu, setShowInfoMenu] = useState(false);
    const [categoriesWoman, setCategoriesWoman] = useState(null);
    const [categoriesMan, setCategoriesMan] = useState(null);
    const [searchActive, setSearchActive] = useState(false);
    const [gender, setGender] = useState(true);
    const [showAdmin, setShowAdmin] = useState(false);
    const searchRef = useRef();

    function changeStyle(string) {
        let element = document.getElementById(string)
        ReactDOM.findDOMNode(element).style.display = 'none'
    }

    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=zenski`)
            .then(res => {
                setCategoriesWoman(res.data.data);
            })
        axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=muski`)
            .then(res => {
                setCategoriesMan(res.data.data);
            })
        if (sessionStorage.getItem('BearerToken')) {
            axios.get(`${Config.api.baseUrl}v1/auth/login`, {
                headers: {"Authorization": sessionStorage.getItem("BearerToken")}
            }).then(res => {
                setShowAdmin(res.status === 200 ? true : false);
            })
        }
    }, []);

    return (
        <>
            <div className='header-desktop'>
                <Container fluid className="header-container">
                    <Row>
                        <Col md='2'>
                            <ul className="header-items-left ps-3">
                                <li className="logo-item" onClick={() => history.push('/home')}>{labels.tamara}</li>
                            </ul>
                        </Col>
                        <Col md='8'>
                            <ul className="header-items-middle">
                                <li className="header-item border-right-nav">
                                    <p
                                        className='mb-0'
                                        onClick={() => {
                                            store.dispatch(clearSearchParams());
                                            setSearchActive(false);
                                            store.dispatch(setPolSearchParams('zenski'));
                                            history.push('/product-list');
                                        }}>{labels.woman}</p>
                                    <div id='subwoman' onClick={() => changeStyle('subwoman')} className='woman'>
                                        <SubHeader gender='zenski' data={categoriesWoman}/></div>
                                </li>
                                <li
                                    className="header-item border-right-nav"

                                ><p
                                    className='mb-0'
                                    onClick={() => {
                                        store.dispatch(clearSearchParams());
                                        setSearchActive(false);
                                        store.dispatch(setPolSearchParams('muski'));
                                        history.push('/product-list');
                                    }}>{labels.man}</p>
                                    <div id='subman' onClick={() => changeStyle('subman')} className='man'><SubHeader
                                        gender='muski' data={categoriesMan}/></div>
                                </li>
                                <li className="header-item border-right-nav"
                                    onClick={() => history.push('/')}>Početna
                                </li>
                                <li className="header-item border-right-nav"
                                    onClick={() => history.push('/about-us')}>{labels.aboutUs}</li>
                                <li className="header-item"
                                    onClick={() => history.push('/contact')}>{labels.contact}</li>
                            </ul>
                        </Col>
                        <Col>
                            {
                                props.state !== undefined &&
                                <>
                                    <FaSearch className='search-img mt-4 float-end me-2 cursor-pointer' onClick={() => {
                                        setSearchActive(!searchActive)
                                    }}/>
                                </>
                            }
                            {/*<FaUser className='user-icon cursor-pointer' onClick={()=>history.push('/admin')}/>*/}
                            {
                                showAdmin &&
                                <IoAddCircle className='user-icon cursor-pointer'
                                             onClick={() => history.push('/admin-page')}/>
                            }
                        </Col>
                    </Row>
                    {
                        searchActive &&
                        <div className='search-bar mx-auto'>
                            <Row>
                                <Col md='3'>
                                    <AiOutlineClose onClick={() => setShowInfoMenu(false)} className='float-end mt-2 menu-icon cursor-pointer'
                                    onClick={()=> {
                                        store.dispatch(setSearchSearchParams(''));
                                        setSearchActive(false);
                                    }}/>
                                </Col>
                                <Col md='6'>
                                    <input id='search-input' className='search-input w-100 mt-2' type='text'/>
                                </Col>
                                <Col md='3'>
                                    <FaSearch className='search-img mt-2 me-2 cursor-pointer' onClick={() => {
                                        const searchTerm = document.getElementById('search-input').value;
                                        store.dispatch(setSearchSearchParams(searchTerm));
                                    }}/>
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>

            </div>
            <div className='header-mobile'>
                <Row>
                    <Col xs='3'>
                        <AiOutlineMenu onClick={() => setShowSubMenu(!showSubMenu)} className='mt-3 ms-3 menu-icon'/>
                    </Col>
                    <Col xs='6'>
                        <ul className="header-items-middle">
                            <li className="logo-item" onClick={() => history.push('/home')}>Tamara</li>
                        </ul>
                    </Col>
                    <Col xs='3'>
                        <BsInfoLg className='mt-3 me-4 menu-icon float-end'
                                  onClick={() => setShowInfoMenu(!showInfoMenu)}/>
                    </Col>
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
                    <Row className='my-2'>
                        <Col xs='6' className={gender ? 'button-active' : ''}>
                            <p className='text-center pt-3 fs-6' onClick={() => {
                                store.dispatch(setPolSearchParams('zenski'));
                                history.push('/product-list');
                                setGender(true);
                            }}>ŽENE</p>
                        </Col>
                        <Col xs='6' className={gender ? '' : 'button-active'}>
                            <p className='text-center pt-3 fs-6' onClick={() => {
                                store.dispatch(setPolSearchParams('muski'));
                                history.push('/product-list');
                                setGender(false);
                            }}>MUŠKARCI</p>
                        </Col>
                    </Row>
                    <div className="filter-section pt-4 ps-4 pe-4">
                        {
                            gender ?
                                categoriesWoman?.map((catData) => {
                                    return (
                                        <>
                                            <div className='border-top pt-2'/>
                                            <Filter filter={catData} mobile={true} gender='zenski'/>
                                        </>
                                    );
                                }) :
                                categoriesMan?.map((catData) => {
                                    return (
                                        <>
                                            <div className='border-top pt-2'/>
                                            <Filter filter={catData} mobile={true} gender='muski'/>
                                        </>
                                    );
                                })

                        }
                    </div>
                </div>
                <div className={showInfoMenu ? 'mobile-sub-menu show' : 'mobile-sub-menu'}>
                    <Row>
                        <Col/>
                        <Col>
                            <ul className="header-items-middle">
                                <li className="logo-item" onClick={() => history.push('/home')}>Tamara</li>
                            </ul>
                        </Col>
                        <Col>
                            <AiOutlineClose onClick={() => setShowInfoMenu(false)}
                                            className='float-end mt-4 me-4 menu-icon'/>
                        </Col>
                    </Row>
                    <div className="filter-section pt-4 ps-4 pe-4">
                        <p className="ff-releway fs-3 py-3 border-bottom border-top"
                           onClick={() => history.push('/about-us')}>{labels.aboutUs}</p>
                        <p className="ff-releway fs-3 pb-3 border-bottom"
                           onClick={() => history.push('/contact')}>{labels.contact}</p>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Header;
