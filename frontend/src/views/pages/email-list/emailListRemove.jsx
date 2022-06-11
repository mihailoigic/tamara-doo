import React from "react";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Config from "../../../config/config";

function EmailListRemove() {
    const email = window.location.pathname.split("/");
    console.log(email);
    axios.delete(`${Config.api.baseUrl}v1/email-list/${email[3]}`, {
        headers: {"Authorization": localStorage.getItem("BearerToken")}
    })

    return (
        <Container fluid className='mt-5'>
            <p>Uspešno ste obrisani sa mailing liste!</p>
        </Container>
    );
}

export default EmailListRemove;

