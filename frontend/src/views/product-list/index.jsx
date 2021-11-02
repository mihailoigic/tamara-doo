import React, { useState } from "react";
import '../../assets/css/styles.css';
import './css/index.css';
import labels from '../../language/srb';
import Container from 'react-bootstrap/Container';
import Header from "../components/header";
import Footer from "../components/footer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import data from "../../data/products";
import ProductCard from "../pages/product-info";
import Filter from "./filter";

function ProductListPage() {

    const [filtersGender, setFiltersGender] = useState('woman');
    const [brandState, setBrandState] = useState('');

    return (
        <>
            <Header />
            <Container className="mt-5 justify-content-center">
                <Row>
                    <Col xs="12" md="3" className="filters mt-4 d-none d-md-block">
                        <div className="filter-name text-center pt-3">
                            <p>SEKCIJE</p>
                        </div>
                        <div className="filter-section pt-4">
                            {
                                data.filters.woman.type.map((filter) => {
                                    return (
                                        <Filter filter={filter} />
                                    );
                                })
                            }
                        </div>
                        <div className="filter-name text-center pt-3">
                            <p>FILTERI</p>
                        </div>
                        <div className="filter-section pt-2">
                            {
                                data.filters.woman.brands.map((brand) => {
                                    return (
                                        <Row>
                                            <Col lg="10">
                                                <p onClick={()=>{setBrandState(brand)}} className="filter-item mb-1">{brand.toUpperCase()}</p>
                                            </Col>
                                            <Col lg="2" className="text-center">
                                                <input onClick={()=>{setBrandState(brand)}} className="clickable" type="checkbox" checked={brand===brandState}/>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                        </div>
                    </Col>
                    <Col xs="12" md="9">
                        <Row>
                            {
                                data.products.map((product) => {
                                    return (
                                        <ProductCard product={product} />
                                    );
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default ProductListPage;
