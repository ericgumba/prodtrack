
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
        We'll never share your email with anyone else.
        </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
    </Form.Group> 

    <Form.Group controlId="formReenterPassword">
        <Form.Label>Re-enter Password</Form.Label>
        <Form.Control type="password" placeholder="Re-eneter Password" />
    </Form.Group> 

    <Button variant="primary" type="submit">
        Register
    </Button>
    </Form>)
}

export default Register