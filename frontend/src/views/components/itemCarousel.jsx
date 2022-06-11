import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import history from "../../utilities/history";
import productsCarouselData from "../../data/productsCarouselData";
import ProductCard from "../pages/product-info";
import "../../assets/css/styles.css";

export default class CenterMode extends Component {
    render() {
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
                <Slider {...settings}>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[0]}
                            carousel={true}
                        />
                    </div>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[1]}
                            carousel={true}
                        />
                    </div>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[2]}
                            carousel={true}
                        />
                    </div>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[0]}
                            carousel={true}
                        />
                    </div>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[1]}
                            carousel={true}
                        />
                    </div>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[2]}
                            carousel={true}
                        />
                    </div>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[0]}
                            carousel={true}
                        />
                    </div>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[1]}
                            carousel={true}
                        />
                    </div>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[2]}
                            carousel={true}
                        />
                    </div><div>
                    <ProductCard
                        shadow={true}
                        product={productsCarouselData[0]}
                        carousel={true}
                    />
                </div>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[1]}
                            carousel={true}
                        />
                    </div>
                    <div>
                        <ProductCard
                            shadow={true}
                            product={productsCarouselData[2]}
                            carousel={true}
                        />
                    </div>
                </Slider>
            </div>
        );
    }
}