
import React from 'react'; 
import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function Register(props){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function attemptLogin(e){
        e.preventDefault()
        console.log("USE AND PASS", {username, password})
        props.login(username, password) 
    }

    return (
    <div className="Login">

    <Form>
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        <Form.Text className="text-muted"> 
        </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
    </Form.Group>  

  <Button variant="primary" type="submit" onClick={(e) => attemptLogin(e)} >
        Login
    </Button>
    <Button onClick={props.forgotPasswordClicked} > forgot password </Button>
    </Form>
    </div>
    )
}

export default Register