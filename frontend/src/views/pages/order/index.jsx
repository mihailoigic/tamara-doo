import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Config from "../../../config/config";
import {currencyFormat, maxCharacters, removeFromCart} from "../../../utilities/util";
import history from "../../../utilities/history";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function OrderPage() {
    const {id} = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`${Config.api.baseUrl}v1/checkout?brojKupovine=${id}`, {
                headers: {"Authorization": localStorage.getItem("BearerToken")}
            }).then(res => {
                setData(res.data.data[0]);
            }).catch(err => {
                setData(null);
            });
        }
    }, []);

    function getStatusColor (status) {
        if (status === 'active') {
            return 'text-primary';
        }
        if (status === 'canceled') {
            return 'text-danger';
        }
        if (status === 'success') {
            return 'text-success';
        }
    }

    function fullPrice() {
        let price = 0;
        data.cartItems.forEach(item => {
            price += Math.round(item.kolicina * item.cena);
        });
        return price;
    }

    function updateOrderStatus(brojKupovine, status) {
        let api = '';
        if (status === 'active') {
            api = `${Config.api.baseUrl}v1/checkout/activate/${brojKupovine}`
        }
        if (status === 'canceled') {
            api = `${Config.api.baseUrl}v1/checkout/cancel/${brojKupovine}`
        }
        if (status === 'success') {
            api = `${Config.api.baseUrl}v1/checkout/confirm/${brojKupovine}`
        }
        axios.put(api, {},{
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        }).then(res => {
            window.location.reload();
        }).catch(err => {
        });
    }

    return (
        <>
            {
                data ?
                    <>
                        <div className='d-flex container justify-content-center mt-5'>
                            <div className='p-5'>
                                <p className='justify-content-center h5'>Informacije o porudzbini:</p>
                                <p>Broj kupovine: {data.brojKupovine}</p>
                                <p>Status: <span className={getStatusColor(data.status)}>{data.status}</span></p>
                                <p>Datum kreiranja: {(new Date(Date.parse(data.createdAt))).toDateString()}</p>
                                <p>Napomena: {data.napomena}</p>
                            </div>
                            <div className='p-5'>
                                <p className='justify-content-center h5'>Informacije o korisniku:</p>
                                <p>Ime i prezime: {data.korisnikId.ime} {data.korisnikId.prezime}</p>
                                <p>Telefon: {data.korisnikId.telefon}</p>
                                <p>Email: {data.korisnikId.email}</p>
                                <p>Grad: {data.korisnikId.grad}</p>
                                <p>Adresa: {data.korisnikId.adresa}</p>
                                <p>Broj stana: {data.korisnikId.brojStana ? data.korisnikId.brojStana : '/'}</p>
                            </div>
                        </div>
                        <div>
                            <div className="p-4 d-flex justify-content-center">
                                <Button className='mx-3' onClick={() => updateOrderStatus(data.brojKupovine, 'active')}>
                                    Aktiviraj
                                </Button>
                                <Button className='mx-3' variant='danger' onClick={() => updateOrderStatus(data.brojKupovine, 'canceled')}>
                                    Otkazi
                                </Button>
                                <Button className='mx-3' variant='success' onClick={() => updateOrderStatus(data.brojKupovine, 'success')}>
                                    Potvrdi
                                </Button>
                            </div>
                            <p className='h5 text-center'>
                                Stavke porudzbine:
                            </p>
                            {
                                data.cartItems && data.cartItems.length > 0 ?
                                    <div className="mt-5 pt-5 d-flex justify-content-center flex-column-reverse">
                                        <hr/>
                                        {
                                            data.cartItems.map((item) => {
                                                return (
                                                    <div className='cursor-pointer cartItem d-flex flex-wrap align-items-center justify-content-between my-3 mx-5 p-1 mx-auto' style={{position: "relative"}}
                                                    onClick={()=>history.push(`/product/${item.proizvodId.id}`)}>
                                                        <div>
                                                            <Row>
                                                                <Col>
                                                                    <img
                                                                        className="cart-item-img rounded-3 m-3"
                                                                        src={process.env.PUBLIC_URL + `/Imgs/${item.proizvodId.defaultSlika}`}
                                                                        alt="slider-photo"
                                                                    />
                                                                </Col>
                                                                <Col>
                                                                    <div>
                                                                        <p className='m-3'>{item.proizvodId.naziv}</p>
                                                                        <p className='m-3'>{item.proizvodId.id}</p>
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
                                                        <p className='m-3'>Cena: {currencyFormat(item.cena)} RSD</p>
                                                    </div>
                                                );
                                            })
                                        }
                                        <hr/>
                                        <p className="text-center">Ukupna cena: {currencyFormat(fullPrice())} RSD</p>
                                    </div> : <p className='text-center text-22 mt-5'>Za ovu pordzbinu ne postoje stavke!</p>
                            }
                        </div>
                    </>
                    : <p className='mt-5 text-center'>Trenutno ne postoje podaci o ovoj porudzbini!</p>
            }
        </>
    );
}