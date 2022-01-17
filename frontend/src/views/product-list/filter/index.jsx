import React, {useRef, useState} from "react";
import history from "../../../utilities/history";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {MdArrowLeft, MdArrowDropDown} from 'react-icons/md';
import {firstLetter} from "../../../utilities/util";
import store from "../../../app/store";
import {
    setKategorijaTipSearchParam,
    setPolSearchParams,
} from "../../../app/store/searchParams/actions";

function Filter(props) {
    const [searchParams, setSearchParams] = useState(null);
    const [filterActive, setFilterActive] = useState(false);
    const {filter, mobile = false, gender='zenski'} = props;
    const subSectionRef = useRef();
    return (
        <>
            <Row className="pb-3">
                <Col xs="10" lg="10">
                    <p className="filter-item mb-0 pt-1" onClick={() => {
                        store.dispatch(setKategorijaTipSearchParam(filter.value,0));
                        setFilterActive(!filterActive)
                    }}>{filter.label.toUpperCase()}</p>
                    <div ref={subSectionRef} className='sub-section'
                         style={filterActive ? {height: subSectionRef.current.scrollHeight + "px"} : {height: "0px"}}>
                        {
                            filter.tip.map((item) => {
                                return (
                                    <p className="filter-item mt-1 mb-0" onClick={() => {
                                        store.dispatch(setPolSearchParams(gender));
                                        store.dispatch(setKategorijaTipSearchParam(filter.value, item.value));
                                    }}>{firstLetter(item.label)}</p>
                                );
                            })
                        }
                    </div>
                </Col>
                <Col xs="2" lg="2" className="clickable float-end" onClick={() => {
                    setFilterActive(!filterActive)
                }}>
                    {
                        filter.tip.length > 1 &&
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
