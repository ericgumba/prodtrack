import React from 'react'; 
import {useState, useEffect} from "react" 

import Nav from 'react-bootstrap/Nav'
function Navbar(props) {


  const TIMER = "TIMER"
  const SETTINGS = "SETTINGS"
  const STATS = "STATS"
  const REGISTER = "REGISTER"
  const LOGIN = "LOGIN"

  let inOrOut = <Nav.Link onClick={ () => {props.setScreen(LOGIN)} }>Login</Nav.Link>

  if (props.logout){
    inOrOut = <Nav.Link onClick={ () => {props.logout() } }> {props.username} - Logout</Nav.Link>

    
  }
    return ( 
    <Nav
        activeKey="/home"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          {inOrOut}
        </Nav.Item>
{        props.logout ? null : <Nav.Item>
          <Nav.Link onClick={ () => {props.setScreen(REGISTER)} }>Register</Nav.Link>
        </Nav.Item>}
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