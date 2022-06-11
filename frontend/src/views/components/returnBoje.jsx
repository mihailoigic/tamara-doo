import React from "react";
import '../../assets/css/styles.css';
import '../pages/product-overview/css/index.css';
import {maxCharacters} from "../../utilities/util";

export default function Boje(props) {
    return (
        <ul className={props.floatEnd ? 'd-inline-block float-end' : 'd-inline-block'}>
            {
                props.product.boje?.map((boja) => {
                    return (
                        <li className={props.nameOfClass}>
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
