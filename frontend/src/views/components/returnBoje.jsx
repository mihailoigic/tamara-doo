import React from "react";
import '../../assets/css/styles.css';
import '../pages/product-overview/css/index.css';

export default function Boje(props) {
    return (
        <ul className='d-inline-block'>
            {
                props.product.boje.map((boja) => {
                    return (
                        <li className={props.nameOfClass}>
                            <img
                                className={props.imgClass}
                                src={process.env.PUBLIC_URL + `/Imgs/${boja}.jpg`}
                                alt={boja}
                            /></li>
                    );
                })
            }
        </ul>
    );
}
