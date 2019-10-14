
import React from 'react'; 
import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function PasswordRecovery(props){

    const [email, setEmail] = useState("") 
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const CONFIRMATION = `If the provided email address matches an account's verified email address, you'll receive an email with the username shortly.`
    const INCORRECT_EMAIL_FORMAT = 'please fix email to continue'
    
    function recover(e){
        e.preventDefault() 
        if (validateEmail(email)){

            props.recoverPassword(email) 
            setConfirmationMessage(CONFIRMATION)
            
        } else{
            setConfirmationMessage(INCORRECT_EMAIL_FORMAT)
        }

    }
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
 
    // If the provided email address matches an account's verified email address, you'll receive an email with the username shortly.


    return (
        <div className="Login">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter email to recover account and password</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted"> 
                    </Form.Text>
                </Form.Group>  
                <Button onClick={(e) => recover(e)} > recover password </Button>
            </Form>

            {confirmationMessage}
        </div>
    )
}

export default PasswordRecovery