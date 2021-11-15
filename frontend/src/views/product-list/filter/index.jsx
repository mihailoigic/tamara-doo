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
                <Col xs="10" lg="10" >
                    <p className="filter-item mb-0" onClick={()=>{
                        props.parent.setState({ kategorija: filter.value, tip: null })
                        setFilterActive(!filterActive)
                    }}>{filter.label.toUpperCase()}</p>
                    <div ref={subSectionRef} className='sub-section'
                         style={filterActive ? {height: subSectionRef.current.scrollHeight + "px"} : {height: "0px"}}>
                        {
                            filter.types.map((item) => {
                                return (
                                    <p className="filter-item mt-1 mb-0" onClick={()=>props.parent.setState({ tip: item.value, kategorija: filter.value })}>{firstLetter(item.label)}</p>
                                );
                            })
                        }
                    </div>
                </Col>
                <Col xs="2" lg="2" className="clickable float-end" onClick={() => {setFilterActive(!filterActive)}}>
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
