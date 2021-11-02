import React from "react";
import '../../../assets/css/styles.css';
import './css/index.css';
import history from "../../../utilities/history";
import firstLetter from "../../../util/util";

function ProductCard(props) {
    const product = props.product;
    const moda = product.moda ? 'Moda' : 'Klasika';
    return (
        <>
            <div className="product-info-container" onClick={() => history.push('/productPage')}>
                <div className="product">
                    <img
                        className="product-img"
                        src={process.env.PUBLIC_URL + `/Imgs/${product.img}.jpg`}
                        alt="slider-photo"
                    />
                </div>
                <div className="product-details pt-1 ps-1">
                    <p className="bold-arial mb-0">{firstLetter(product.name)}</p>
                    <p className="mb-0">{firstLetter(product.brand)}</p>
                    <p>{moda}</p>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
