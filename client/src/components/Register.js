
import React from 'react'; 
import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function Register(props){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("") 
    function attemptRegister(e){
        e.preventDefault()
        console.log("USE AND PASS", {username, password})
        props.register(username, email, password) 
    }
    return (
    
    <div className="Register">

    <Form>
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
        <Form.Text className="text-muted"> 
        </Form.Text>
    </Form.Group>
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter Email (OPTIONAL)" onChange={(e) => setEmail(e.target.value)}/>
        <Form.Text className="text-muted"> 
        </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
    </Form.Group> 
 

    <Button variant="primary" type="submit" onClick={(e) => attemptRegister(e)}>
        Register
    </Button>
    </Form>
    </div>
    )
}

export default Register