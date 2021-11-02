import React, { ReactElement } from 'react';
import labels from '../../language/srb';
import Header from '../components/header';
import Container from 'react-bootstrap/Container';
import Footer from '../components/footer';

const MaintenancePage: React.FC = (): ReactElement => {
    window.history.pushState({}, document.title, window.location.pathname);

    return (
        <>
            <Header />
            <Container fluid >
                <div className="container mt5 text-center pb-5 pt-5">
                    <p className="h2">{labels.maintenanceMessage}</p>
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default MaintenancePage;