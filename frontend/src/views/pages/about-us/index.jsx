import React, {useEffect} from "react";
import '../../../assets/css/styles.css';
import labels from '../../../language/srb';
import Container from 'react-bootstrap/Container';
import Header from "../../components/header";
import Footer from "../../components/footer";
import {scrollToTop} from "../../../utilities/util";

function AboutUsPage() {

    useEffect(() => {
        scrollToTop();
    }, [])

    return (
        <>
            <Header />
            <Container className="mt-5">
                <p className="about-us-logo text-center">Tamara d.o.o.</p>
                <p className="h3 ff-releway">{labels.aboutUs}</p>
                <div className="ff-arial">
                    <p>Dobrodošli na zvaničnu web prezentaciju veleprodaje Tamara. Ovde možete naći sve ono što vas zanima od najboljih italijanskih brendova muškog i ženskog donjeg veša kao i čarapa i kupaćih kostima. Ako Vas zanima istorijat naše firme posetite našu stranicu O nama, ako ste zainteresovani da nas kontaktirate kliknite na stranicu Kontakt. Na stranici Asortiman možete videti našu kompletnu ponudu. Uživajte i nadamo se budućoj saradnji sa Vama!</p>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default AboutUsPage;
