import React, { useState } from "react";
import history from "../../../utilities/history";
import firstLetter from "../../../util/util";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MdArrowLeft, MdArrowDropDown } from 'react-icons/md';

function Filter(props) {
    const [filterActive, setFilterActive] = useState(false);
    const filter = props.filter;

    return (
        <>
            <Row className="pb-3">
                <Col lg="10" onClick={() => { setFilterActive(!filterActive) }}>
                    <p className="filter-item mb-0">{filter.name.toUpperCase()}</p>
                    {
                        filterActive &&
                        <div className="sub-section">
                            {
                                filter.subTypes.map((item) => {
                                    return (
                                        <p className="filter-item mt-1 mb-0">{firstLetter(item)}</p>
                                    );
                                })
                            }

                        </div>
                    }
                </Col>
                <Col lg="2" className="clickable text-center">
                    {
                        filterActive ?
                            <MdArrowDropDown onClick={() => { setFilterActive(false) }} /> : <MdArrowLeft onClick={() => { setFilterActive(true) }} />
                    }
                </Col>
            </Row>
        </>
    );
}

export default Filter;
