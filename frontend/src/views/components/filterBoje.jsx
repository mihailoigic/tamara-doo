import '../../assets/css/styles.css'
import {React, useEffect, useRef, useState} from "react";
import axios from "axios";
import Config from "../../config/config";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MdArrowDropDown, MdArrowLeft} from "react-icons/md";
import {useSelector} from "react-redux";
import store from "../../app/store";
import {setFilterColor} from "../../app/store/searchParams/actions";

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

export default function FilterBoje(props) {
    const subSectionRef = useRef();
    const [boje, setBoje] = useState(null);
    const [filterActive, setFilterActive] = useState(false);
    const state = useSelector(state => state);

    useEffect(() => {
        axios.get(`${Config.api.baseUrl}v1/boje`)
            .then(res => {
                setBoje(res.data.data);
            })
    }, []);

    function handleInputChange(event) {
        const filterColors = [...state.searchParams.filterColors];
        const target = event.target;
        if (target.checked) {
            filterColors.push(target.value);
            props.setColors(current => [...current, target.value]);
            store.dispatch(setFilterColor(filterColors));
        } else {
            const niz = filterColors.filter(color => color !== target.value);
            props.setColors(current => current.filter((color) => color !== target.value));
            store.dispatch(setFilterColor(niz));
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
                        }}>Boje
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
                     style={filterActive ? {height: subSectionRef.current.scrollHeight - 300 + "px"} : {height: "0px"}}>
                    {
                        boje !== null &&
                        boje.map((item) => {
                            return (
                                <>
                                    <Row className={'filter-background'}>
                                        <Col md='8'>
                                            <label htmlFor={item.naziv}>{item.naziv}</label>
                                        </Col>
                                        <Col md='4'>
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

