import React from "react";
import '../../assets/css/styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import history from "../../utilities/history";
import {firstLetter} from "../../utilities/util";
import store from "../../app/store";
import {setKategorijaTipSearchParam, setPolSearchParams} from "../../app/store/searchParams/actions";

function SubHeader(props) {
    return (
        <div className="sub-header">
            <Container fluid className="sub-header-title">
                <p className="h4 ps-3 pt-3">{props.gender === 'zenski' ? 'Žene' : 'Muškarci'}</p>
            </Container>
            <Container fluid className="header-on-mouse-hover">
                <Row>
                    {
                        props.data !== null && props.data !== undefined &&
                        props.data.map((item) => {
                            const label = item.label === 'Kupaći kostimi i plažni program' ? `Kupaći kostimi` : item.label;
                            return (
                                <Col className='p-1'>
                                    <p
                                        className={label.length > 20 ? 'fs-6 mt-2 sub-menu-item fw-bold' : 'fw-bold fs-6 sub-menu-item sub-item'}
                                        onClick={() => {
                                            store.dispatch(setKategorijaTipSearchParam(item.value, 0));
                                            history.push({pathname: '/product-list'});
                                        }}>{label}</p>
                                    <hr/>
                                    {
                                        item.tip.map((type) => {
                                            return (
                                                <p
                                                    className='fs-6 sub-menu-item'
                                                    onClick={() => {
                                                        store.dispatch(setPolSearchParams(props.gender));
                                                        store.dispatch(setKategorijaTipSearchParam(item.value, type.value));
                                                        history.push({pathname: '/product-list'});
                                                    }}>{firstLetter(type.label)}</p>
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

