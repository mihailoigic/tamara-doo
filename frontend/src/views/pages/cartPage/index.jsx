import React, {useEffect, useState} from 'react';
import Header from "../../components/header";
import "../../../assets/css/styles.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CartPage() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const [kolicina, setKolicina] = useState(1);
    function handleChangeKolicina(event) {
        setKolicina(event.target.value);
    }
    return (
        <>
            <Header/>
            {
                cartItems ?
                    <div className="mt-5 pt-5 d-flex justify-content-center flex-column-reverse">
                        {
                            cartItems.map((item)=>{
                                return(
                                    <div className='cartItem my-3 mx-5 p-1 mx-auto'>
                                        <Row className="p-0">
                                            <Col className="align-self-center">
                                                <img
                                                    className="cart-item-img rounded-3"
                                                    src={process.env.PUBLIC_URL + `/Imgs/${item.proizvod.defaultSlika}`}
                                                    alt="slider-photo"
                                                />
                                            </Col>
                                            <Col>
                                                <p className='mt-2 mb-1'>{item.proizvod.naziv}</p>
                                                <p className='mb-1'>{item.proizvod.brend}</p>
                                                <p className='mb-1'>{item.proizvod.kategorija}</p>
                                            </Col>
                                            <Col>
                                                <p className='mt-2'>Cena: {item.proizvod.cena}</p>
                                            </Col>
                                            <Col className="align-self-center align-self-end">
                                                <span className="me-2">Kolicina:</span>
                                                <input className="me-2 mt-1 kolicina-input" defaultValue={kolicina} onChange={()=>handleChangeKolicina} />
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            })
                        }
                    </div> : <p className='text-center text-22 mt-5'>Trenutno nema uredjaja u korpi!</p>
            }
        </>
    );
}