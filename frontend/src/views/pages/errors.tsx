import React, { ReactElement } from 'react';
import Header from '../components/header';
import Container from 'react-bootstrap/Container';
import Footer from '../components/footer';
import labels from '../../language/srb';

const ErrorsPage: React.FC = (): ReactElement => {

    return (
        <>
            <Header />
            <Container fluid >
                <div className="container mt5 text-center pb-5 pt-5">
                    <p className="h2">{labels.errorPageTitle}</p>
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default ErrorsPage;