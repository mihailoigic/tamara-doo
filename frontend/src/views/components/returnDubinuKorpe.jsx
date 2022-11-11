import React, {useEffect} from "react";
import '../../assets/css/styles.css';
import '../pages/product-overview/css/index.css';

export default function DubinaKorpe(props) {
    let niz = [];
    for (var i = 0; i < props.product.podtip.length; i++) {
        niz.push(props.product.podtip[i]);
    }
    useEffect(()=>{
        props.setDubinaKorpe(niz[0]);
    },[])
    niz.sort();
    return (
        <ul className='d-inline-block'>
            {
                niz.map((korpa) => {
                    const isSelected = korpa === props.dubinaKorpe;
                    return (
                        <li className={`${props.nameOfClass} ${isSelected && 'selected-item'}`} onClick={() => props.setDubinaKorpe(korpa)}><p className='text-center pt-0 mb-0'>{korpa}</p></li>
                    );
                })
            }
        </ul>
    );
}
