import Header from "../../components/header";
import {useEffect, useState} from "react";
import Config from "../../../config/config";
import axios from "axios";
import Button from 'react-bootstrap/Button';

export default function PopularProducts() {
    const [popularProducts, setPopularProducts] = useState(null);
    const [p1, setP1] = useState(null);
    const [p2, setP2] = useState(null);
    const [p3, setP3] = useState(null);
    const [p4, setP4] = useState(null);
    const [p5, setP5] = useState(null);
    const [id, setId] = useState(null);
    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/popular-products`)
            .then(res => {
                setPopularProducts(res.data.data);
            })

    }, [])

    useEffect(() => {
        if (popularProducts) {
            axios.get(`${Config.api.baseUrl}v1/proizvod/${popularProducts.p1}`)
                .then(res => {
                    setP1(res.data.data);
                })
            axios.get(`${Config.api.baseUrl}v1/proizvod/${popularProducts.p2}`)
                .then(res => {
                    setP2(res.data.data)
                })
            axios.get(`${Config.api.baseUrl}v1/proizvod/${popularProducts.p3}`)
                .then(res => {
                    setP3(res.data.data)
                })
            axios.get(`${Config.api.baseUrl}v1/proizvod/${popularProducts.p4}`)
                .then(res => {
                    setP4(res.data.data)
                })
            axios.get(`${Config.api.baseUrl}v1/proizvod/${popularProducts.p5}`)
                .then(res => {
                    setP5(res.data.data)
                })
        }
    }, [popularProducts])

    function handleUpdate(index) {
        axios.put(`${Config.api.baseUrl}v1/popular-products/${index}`, {index: id}, {
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        }).then((response) => {
            if (response.status === 200) {
                alert("Uspesan update!");
            } else {
                alert("Neuspesan update!");

            }
            window.location.reload();
        });
    }

    return (
        <>
            <Header/>
            <div className='m-5'>
                {
                    popularProducts &&
                        <>
                            <p>Najprodavaniji proizvodi:</p>
                                <form onSubmit={()=>handleUpdate(1)}>
                                    <span className='mx-2'>Id: {popularProducts.p1}</span>
                                    <span className='mx-2'>Naziv: {p1.naziv}</span>
                                    <span className='mx-2'>Brend: {p1.brend}</span>
                                    <span className='mx-2'>Kategorija: {p1.kategorija}</span>
                                    <input className='m-3' type='text' onChange={(e) => setId(e.target.value)}/>
                                    <Button type='submit'>Update id</Button>
                                </form>
                            <form onSubmit={()=>handleUpdate(2)}>
                                <span className='mx-2'>Id: {popularProducts.p2}</span>
                                <span className='mx-2'>Naziv: {p2.naziv}</span>
                                <span className='mx-2'>Brend: {p2.brend}</span>
                                <span className='mx-2'>Kategorija: {p2.kategorija}</span>
                                <input className='m-3' type='text' onChange={(e) => setId(e.target.value)}/>
                                <Button type='submit'>Update id</Button>
                            </form>
                            <form onSubmit={()=>handleUpdate(3)}>
                                <span className='mx-2'>Id: {popularProducts.p3}</span>
                                <span className='mx-2'>Naziv: {p3.naziv}</span>
                                <span className='mx-2'>Brend: {p3.brend}</span>
                                <span className='mx-2'>Kategorija: {p3.kategorija}</span>
                                <input className='m-3' type='text' onChange={(e) => setId(e.target.value)}/>
                                <Button type='submit'>Update id</Button>
                            </form>
                            <form onSubmit={()=>handleUpdate(4)}>
                                <span className='mx-2'>Id: {popularProducts.p4}</span>
                                <span className='mx-2'>Naziv: {p4.naziv}</span>
                                <span className='mx-2'>Brend: {p4.brend}</span>
                                <span className='mx-2'>Kategorija: {p4.kategorija}</span>
                                <input className='m-3' type='text' onChange={(e) => setId(e.target.value)}/>
                                <Button type='submit'>Update id</Button>
                            </form>
                            <form onSubmit={()=>handleUpdate(5)}>
                                <span className='mx-2'>Id: {popularProducts.p5}</span>
                                <span className='mx-2'>Naziv: {p5.naziv}</span>
                                <span className='mx-2'>Brend: {p5.brend}</span>
                                <span className='mx-2'>Kategorija: {p5.kategorija}</span>
                                <input className='m-3' type='text' onChange={(e) => setId(e.target.value)}/>
                                <Button type='submit'>Update id</Button>
                            </form>
                        </>
                }
            </div>
        </>
    );
}