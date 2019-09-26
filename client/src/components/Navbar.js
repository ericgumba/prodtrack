import React from 'react'; 
import {useState, useEffect} from "react" 

import Nav from 'react-bootstrap/Nav'
function Navbar(props) {


  const TIMER = "TIMER"
  const SETTINGS = "SETTINGS"
  const STATS = "STATS"
  const REGISTER = "REGISTER"
  const LOGIN = "LOGIN"

    return ( 
    <Nav
        activeKey="/home"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link onClick={ () => {props.setScreen(LOGIN)} }>Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={ () => {props.setScreen(REGISTER)} }>Register</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={ () => {props.setScreen(STATS)} }>Stats</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ props.setScreen(SETTINGS) }} >Settings</Nav.Link>
        </Nav.Item> 
        <Nav.Item>
          <Nav.Link onClick={()=>{ props.setScreen(TIMER) }} >Timer</Nav.Link>
        </Nav.Item>  
      </Nav>
    );
}
export default Navbar