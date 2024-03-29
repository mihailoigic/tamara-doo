import React, {useEffect, useState} from 'react';
import Header from "../../components/header";
import "../../../assets/css/styles.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {currencyFormat, maxCharacters, removeFromCart, scrollToTop} from "../../../utilities/util";
import history from "../../../utilities/history";
import Button from 'react-bootstrap/Button';

export default function CartPage() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const [kolicina, setKolicina] = useState(1);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    function fullPrice(cartItems) {
        let price = 0;
        cartItems.forEach((cartItem) => {
            if (cartItem.proizvod.cenaSaPopustom) {
                price += Math.round(cartItem.kolicina * cartItem.proizvod.cenaSaPopustom);
            } else {
                price += Math.round(cartItem.kolicina * cartItem.proizvod.cena);
            }
        });
        return price;
    }

    function handleChangeKolicina(event) {
        setKolicina(event.target.value);
    }

    function handleEdit(id, cartId, cartItems) {
        const item = cartItems.find((itemCart) => itemCart.proizvod.id === id);
        removeFromCart(cartId);
        localStorage.setItem('editItem', JSON.stringify(item));
        history.push(`/product/${id}`);
    }

    return (
        <>
            {
                showDeletePopup &&
                <>
                    <div className='background-popup'/>
                    <div className='popup-delete text-center p-4'>
                        <p className='h5'>Proizvod je uspesno izbrisan iz korpe!</p>
                        <Button className='me-3 mt-3' onClick={() => {
                            setShowDeletePopup(false);
                        }}>Ok</Button>
                    </div>
                </>
            }
            <Header/>
            {
                cartItems && cartItems.length > 0 ?
                    <div className="mt-5 pt-5 d-flex justify-content-center flex-column-reverse">
                        <hr/>
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
                                        <p className='m-3'>Cena: {item.proizvod.cenaSaPopustom ?
                                            <><del>{currencyFormat(item.proizvod.cena)}</del> {currencyFormat(Math.round(item.proizvod.cenaSaPopustom))}</> : currencyFormat(item.proizvod.cena)} <span className='text-15'>RSD</span></p>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + `/Imgs/edit.png`} style={{height: '20px', width: '20px'}} className='m-3 cursor-pointer' onClick={() => handleEdit(item.proizvod.id, item.cartId, cartItems)}/>
                                            <img src={process.env.PUBLIC_URL + `/Imgs/trash.png`} style={{height: '25px', width: '25px'}} className='m-3 cursor-pointer' onClick={() => {
                                                removeFromCart(item.cartId);
                                                setShowDeletePopup(true);
                                                scrollToTop();
                                            }}/>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <hr/>
                        <div className="buy-btn text-center py-2 mt-2 justify-content-center mx-auto"
                             onClick={() => {
                                 history.push(`/checkout`);
                             }}>Kupi
                        </div>
                        <p className="text-center">Cena: {currencyFormat(fullPrice(cartItems))} RSD</p>
                    </div> : <p className='text-center text-22 mt-5'>Trenutno nema proizvoda u korpi!</p>
            }
        </>
    );
}