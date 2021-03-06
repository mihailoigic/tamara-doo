import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Config from "../../../config/config";
import {scrollToTop} from "../../../utilities/util";

function EmailList() {
    const [emails, setEmails] = useState(null);

    useEffect(() => {
        scrollToTop();
        axios.get(`${Config.api.baseUrl}v1/email-list`, {
            headers: {"Authorization": localStorage.getItem("BearerToken")}
        }).then(res => {
            setEmails(res.data.data);
        })
    }, [])
    return (
        <Container fluid className='mt-5'>
            {
                emails &&
                    emails.map((email)=>{
                        return(
                            <p>{`${email.email}, `}</p>
                        );
                    })
            }
        </Container>
    );
}

export default EmailList;

