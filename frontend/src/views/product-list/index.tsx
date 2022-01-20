import React, {Component} from "react";
import '../../assets/css/styles.css';
import './css/index.css';
import Container from 'react-bootstrap/Container';
import Header from "../components/header";
import Footer from "../components/footer";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
import FilterBoje from "../components/filterBoje";
import FilterBrendovi from "../components/filterBrendovi";
import {filterSearchParams, firstLetter, scrollToTop} from "../../utilities/util";
import {ISearchParams} from "../../app/store/searchParams/types";
import store from "../../app/store";
import {
    clearSearchParams,
    setKategorijaTipSearchParam,
    setPolSearchParams,
    setStartSearchParams
} from "../../app/store/searchParams/actions";

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
    categoriesData: any;
    searchParams: ISearchParams | null;
}

type ProductListProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<any>;

export class ProductListPage extends Component<ProductListProps, IState> {

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
            categoriesData: null,
            searchParams: null,
        }
    }

    componentDidMount(): void {
        scrollToTop();
        const api = `${Config.api.baseUrl}v1/proizvod${filterSearchParams(this.props.searchParams)}`;
        axios.get(api)
            .then(res => {
                this.setState({products: res.data.data.proizvodi, total: res.data.data.total, apiState: api});
            })
        axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=${this.props.searchParams.pol}`)
            .then(res => {
                this.setState({categoriesData: res.data.data});
            })
    }

    componentDidUpdate(prevProps: Readonly<ProductListProps>, prevState: Readonly<IState>, snapshot?: any) {
        scrollToTop();
        if (prevProps.searchParams !== this.props.searchParams) {
            console.log(filterSearchParams(this.props.searchParams));
            const api = `${Config.api.baseUrl}v1/proizvod${filterSearchParams(this.props.searchParams)}`;
            axios.get(api)
                .then(res => {
                    this.setState({products: res.data.data.proizvodi, total: res.data.data.total, apiState: api});
                })
            axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=${this.props.searchParams.pol}`)
                .then(res => {
                    this.setState({categoriesData: res.data.data});
                })
        }
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
    }

    handlePageChange(pageNumber: any) {
        console.log('uslo');
        this.setState({activePage: pageNumber});
        this.setState({start: Number(pageNumber*20-19)});
        store.dispatch(setStartSearchParams(pageNumber*20-19));
    }

    iteratePages() {
        let pages = [];
        for (let i = 1; i <= this.state.total/10; i++) {
            pages.push(<li className="cursor-pointer" onClick={()=>this.handlePageChange(i)}><a className="page-link color-tamara">{i}</a></li>);
        }
        return pages;
    }

    render() {
        return (
            <>
                {
                    this.state.products === null && this.state.categoriesData === null ? <Loader/> :
                        <>
                            <Header state={this}/>
                            <Container className="justify-content-center mt-5 pt-2 mt-md-0 pt-md-0">
                                <div className='mt-5 mb-0 breadcrumb'>
                                    <a className='breadcrumb-item' onClick={()=> {
                                        // @ts-ignore
                                        store.dispatch(clearSearchParams());
                                        store.dispatch(setPolSearchParams(this.props.searchParams.pol ? this.props.searchParams.pol : "zenski"));
                                    }}>{this.props.searchParams.pol === 'zenski' ? 'Žene' : 'Muškarci'} </a>
                                    {
                                        this.props.searchParams.kategorija !== 0 &&
                                        <a
                                            onClick={() => store.dispatch(setKategorijaTipSearchParam(Number(this.props.searchParams.kategorija), 0))}
                                           className='breadcrumb-item'>{firstLetter(`${this.state.categoriesData?.find((item: any) => item.value === this.props.searchParams.kategorija)?.label}`)}</a>
                                    }
                                    {
                                        this.props.searchParams.tip !== 0 &&
                                        <a href="/product-list"
                                           className='breadcrumb-item'>{firstLetter(`${this.state.categoriesData?.find((item: any) => item.value === this.props.searchParams.kategorija)?.tip.find((item: any) => item.value === this.props.searchParams.tip)?.label}`)}</a>
                                    }
                                </div>
                                <Row>
                                    <Col xs="12" md="3" className="filters mt-4 d-none d-md-block">
                                        <div className="filter-name rounded-3 text-center pt-3">
                                            <a onClick={()=>window.location.reload()}>{this.props.searchParams.pol === 'zenski' ? 'ŽENE' : 'MUŠKARCI'}</a>
                                        </div>
                                        <div className="filter-section ps-3 pt-4">
                                            {
                                                this.state.categoriesData?.map((catData: any) => {
                                                    return (
                                                        <Filter filter={catData} parent={this}/>
                                                    );
                                                })
                                            }
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
                                                        <div className='col-xs-6 col-md-6 col-lg-4 col-xl-3'>
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
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination cursor-pointer color-tamara">
                                            <li onClick={()=>this.handlePageChange(this.state.activePage-1)}>
                                                <p className="page-link color-tamara" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </p>
                                            </li>
                                            {
                                                this.iteratePages()
                                            }
                                            <li onClick={()=>this.handlePageChange(this.state.activePage+1)}>
                                                <a className="page-link color-tamara" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
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
        searchParams: state.searchParams
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        requestFetchAllProducts,
    }, dispatch
);
// @ts-ignore
ProductListPage = connect(mapStateToProps)(ProductListPage);
