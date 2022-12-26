import React, {useEffect, useState} from "react";
import '../../../assets/css/styles.css';
import './css/index.css';
import history from "../../../utilities/history";
import {firstLetter, removeUnderline, scrollToTop} from "../../../utilities/util";
import Boje from "../../components/returnBoje";
import Velicine from "../../components/returnVelicine";

function ProductCard(props) {
    const [showSizes, setShowSizes] = useState(false);
    const noImage = process.env.PUBLIC_URL + `/Imgs/no-image.jpg`;
    const [src, setSrc] = useState(noImage);
    const product = props.product;
    const moda = product.moda ? 'Moda' : 'Klasika';

    useEffect(() => {
        setSrc(process.env.PUBLIC_URL + `/Imgs/${removeUnderline(product.defaultSlika)}`);
    }, [product.defaultSlika])

    function calculateDiscount() {
        let discount = 0;
        if (product.discounts?.length > 0 || product.discountOne?.length > 0) {
            product.discounts?.forEach(item => {
                discount += Number(item.procenat);
            })
            product.discountOne?.forEach(item => {
                discount += Number(item.procenat);
            })
            return Math.round(discount * 100);
        }
        return null;
    }

    return (
        <>
            <div className={`${props.shadow && 'shadow'} product-info-container ${props.carousel && 'carousel-size'}`}
                 onClick={() => history.push(`/product/${product.id}`)} onMouseOver={() => setShowSizes(true)}
                 onMouseLeave={() => setShowSizes(false)}>
                <div className="product">
                    {
                        calculateDiscount() &&
                        <div className=''>
                            <p className='position-absolute discount-p'>{calculateDiscount()}%</p>
                            <img className='discount-photo' src={process.env.PUBLIC_URL + `/Imgs/discount.png`}/>
                        </div>
                    }
                    <img
                        className={props.carousel ? "carousel-img" : "product-img"}
                        src={src}
                        alt={product.defaultSlika}
                        onError={
                            () => setSrc(noImage)
                        }
                    />
                </div>
                {
                    showSizes &&
                    <div className={`velicine text-center color-first ${props.carousel && 'w-250'}`}>
                        <p className='ff-releway mb-0'>Veličine:</p>
                        <Velicine nameOfClass='size-item-product' product={product} floatEnd={false}/>
                    </div>
                }
                <div className="product-details pt-1 ps-2">
                    <p className="ff-releway color-first mb-0">{firstLetter(product.naziv)}</p>
                    <p className="mb-0 color-secondary">{(product.brend).toUpperCase()}</p>
                    <p className="mb-0 color-secondary">{moda}</p>
                    <Boje nameOfClass='color-item-product' product={product} imgClass='rounded-1' showName={false}
                          floatEnd={false}/>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
