import React from "react";
import '../../assets/css/styles.css';
import labels from '../../language/srb';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import filtersData from "../../data/filtersData";
import history from "../../utilities/history";

function SubHeader(props) {
    const filters = props.gender === 'Žene' ? filtersData.filters.woman : filtersData.filters.man;
    return (
        <div className="sub-header">
            <Container fluid className="sub-header-title">
                <p className="h4 ps-3 pt-3">{props.gender}</p>
            </Container>
            <Container fluid className="header-on-mouse-hover">
                <Row>
                    {
                        filters !== null && filters.categories !== undefined &&
                        filters.categories.map((item) => {
                            const label = item.label === 'Kupaći kostimi i plažni program' ? `Kupaći kostimi` : item.label;
                            return (
                                <Col className='p-1'>
                                    <p
                                        className={label.length > 20 ? 'fs-6 mt-2 sub-menu-item fw-bold' : 'fw-bold fs-6 sub-menu-item sub-item'}
                                        onClick={() => {
                                            history.push({
                                                pathname: '/product-list',
                                                state: {kategorija: item.value}
                                            })
                                        }}>{label}</p>
                                    <hr/>
                                    {
                                        item.types.map((type) => {
                                            return (
                                                <p
                                                    className='fs-6 sub-menu-item'
                                                    onClick={() => {
                                                        history.push({
                                                            pathname: '/product-list',
                                                            state: {kategorija: item.value, tip: type.value}
                                                        })
                                                    }}>{type.label}</p>
                                            );
                                        })
                                    }
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </div>
    );
}

export default SubHeader;

