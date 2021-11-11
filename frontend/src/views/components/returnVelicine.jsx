import React from "react";
import '../../assets/css/styles.css';
import '../pages/product-overview/css/index.css';

export default function Velicine(props) {
    return (
        <ul className='d-inline-block'>
            {
                props.product.velicine.map((velicina) => {
                    return (
                        <li className={props.nameOfClass}><p className='text-center pt-0 mb-0'>{velicina}</p></li>
                    );
                })
            }
        </ul>
    );
}
