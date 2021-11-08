import React, {useRef, useState} from "react";
import history from "../../../utilities/history";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {MdArrowLeft, MdArrowDropDown} from 'react-icons/md';
import {firstLetter} from "../../../utilities/util";

function Filter(props) {
    const [filterActive, setFilterActive] = useState(false);
    const {filter} = props;
    const subSectionRef = useRef();
    return (
        <>
            <Row className="pb-3">
                <Col xs="10" lg="10" onClick={() => {
                    setFilterActive(!filterActive)
                }}>
                    <p className="filter-item mb-0">{filter.name.toUpperCase()}</p>
                    <div ref={subSectionRef} className='sub-section'
                         style={filterActive ? {height: subSectionRef.current.scrollHeight + "px"} : {height: "0px"}}>
                        {
                            filter.types.map((item) => {
                                return (
                                    <p className="filter-item mt-1 mb-0">{firstLetter(item)}</p>
                                );
                            })
                        }
                    </div>
                </Col>
                <Col xs="2" lg="2" className="clickable float-end">
                    {
                        filter.types.length > 0 &&
                        <>
                            {
                                filterActive ?
                                    <MdArrowDropDown onClick={() => {
                                        setFilterActive(false)
                                    }}/> : <MdArrowLeft onClick={() => {
                                        setFilterActive(true)
                                    }}/>
                            }
                        </>
                    }

                </Col>
            </Row>
        </>
    );
}

export default Filter;
