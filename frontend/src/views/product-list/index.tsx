import React, {Component} from "react";
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
import {requestFetchAllProducts} from '../../app/store/product/productList/actions';
import {RouteComponentProps, withRouter, useLocation} from "react-router-dom";
import {AnyAction, Dispatch, bindActionCreators} from "redux";
import {connect} from "react-redux";
import {AppState} from "../../app/store/rootReducers";
import history from "../../utilities/history";
import axios from "axios";
import {IProduct} from "../../entities/product/types";
import Config from "../../config/config";
import Loader from "../components/Loader";
import Pagination from "react-js-pagination";
import FilterBoje from "../components/filterBoje";
import FilterBrendovi from "../components/filterBrendovi";

interface IState {
    brendState: string;
    products: IProduct[] | null;
    kategorija: number | null;
    tip: number | null;
    pol: string;
    start: number;
    renderKategorija: boolean;
    total: number;
    activePage: number;
    apiState: string;
    bojeState: string;
    filterState: boolean | null;
}

type ProductListProps =
    ReturnType<typeof mapStateToProps>
    & ReturnType<typeof mapDispatchToProps>
    & RouteComponentProps<any>;

export class ProductListPage extends Component<ProductListProps, IState, {}> {

    constructor(props: ProductListProps) {
        super(props);

        this.state = {
            brendState: '',
            products: null,
            kategorija: null,
            tip: null,
            pol: 'zenski',
            start: 1,
            renderKategorija: false,
            total: 50,
            activePage: 1,
            apiState: '',
            bojeState: '',
            filterState: null,
        }
    }

    componentDidMount(): void {
        // this.props.requestFetchAllProducts({ params: null });
        const api = `${Config.api.baseUrl}v1/proizvod?start=${this.state.start}&pol=${this.state.pol}`;
        axios.get(api)
            .then(res => {
                this.setState({products: res.data.data.proizvodi, total: res.data.data.total, apiState: api});
            })

    }

    componentDidUpdate(prevProps: Readonly<ProductListProps>, prevState: Readonly<IState>, snapshot?: any) {

        if (prevState.bojeState !== this.state.bojeState) {
            if (this.state.bojeState !== '') {
                let api = `${this.state.apiState}&filters={"boje": [${this.state.bojeState}]}`;
                if (this.state.brendState !== '') {
                    api = `${this.state.apiState}&filters={"brend": [${this.state.brendState}],"boje": [${this.state.bojeState}]}`;
                }
                axios.get(api)
                    .then(res => {
                        this.setState({products: res.data.data.proizvodi, total: res.data.data.total});
                    })
                console.log(api);
            } else if (this.state.brendState === '') {
                axios.get(this.state.apiState)
                    .then(res => {
                        this.setState({products: res.data.data.proizvodi, total: res.data.data.total});
                    })
            } else {
                const api = `${this.state.apiState}&filters={"brend": [${this.state.brendState}]}`;
                axios.get(api)
                    .then(res => {
                        this.setState({products: res.data.data.proizvodi, total: res.data.data.total});
                    })
            }
        }

        if (prevState.brendState !== this.state.brendState) {
            if (this.state.brendState !== '') {
                let api = `${this.state.apiState}&filters={"brend": [${this.state.brendState}]}`;
                if (this.state.bojeState !== '') {
                    api = `${this.state.apiState}&filters={"brend": [${this.state.brendState}],"boje": [${this.state.bojeState}]}`;
                }
                axios.get(api)
                    .then(res => {
                        this.setState({products: res.data.data.proizvodi, total: res.data.data.total});
                    })
                console.log(api);
            } else if (this.state.bojeState === '') {
                axios.get(this.state.apiState)
                    .then(res => {
                        this.setState({products: res.data.data.proizvodi, total: res.data.data.total});
                    })
            } else {
                const api = `${this.state.apiState}&filters={"boje": [${this.state.bojeState}]}`;
                axios.get(api)
                    .then(res => {
                        this.setState({products: res.data.data.proizvodi, total: res.data.data.total});
                    })
            }
        }

        if (this.props.location.state !== undefined) {
            const location = this.props.location.state;
            // @ts-ignore
            if (location.kategorija !== undefined && prevState.kategorija !== location.kategorija) {
                // @ts-ignore
                this.setState({kategorija: this.props.location.state.kategorija, tip: null})
            }
            // @ts-ignore
            if (this.props.location.state.tip !== undefined && prevState.tip !== location.tip) {
                // @ts-ignore
                this.setState({kategorija: this.props.location.state.kategorija, tip: this.props.location.state.tip})
            }
            // @ts-ignore
            if (location.pol !== undefined && prevState.pol !== location.pol) {
                // @ts-ignore
                this.setState({pol: this.props.location.state.pol})
            }
        }

        if (prevState.apiState !== this.state.apiState) {
            axios.get(this.state.apiState)
                .then(res => {
                    this.setState({products: res.data.data.proizvodi, total: res.data.data.total});
                })
        }

        if (prevState.start !== this.state.start) {
            let string = `${Config.api.baseUrl}v1/proizvod?start=${this.state.start}&pol=${this.state.pol}`;
            if (this.state.kategorija !== null ){
                string += `&kategorija=${this.state.kategorija}`;
            }
            if (this.state.tip !== null ){
                string += `&tip=${this.state.tip}`;
            }
            axios.get(string)
                .then(res => {
                    this.setState({products: res.data.data.proizvodi, total: res.data.data.total, apiState: string});
                })
        }

        if ((prevState.kategorija !== this.state.kategorija || prevState.renderKategorija !== this.state.renderKategorija) && this.state.kategorija !== null) {
            const api = `${Config.api.baseUrl}v1/proizvod?start=${this.state.start}&pol=${this.state.pol}&kategorija=${this.state.kategorija}`;
            axios.get(api)
                .then(res => {
                    this.setState({products: res.data.data.proizvodi, total: res.data.data.total, apiState: api});
                })
        }
        if (prevState.tip !== this.state.tip && this.state.tip !== null) {
            const api = `${Config.api.baseUrl}v1/proizvod?start=${this.state.start}&pol=${this.state.pol}&tip=${this.state.tip}`;
            axios.get(api)
                .then(res => {
                    this.setState({products: res.data.data.proizvodi, total: res.data.data.total, apiState: api});
                })
        }
        if (prevState.pol !== this.state.pol) {
            const api = `${Config.api.baseUrl}v1/proizvod?start=${this.state.start}&pol=${this.state.pol}`;
            axios.get(api)
                .then(res => {
                    this.setState({products: res.data.data.proizvodi, total: res.data.data.total, apiState: api});
                })
        }
    }

    handlePageChange(pageNumber: any) {
        this.setState({activePage: pageNumber});
        this.setState({start: Number(pageNumber*20-19)});
    }

    render() {
        return (
            <>
                {
                    this.state.products === null ? <Loader/> :
                        <>
                            <Header state={this}/>
                            <Container className="justify-content-center">
                                <div className='mt-5 mb-0 breadcrumb'>
                                    <a className='breadcrumb-item'
                                       href="/product-list">{this.state.pol === 'zenski' ? 'Žene' : 'Muškarci'} </a>
                                    {
                                        this.state.kategorija !== null &&
                                        <a onClick={() => this.setState({
                                            renderKategorija: !this.state.renderKategorija,
                                            tip: null
                                        })}
                                           className='breadcrumb-item'>{`${filtersData.filters.woman.categories.find((item: any) => item.value === this.state.kategorija).label}`}</a>
                                    }
                                    {
                                        this.state.tip !== null && this.state.kategorija !== null &&
                                        <a href="/product-list"
                                           className='breadcrumb-item'>{`${filtersData.filters.woman.categories.find((item: any) => item.value === this.state.kategorija).types.find((item: any) => item.value === this.state.tip).label}`}</a>
                                    }
                                </div>
                                <Row>
                                    <Col xs="12" md="3" className="filters mt-4 d-none d-md-block">
                                        <div className="filter-name rounded-3 text-center pt-3">
                                            <a href="/product-list">{this.state.pol === 'zenski' ? 'ŽENE' : 'MUŠKARCI'}</a>
                                        </div>
                                        <div className="filter-section ps-3 pt-4">
                                            {
                                                filtersData.filters.woman.categories.map((category: any) => {
                                                    return (
                                                        <Filter filter={category} parent={this}/>
                                                    );
                                                })
                                            }
                                            {/*<div className='delete-filters'>*/}
                                            {/*    OBRISI FILTERE*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="filter-name rounded-3 text-center pt-3">
                                            <p>FILTERI</p>
                                        </div>
                                        <div className="filter-section pt-2">
                                            <FilterBoje state={this} />
                                            <FilterBrendovi state={this} />
                                        </div>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Row>
                                            {
                                                this.state.products?.map((product) => {
                                                    return (
                                                        <ProductCard
                                                            product={product}
                                                            onClick={() => history.push(`/product/${product.id}`)}
                                                        />
                                                    );
                                                })
                                            }
                                        </Row>
                                    </Col>
                                    <Pagination
                                        itemClass='page-item'
                                        linkClass="page-link"
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={20}
                                        totalItemsCount={this.state.total}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange.bind(this)}
                                    />
                                </Row>
                            </Container>
                            <Footer/>
                        </>
                }
            </>
        )
            ;
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
