import React, { ReactElement } from 'react';
import labels from '../../language/srb';
import { withRouter } from 'react-router-dom';
import Header from '../components/header';
import Container from 'react-bootstrap/Container';
import Footer from '../components/footer';

const NotFoundPage: React.FC = (): ReactElement => {

    return (
        <>
            <Header />
            <Container fluid >
                <div className="container mt5 text-center pb-5 pt-5">
                    <p className="h2">{labels.pageNotFoundMessage}</p>
                </div>
            </Container>
            <Footer />
        </>

    );
};

export default (withRouter(NotFoundPage));