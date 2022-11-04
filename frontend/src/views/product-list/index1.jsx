import React, {useEffect, useState} from "react";
import '../../assets/css/styles.css';
import './css/index.css';
import {firstLetter, scrollToTop, getSearchParams} from "../../utilities/util";
import axios from "axios";
import Config from "../../config/config";
import {useSelector} from "react-redux";
import Loader from "../components/Loader";
import Header from "../components/header";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import store from "../../app/store";
import {
    clearSearchParams,
    setKategorijaTipSearchParam,
    setPolSearchParams,
    setStartSearchParams
} from "../../app/store/searchParams/actions";
import FilterBoje from "../components/filterBoje";
import FilterBrendovi from "../components/filterBrendovi";
import history from "../../utilities/history";
import Footer from "../components/footer";
import Filter from "./filter";
import ProductCard from "../pages/product-info";

export const ProductListPage = () => {
    const state = useSelector(state => state);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState(null);
    const [categoriesData, setCategoriesData] = useState(null);
    const [renderPage, setRenderPage] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [searchParams, setSearchParams] = useState({});
    const [start, setStart] = useState(1);
    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(()=>{
        scrollToTop();
        const params = getSearchParams(state.searchParams, colors, brands);
        let api = `${Config.api.baseUrl}v1/proizvod`;
        if (!params.start) {
            api+='?start=1&pol=zenski'
        }
        axios.get(api, { params })
            .then(res => {
                setProducts(res.data.data.proizvodi);
                setTotal(res.data.data.total);
            })
        axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=${state.searchParams.pol}`)
            .then(res => {
                setCategoriesData(res.data.data);
            })
        setRenderPage(true);
    },[])

    useEffect(()=>{
        scrollToTop();
        const params = getSearchParams(state.searchParams, colors, brands);
        let api = `${Config.api.baseUrl}v1/proizvod`;
        if (!params.start) {
            api+='?start=1&pol=zenski'
        }
        axios.get(api, { params })
            .then(res => {
                setProducts(res.data.data.proizvodi);
                setTotal(res.data.data.total);
            })
        axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=${state.searchParams.pol}`)
            .then(res => {
                setCategoriesData(res.data.data);
            })
        setRenderPage(true);
    },[state, colors, brands]);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        setStart(Number(pageNumber*20-19));
        store.dispatch(setStartSearchParams(pageNumber*20-19));
    }

    const iteratePages = () => {
        let pages = [];
        for (let i = 1; i <= total/19; i++) {
            pages.push(<li className="cursor-pointer" onClick={()=>handlePageChange(i)}><a className={activePage === i ? `page-link color-tamara active-page` : `page-link color-tamara`}>{i}</a></li>);
        }
        return pages;
    }

    return(<>
        {
            products === null && categoriesData === null ? <Loader/> :
                <>
                    <Header state={this}/>
                    <Container className="justify-content-center mt-5 pt-2 mt-md-0 pt-md-0">
                        <div className='mt-5 mb-0 breadcrumb'>
                            <a className='breadcrumb-item' onClick={()=> {
                                // @ts-ignore
                                store.dispatch(clearSearchParams());
                                store.dispatch(setPolSearchParams(state.searchParams.pol ? state.searchParams.pol : "zenski"));
                            }}>{state.searchParams.pol === 'zenski' ? 'Žene' : 'Muškarci'} </a>
                            {
                                state.searchParams.kategorija !== 0 &&
                                <a
                                    onClick={() => store.dispatch(setKategorijaTipSearchParam(Number(state.searchParams.kategorija), 0))}
                                    className='breadcrumb-item'>{firstLetter(`${categoriesData?.find((item: any) => item.value === state.searchParams.kategorija)?.label}`)}</a>
                            }
                            {
                                state.searchParams.tip !== 0 &&
                                <a href="/product-list"
                                   className='breadcrumb-item'>{firstLetter(`${categoriesData?.find((item: any) => item.value === state.searchParams.kategorija)?.tip.find((item: any) => item.value === state.searchParams.tip)?.label}`)}</a>
                            }
                        </div>
                        <Row>
                            <Col xs="12" md="3" className="filters mt-4 d-none d-md-block">
                                <div className="filter-name rounded-3 text-center pt-3">
                                    <a onClick={()=>window.location.reload()}>{state.searchParams.pol === 'zenski' ? 'ŽENE' : 'MUŠKARCI'}</a>
                                </div>
                                <div className="filter-section ps-3 pt-4">
                                    {
                                        categoriesData?.map((catData: any) => {
                                            return (
                                                <Filter filter={catData} pol={state.searchParams.pol}/>
                                            );
                                        })
                                    }
                                </div>
                                <div className="filter-name rounded-3 text-center pt-3">
                                    <p>FILTERI</p>
                                </div>
                                <div className="filter-section pt-2">
                                    <FilterBoje setColors={setColors} colors={colors}/>
                                    <FilterBrendovi setBrands={setBrands} brands={brands} />
                                </div>
                            </Col>
                            <Col xs="12" md="9" className={'min-height-500'}>
                                <Row>
                                    {
                                        products?.map((product) => {
                                            return (
                                                <div className='col-6 col-xs-6 col-md-6 col-lg-4 col-xl-3 p-0'>
                                                    <ProductCard
                                                        product={product}
                                                        onClick={() => history.push(`/product/${product.id}`)}
                                                    />
                                                </div>
                                            );
                                        })
                                    }
                                </Row>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <div className={` ${total > 180 ? 'mobile-max-width' : ''} p-0`}>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination cursor-pointer color-tamara">
                                        <li onClick={()=>handlePageChange(activePage-1)}>
                                            <p className="page-link color-tamara" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </p>
                                        </li>
                                        {
                                            iteratePages()
                                        }
                                        <li onClick={()=>handlePageChange(activePage+1)}>
                                            <a className="page-link color-tamara" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </Row>
                    </Container>
                    <Footer/>
                </>
        }
    </>);
}