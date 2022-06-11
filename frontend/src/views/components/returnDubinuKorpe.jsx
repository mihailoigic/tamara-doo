import React from "react";
import '../../assets/css/styles.css';
import '../pages/product-overview/css/index.css';

export default function DubinaKorpe(props) {
    let niz = [];
    for (var i = 0; i < props.product.podtip.length; i++) {
        niz.push(props.product.podtip[i]);
    }
    niz.sort();
    return (
        <ul className='d-inline-block'>
            {
                niz.map((korpa) => {

                    return (
                        <li className={props.nameOfClass}><p className='text-center pt-0 mb-0'>{korpa}</p></li>
                    );
                })
            }
        </ul>
    );
}
