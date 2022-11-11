import React, {useEffect} from "react";
import '../../assets/css/styles.css';
import '../pages/product-overview/css/index.css';
import {maxCharacters} from "../../utilities/util";

export default function Boje(props) {
    useEffect(() => {
        props.showName && props.setBoja(props.product.boje[0]);
    }, []);
    return (
        <ul className={props.floatEnd ? 'd-inline-block float-end' : 'd-inline-block'}>
            {
                props.product.boje?.map((boja) => {
                    const isSelected = boja === props.boja;
                    return (
                        <li className={`${props.nameOfClass} ${isSelected && 'selected-item'}`} onClick={() => props.setBoja(boja)}>
                            <img
                                className={`${props.imgClass}`}
                                src={process.env.PUBLIC_URL + `/Imgs/boje/${boja}.jpg`}
                                alt={""}
                            />
                            {
                                props.showName &&
                                <p className="colorName text-center">{maxCharacters(boja)}</p>
                            }
                        </li>
                    );
                })
            }
        </ul>
    );
}
