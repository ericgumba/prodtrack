
import React from 'react'; 
import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function Register(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("") 
    function attemptRegister(e){
        e.preventDefault()
        console.log("USE AND PASS", {username, password})
        props.register(username, password) 
    }
    return (<Form>
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setUsername(e.target.value)}/>
        <Form.Text className="text-muted">
        We'll never share your email with anyone else.
        </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
    </Form.Group> 
 

    <Button variant="primary" type="submit" onClick={(e) => attemptRegister(e)}>
        Register
    </Button>
    </Form>)
}

export default Register