import '../../assets/css/styles.css'
import {React, useEffect, useRef, useState} from "react";
import axios from "axios";
import Config from "../../config/config";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MdArrowDropDown, MdArrowLeft} from "react-icons/md";
import {firstLetterAllWords} from "../../utilities/util";

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

export default function FilterBrendovi(props) {
    const subSectionRef = useRef();
    const [brendovi, setBrend] = useState(null);
    const [filterActive, setFilterActive] = useState(false);

    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/brend`)
            .then(res => {
                setBrend(res.data.data);
            })
    }, []);

    function handleInputChange(event) {
        const target = event.target;
        if (target.checked) {
            props.setBrands(current => [...current, target.value]);
        } else {
            props.setBrands(current => current.filter((color) => color !== target.value));
        }
    }
    return (
        <>
            <Row>
                <Col xs="10" lg="10">
                    <div
                        className='filter-boje-title ps-2 mb-2'
                        onClick={() => {
                            setFilterActive(!filterActive)
                        }}>Brendovi
                    </div>
                </Col>
                <Col xs="2" lg="2" className="clickable float-end" onClick={() => {
                    setFilterActive(!filterActive)
                }}>
                    {
                        filterActive ?
                            <MdArrowDropDown onClick={() => {
                                setFilterActive(false)
                            }}/> : <MdArrowLeft onClick={() => {
                                setFilterActive(true)
                            }}/>
                    }
                </Col>
            </Row>
            <Row className='ps-3 pe-3 pt-2'>
                <div className='filter-boje ps-3 pe-3' ref={subSectionRef}
                     style={filterActive ? {height: subSectionRef.current.scrollHeight - 100 + "px"} : {height: "0px"}}>
                    {
                        brendovi?.map((item) => {
                            return (
                                <>
                                    <Row className={'filter-background'}>
                                        <Col md='10'>
                                            <label htmlFor={item.naziv}>{firstLetterAllWords(item.naziv)}</label>
                                        </Col>
                                        <Col md='2'>
                                            <input
                                                className='float-end me-2 cursor-pointer mt-1'
                                                name={item.naziv}
                                                value={item.id}
                                                type="checkbox"
                                                onChange={handleInputChange}/>
                                        </Col>
                                    </Row>

                                </>
                            );
                        })
                    }
                </div>
            </Row>

        </>
    );
}

