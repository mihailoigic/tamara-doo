import React, {useEffect, useState} from 'react';
import Header from "../../components/header";
import "../../../assets/css/styles.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {maxCharacters, removeFromCart} from "../../../utilities/util";
import history from "../../../utilities/history";

export default function CartPage() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const [kolicina, setKolicina] = useState(1);

    function handleChangeKolicina(event) {
        setKolicina(event.target.value);
    }

    function handleEdit(id, cartId) {
        removeFromCart(cartId);
        history.push(`/product/${id}`);
    }

    return (
        <>
            <Header/>
            {
                cartItems ?
                    <div className="mt-5 pt-5 d-flex justify-content-center flex-column-reverse">
                        {
                            cartItems.map((item) => {
                                return (
                                    <div className='cartItem d-flex flex-wrap align-items-center justify-content-between my-3 mx-5 p-1 mx-auto' style={{position: "relative"}}>
                                        <div>
                                            <Row>
                                                <Col>
                                                    <img
                                                        className="cart-item-img rounded-3 m-3"
                                                        src={process.env.PUBLIC_URL + `/Imgs/${item.proizvod.defaultSlika}`}
                                                        alt="slider-photo"
                                                    />
                                                </Col>
                                                <Col>
                                                    <div>
                                                        <p className='m-3'>{item.proizvod.naziv}</p>
                                                        <p className='m-3'>{item.proizvod.brend}</p>
                                                        <p className='m-3'>{item.proizvod.kategorija}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        {item.dubinaKorpe &&
                                        <p className='m-3'>Dubina korpe: {item.dubinaKorpe}</p>}
                                        <p className='m-3'>Veličina: {item.velicina}</p>
                                        <div>
                                            <img
                                                className='rounded-3 cart-color-img m-3'
                                                src={process.env.PUBLIC_URL + `/Imgs/boje/${item.boja}.jpg`}
                                                alt={""}
                                            />
                                            <p className="colorName ps-2 m-3">{maxCharacters(item.boja)}</p>
                                        </div>
                                        <p className="m-3">Količina: {item.kolicina}</p>
                                        <p className='m-3'>Cena: {item.proizvod.cena}</p>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + `/Imgs/edit.png`} style={{height: '20px', width: '20px'}} className='m-3' onClick={() => handleEdit(item.proizvod.id, item.cartId)}/>
                                            <img src={process.env.PUBLIC_URL + `/Imgs/trash.png`} style={{height: '25px', width: '25px'}} className='m-3' onClick={() => removeFromCart(item.cartId)}/>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div> : <p className='text-center text-22 mt-5'>Trenutno nema proizvoda u korpi!</p>
            }
        </>
    );
}