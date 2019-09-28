
import React from 'react'; 
import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function Register(props){
    return (<Form>
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted"> 
        </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
    </Form.Group>  

    <Button variant="primary" type="submit">
        Login
    </Button>
    </Form>
    )
}

export default Register