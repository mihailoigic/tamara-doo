import '../../assets/css/styles.css'
import {React, useEffect, useRef, useState} from "react";
import axios from "axios";
import Config from "../../config/config";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MdArrowDropDown, MdArrowLeft} from "react-icons/md";

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
            let state;
            if (props.state.state.brendState === '') {
                state = `${target.value}`;
            } else {
                state = `${props.state.state.brendState},${target.value}`;
            }
            props.state.setState({brendState: state});
        } else {
            let state = props.state.state.brendState.split(',');
            for (var i = 0; i < state.length; i++) {
                if (state[i] === target.value) {
                    state[i] = '';
                }
            }
            let string = '';
            state.forEach((item, index) => {
                if (item !== '') {
                    if (index === state.length-2) {
                        if (state[index+1] === '') {
                            string = `${string}${item}`;
                        } else {
                            string = `${string}${item},`;
                        }
                    } else {
                        if (index === state.length-1) {
                            string = `${string}${item}`;
                        } else {
                            string = `${string}${item},`;
                        }
                    }
                }
            })
            if (string.length === 1) {

            }
            props.state.setState({brendState: string});
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
                            props.state.setState({ filterState: false })
                        }}>Brendovi
                    </div>
                </Col>
                <Col xs="2" lg="2" className="clickable float-end" onClick={() => {
                    setFilterActive(!filterActive)
                    props.state.setState({ filterState: false })
                }}>
                    {
                        filterActive && !props.state.state.filterState ?
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
                     style={filterActive && !props.state.state.filterState ? {height: subSectionRef.current.scrollHeight - 100 + "px"} : {height: "0px"}}>
                    {
                        brendovi?.map((item) => {
                            return (
                                <>
                                    <Row>
                                        <Col md='6'>
                                            <label htmlFor={item.naziv}>{item.naziv}</label>
                                        </Col>
                                        <Col md='6'>
                                            <input
                                                className='float-end me-2 cursor-pointer'
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

