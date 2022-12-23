import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Config from "../../../config/config";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import history from "../../../utilities/history";

export default function OrdersPage () {
    const [status, setStatus] = useState('active');
    const [orders, setOrders] = useState([]);
    const [brojKupovine, setBrojKupovine] = useState('');

    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/checkout`, {
            body: {
                status: status
            },
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        }).then(res => {
            setOrders(res.data.data);
        })
    },[]);

    useEffect(() => {
        if (status) {
                axios.get(`${Config.api.baseUrl}v1/checkout?status=${status}`, {
                    headers: {"Authorization": localStorage.getItem("BearerToken")}
                }).then(res => {
                    setOrders(res.data.data);
                }).catch(err => {
                    setOrders([]);
                });
        }
    },[status]);

    useEffect(() => {
        if (brojKupovine) {
            axios.get(`${Config.api.baseUrl}v1/checkout?brojKupovine=${brojKupovine}`, {
                headers: {"Authorization": localStorage.getItem("BearerToken")}
            }).then(res => {
                setOrders(res.data.data);
            }).catch(err => {
                setOrders([]);
            });
        }
    },[brojKupovine]);

    return(
        <>
            <div className='d-flex mt-5 container justify-content-between width-350'>
                <Button className='max-width-100' onClick={()=>{
                    setBrojKupovine('');
                    setStatus('active');
                }}>
                    Aktivne
                </Button>
                <Button className='max-width-100' onClick={()=>{
                    setBrojKupovine('');
                    setStatus('canceled');
                }}>
                    Otkazane
                </Button>
                <Button className='max-width-100' onClick={()=>{
                    setBrojKupovine('');
                    setStatus('success');
                }}>
                    Uspesne
                </Button>
            </div>
            <div className='d-flex mt-5 container justify-content-center width-350'>
                <Col md='4 mt-3'>
                    <input className='w-100 mt-1' type='text' id='pretragaOrdera'/>
                </Col>
                <Col md='4 mt-3 text-center'>
                    <Button className='mx-2'
                            onClick={() => {
                                setStatus('');
                                setBrojKupovine(document.getElementById('pretragaOrdera').value);
                            }}>Pretraži</Button>
                </Col>
            </div>
            <Row className='text-center bg-masa mt-2'>
                <Col md='3' className='py-2 p-0'>Broj kupovine:</Col>
                <Col md='2' className='py-2 p-0'>Status:</Col>
                <Col md='2' className='py-2 p-0'>Ime:</Col>
                <Col md='2' className='py-2 p-0'>Prezime:</Col>
                <Col md='3' className='py-2 p-0'>Telefon:</Col>
            </Row>

            <div className='show-table'>
                {
                    orders && orders.map((order) => {
                        return (
                            <Row className='text-center border mt-2 cursor-pointer' onClick={()=> history.push(`/order/${order.brojKupovine}`)}>
                                <Col md='3' className='py-2 p-0'>{order.brojKupovine}</Col>
                                <Col md='2' className='py-2 p-0'>{order.status}</Col>
                                <Col md='2' className='py-2 p-0'>{order.korisnikId.ime}</Col>
                                <Col md='2' className='py-2 p-0'>{order.korisnikId.prezime}</Col>
                                <Col md='3' className='py-2 p-0'>{order.korisnikId.telefon}</Col>
                            </Row>
                        );

                    })
                }
            </div>
        </>
    );
}