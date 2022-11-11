import React, {useEffect} from "react";
import '../../assets/css/styles.css';
import '../pages/product-overview/css/index.css';

export default function Velicine(props) {
    useEffect(() => {
        props.isProductOverview && props.setVelicina(props.product.velicine[0]);
    }, []);
    return (
        <ul className={props.floatEnd ? 'd-inline-block float-end' : 'd-inline-block'}>
            {
                props.product.velicine.map((velicina) => {
                    const isSelected = velicina === props.velicina;
                    return (
                        <li className={`${props.nameOfClass} ${isSelected && 'selected-item'}`} onClick={() => props.setVelicina(velicina)}><p className='text-center pt-0 mb-0'>{velicina}</p></li>
                    );
                })
            }
        </ul>
    );
}
