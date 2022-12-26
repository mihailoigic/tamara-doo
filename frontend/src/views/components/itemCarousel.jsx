import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productsCarouselData from "../../data/productsCarouselData";
import ProductCard from "../pages/product-info";
import "../../assets/css/styles.css";
import axios from "axios";
import Config from "../../config/config";

export default class CenterMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popularProducts: null,
            p1: null,
            p2: null,
            p3: null,
            p4: null,
            p5: null,
        }
    }

    componentDidMount() {
        axios.get(`${Config.api.baseUrl}v1/popular-products`)
            .then(res => {
                this.setState({ popularProducts: res.data.data });
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.popularProducts !== prevState.popularProducts) {
            axios.get(`${Config.api.baseUrl}v1/proizvod/${this.state.popularProducts.p1}`)
                .then(res => {
                    this.setState({ p1: res.data.data });
                })
            axios.get(`${Config.api.baseUrl}v1/proizvod/${this.state.popularProducts.p2}`)
                .then(res => {
                    this.setState({ p2: res.data.data });
                })
            axios.get(`${Config.api.baseUrl}v1/proizvod/${this.state.popularProducts.p3}`)
                .then(res => {
                    this.setState({ p3: res.data.data });
                })
            axios.get(`${Config.api.baseUrl}v1/proizvod/${this.state.popularProducts.p4}`)
                .then(res => {
                    this.setState({ p4: res.data.data });
                })
            axios.get(`${Config.api.baseUrl}v1/proizvod/${this.state.popularProducts.p5}`)
                .then(res => {
                    this.setState({ p5: res.data.data });
                })

        }
    }

    render() {
        console.log(this.state);
        const settings = {
            className: "center item-carousel",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 4,
            speed: 500,
        };
        return (
            <div>
                {
                    <Slider {...settings}>
                        {
                            this.state.p1 &&
                            <div>
                                <ProductCard
                                    shadow={true}
                                    product={this.state.p1}
                                    carousel={true}
                                />
                            </div>
                        }
                        {
                            this.state.p2 &&
                            <div>
                                <ProductCard
                                    shadow={true}
                                    product={this.state.p2}
                                    carousel={true}
                                />
                            </div>
                        }
                        {
                            this.state.p3 &&
                            <div>
                                <ProductCard
                                    shadow={true}
                                    product={this.state.p3}
                                    carousel={true}
                                />
                            </div>
                        }
                        {
                            this.state.p4 &&
                            <div>
                                <ProductCard
                                    shadow={true}
                                    product={this.state.p4}
                                    carousel={true}
                                />
                            </div>
                        }
                        {
                            this.state.p5 &&
                            <div>
                                <ProductCard
                                    shadow={true}
                                    product={this.state.p5}
                                    carousel={true}
                                />
                            </div>
                        }
                    </Slider>
                }
            </div>
        );
    }
}