import React, { useRef, useState} from "react";
import history from "../../../utilities/history";
import firstLetter from "../../../utilities/util";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {MdArrowLeft, MdArrowDropDown} from 'react-icons/md';

function Filter(props) {
    const [filterActive, setFilterActive] = useState(false);
    const filter = props.filter;
    const subSectionRef = useRef();
    return (
        <>
            <Row className="pb-3">
                <Col xs="10" lg="10" onClick={() => {
                    setFilterActive(!filterActive)
                }}>
                    <p className="filter-item mb-0">{filter.name.toUpperCase()}</p>
                    <div ref={subSectionRef} className='sub-section' style={filterActive ? { height: subSectionRef.current.scrollHeight + "px"} : { height: "0px"}}>
                        {
                            filter.subTypes.map((item) => {
                                return (
                                    <p className="filter-item mt-1 mb-0">{firstLetter(item)}</p>
                                );
                            })
                        }
                    </div>
                </Col>
                <Col xs="2" lg="2" className="clickable float-end">
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
        </>
    );
}

export default Filter;
