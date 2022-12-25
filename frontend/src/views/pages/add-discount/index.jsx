import Header from "../../components/header";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Config from "../../../config/config";
import {getValueFromMultiSelect, prepareForSelect} from "../../../utilities/util";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddDiscountPage() {
    const [apiCategories, setApiCategories] = useState(null);
    const [apiBrands, setApiBrands] = useState(null);
    const [apiColors, setApiColors] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/kategorijatip?pol=zenski`)
            .then(res => {
                setApiCategories(prepareForSelect(res.data.data, true));
            })
        axios.get(`${Config.api.baseUrl}v1/brend`)
            .then(res => {
                setApiBrands(prepareForSelect(res.data.data));
            })
        // axios.get(`${Config.api.baseUrl}v1/boje`)
        //     .then(res => {
        //         setApiColors(prepareForSelect(res.data.data));
        //     })
    }, [])

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const kategorije = getValueFromMultiSelect(form.kategorije);
        const brendovi = getValueFromMultiSelect(form.brendovi);
        // const boje = getValueFromMultiSelect(form.boje);
        const procenat = (form.procenat.value / 100);
        const naziv = form.naziv.value;

        axios.post(`${Config.api.baseUrl}v1/add-discount`, {
            kategorije: kategorije,
            brendovi: brendovi,
            // boje: boje,
            datumOd: startDate,
            datumDo: endDate,
            procenat: procenat,
            naziv: naziv
            }, {
                headers: {'Authorization': localStorage.getItem('BearerToken')}
            }
        ).then((response) => {
            if (response.status === 200) ;
            alert("Uspesno dodat popust!");
            window.location.reload();
        });
    }
    return (
        <>
            <Header />
            <div className='mt-5'>
                <form onSubmit={handleSubmit} className="d-flex flex-column m-5">
                    <div className='m-3'>
                        <p>Naziv: </p>
                        <input type='text' name='naziv' />
                    </div>
                    <div className='m-3'>
                        <Form.Label>Kategorije:</Form.Label>
                        <Select
                            isMulti
                            name="kategorije"
                            options={apiCategories}
                            className="basic-multi-select"
                            placeholder="Izaberi.."
                        />
                    </div>
                    <div className='m-3'>
                        <Form.Label>Brendovi:</Form.Label>
                        <Select
                            isMulti
                            name="brendovi"
                            options={apiBrands}
                            className="basic-multi-select"
                            placeholder="Izaberi.."
                        />
                    </div>
                    {/*<div className='m-3'>*/}
                    {/*    <Form.Label>Boje:</Form.Label>*/}
                    {/*    <Select*/}
                    {/*        isMulti*/}
                    {/*        name="boje"*/}
                    {/*        options={apiColors}*/}
                    {/*        className="basic-multi-select"*/}
                    {/*        placeholder="Izaberi.."*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className='m-3'>
                        <p>Procenat: </p>
                        <input type='text' name='procenat' /> <span>%</span>
                    </div>
                    <div className='m-3'>
                        <p>Datum od:</p>
                        <DatePicker
                            selected={startDate}
                            onChange={(date:Date) => setStartDate(date)}
                            showTimeSelect
                            dateFormat="Pp" />
                    </div>
                    <div className='m-3'>
                        <p>Datum od:</p>
                        <DatePicker
                            selected={endDate}
                            onChange={(date:Date) => setEndDate(date)}
                            showTimeSelect
                            dateFormat="Pp" />
                    </div>
                    <div className='text-center'>
                        <Button type='submit' className='max-width-300'>Primeni popust</Button>
                    </div>
                </form>
            </div>
        </>
    );
}