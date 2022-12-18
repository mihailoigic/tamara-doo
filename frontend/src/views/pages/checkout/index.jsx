import Header from "../../components/header";
import React, {useState} from "react";
import Footer from "../../components/footer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Config from "../../../config/config";

export default function CheckoutPage() {
    const [successfulCheckout, setSuccessfulCheckout] = useState(false);
    const [brojKupovine, setBrojKupovine] = useState('000000');

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        const korisnik = {};
        korisnik.ime = form.ime.value;
        korisnik.prezime = form.prezime.value;
        korisnik.adresa = form.adresa.value;
        korisnik.grad = form.grad.value;
        korisnik.stan = form.stan.value;
        korisnik.telefon = form.telefon.value;
        korisnik.email = form.email.value;

        const cartItems = JSON.parse(localStorage.getItem("cartItems"));

        axios.post(`${Config.api.baseUrl}v1/checkout`, {
                korisnik: korisnik,
                napomena: form.napomena.value,
                cartItems: cartItems
            }
        ).then((response) => {
            if (response.status === 200) ;
            setSuccessfulCheckout(true);
            setBrojKupovine(response.data.data.id);
        });
    }
    return (
        <>
            <Header/>
            {
                successfulCheckout ?
                    <div className='container-fluid mt-5 text-center'>
                        <p>Uspesno ste porucili proizvode iz korpe! Javicemo Vam se u najkracem mogucem roku!</p>
                        <p>Vas broj kupovine je: {brojKupovine}</p>
                    </div> :
                    <div className='container-fluid checkout-block mt-5 d-flex'>
                        <form onSubmit={handleSubmit} className="mb-5 flex-column justify-content-center">
                            <Form.Group controlId="ime">
                                <Form.Label>Ime:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Ime"
                                />
                            </Form.Group>
                            <Form.Group controlId="prezime">
                                <Form.Label>Prezime:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Prezime"
                                />
                            </Form.Group>
                            <Form.Group controlId="adresa">
                                <Form.Label>Adresa:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Adresa"
                                />
                            </Form.Group>
                            <Form.Group controlId="grad">
                                <Form.Label>Grad:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Grad"
                                />
                            </Form.Group>
                            <Form.Group controlId="stan">
                                <Form.Label>Broj stana/sprat:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Broj stana/sprat"
                                />
                            </Form.Group>
                            <Form.Group controlId="telefon">
                                <Form.Label>Kontakt telefon:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Kontakt telefon"
                                />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="E-mail"
                                />
                            </Form.Group>
                            <Form.Group controlId="napomena">
                                <Form.Label>Napomena:</Form.Label>
                                <Form.Control as="textarea" defaultValue=" " required/>
                            </Form.Group>
                            <div className='mt-2 text-center'>
                                <Button type="submit">Poruči</Button>
                            </div>
                        </form>
                    </div>
            }
            <Footer/>
        </>
    );
}