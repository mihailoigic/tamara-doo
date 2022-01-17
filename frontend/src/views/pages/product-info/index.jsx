import React, {useState} from "react";
import '../../../assets/css/styles.css';
import './css/index.css';
import history from "../../../utilities/history";
import { firstLetter } from "../../../utilities/util";
import Boje from "../../components/returnBoje";
import Velicine from "../../components/returnVelicine";

function ProductCard(props) {
    const [showSizes, setShowSizes] = useState(false);
    const product = props.product;
    const moda = product.moda ? 'Moda' : 'Klasika';
    return (
        <>
            <div className={props.shadow ? `shadow product-info-container` : `product-info-container`} onClick={() => history.push(`/product/${product.id}`)} onMouseOver={()=>setShowSizes(true)} onMouseLeave={()=>setShowSizes(false)}>
                <div className="product">
                    <img
                        className="product-img"
                        src={process.env.PUBLIC_URL + `/Imgs/${product.defaultSlika}`}
                        alt="slider-photo"
                    />
                </div>
                {
                    showSizes &&
                    <div className='velicine text-center'>
                        <p className='ff-releway mb-0'>Veličine:</p>
                        <Velicine nameOfClass='size-item-product' product={product} />
                    </div>
                }
                <div className="product-details pt-1 ps-2">
                    <p className="ff-releway color-first mb-0">{firstLetter(product.naziv)}</p>
                    <p className="mb-0 color-secondary">{(product.brend).toUpperCase()}</p>
                    <p className="mb-0 color-secondary">{moda}</p>
                    <Boje nameOfClass='color-item-product' product={product} imgClass='rounded-1' showName={false}/>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
