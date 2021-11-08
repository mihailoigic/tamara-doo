import React, { Component } from "react";
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
import filtersData from "../../data/filtersData";
import ProductCard from "../pages/product-info";
import Filter from "./filter";
import { requestFetchAllProducts } from '../../app/store/product/productList/actions';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AnyAction, Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../app/store/rootReducers";
import history from "../../utilities/history";

interface IState {
    brandState: string;
}

type ProductListProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<any>;

export class ProductListPage extends Component<ProductListProps, IState>{

    constructor(props: ProductListProps) {
        super(props);

        this.state={
            brandState: '',
        }
    }

    componentDidMount(): void {
        // this.props.requestFetchAllProducts({ params: null });
    }

    render() {
        return (
            <>
                <Header/>
                <Container className="mt-5 justify-content-center">
                    <Row>
                        <Col xs="12" md="3" className="filters mt-4 d-none d-md-block">
                            <div className="filter-name text-center pt-3">
                                <p>SEKCIJE</p>
                            </div>
                            <div className="filter-section pt-4">
                                {
                                    filtersData.filters.woman.categories.map((filter:any) => {
                                        return (
                                            <Filter filter={filter}/>
                                        );
                                    })
                                }
                            </div>
                            <div className="filter-name text-center pt-3">
                                <p>FILTERI</p>
                            </div>
                            <div className="filter-section pt-2">
                                {
                                    filtersData.filters.woman.brands.map((brand:any) => {
                                        return (
                                            <Row>
                                                <Col lg="10">
                                                    <p onClick={() => {
                                                        this.setState({brandState: brand});
                                                    }} className="filter-item mb-1">{brand.toUpperCase()}</p>
                                                </Col>
                                                <Col lg="2" className="text-center">
                                                    <input onClick={() => {
                                                        this.setState({brandState: brand});
                                                    }} className="clickable" type="checkbox"
                                                           checked={brand === this.state.brandState}/>
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
                                            <ProductCard product={product} onClick={()=>history.push('/product')}/>
                                        );
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        products: state.products.items
    };
};


const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        requestFetchAllProducts,
    }, dispatch
);

export default (withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductListPage)));
