
import React from 'react'; 
import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function PasswordRecovery(props){

    const [email, setEmail] = useState("") 

    function recover(e){
        e.preventDefault() 
        props.recoverPassword(email) 
    }

    return (
        <div className="Login">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted"> 
                    </Form.Text>
                </Form.Group>  
                <Button onClick={(e) => recover(e)} > recover password </Button>
            </Form>
        </div>
    )
}

export default PasswordRecovery