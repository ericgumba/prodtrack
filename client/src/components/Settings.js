import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button' 
import '../App.css';
import Card from 'react-bootstrap/Card'

function Settings(props) {

  const [workDef, setWorkDef] = useState(props.workDefinition)
  const [breakDef, setBreakDef] = useState(props.breakDefinition)
  const [longBreakDef, setLongBreakDef ] = useState(props.longBreakDefinition)
  const [longBreakPeriods, setLongBreakPeriods] = useState(props.longBreakPeriods)

  function updateSettings(e) {
    e.preventDefault()

    if (workDef <= 0){
      alert("error, work cannot be less than a minute long, you slouch!")
    }
    else{
    props.setTimerWorkMinutesLeft(workDef)
    props.setTimerBreakMinutesLeft(breakDef)
    props.setTimerSecondsLeft(0)
    props.setTimerIsInWorkMode(true)
    props.setWorkDefinition(workDef)
    props.setBreakDefinition(breakDef)
    props.setLongBreakDefinition(longBreakDef)
    props.setLongBreakPeriods(longBreakPeriods)
    
  }

  }

  function settingCard(){
    return (
      <Card bg="light" style={{ width: '18rem' }}>
          <Card.Header>Current Settings</Card.Header>
          <Card.Body> 
            <Card.Text> 
              Work sessions: {props.workDefinition} minutes 
  <br />

              Short breaks: {props.breakDefinition} minutes 
  <br />

              Long breaks: {props.longBreakDefinition} minutes 
  <br />
             <strong>
               You are set to take a long break for every {props.longBreakPeriods} work sessions you complete.
               </strong> 
            </Card.Text>
          </Card.Body>
        </Card>

    )
  }
    return ( 

      <div className="Settings">


        {settingCard()}


  <br />

            <Form>
  <Row>
    <Col>
      <Form.Control placeholder="Work Length" type="number" onChange={(e) => setWorkDef(e.target.value)} />
    </Col>
  </Row>
  <Row>

    <Col>
      <Form.Control placeholder="Short Break Length" type="number" onChange={(e) => setBreakDef(e.target.value)} />
    </Col>
  </Row>
  <Row>

    <Col>
      <Form.Control placeholder="Long Break Length" type="number" onChange={(e) => setLongBreakDef(e.target.value)} />
    </Col>
  </Row>
  <Row>

    <Col>
      <Form.Control placeholder="Long Break periods" type="number" onChange={(e) => setLongBreakPeriods(e.target.value)} />
    </Col>
  </Row>

  <Button variant="primary" type="submit" onClick={(e) => updateSettings(e)} >
        Save
    </Button>
</Form>
</div> 
    );
}

export default Settings