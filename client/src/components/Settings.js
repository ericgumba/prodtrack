import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button' 
 
function Settings(props) {
    return ( 
            <Form>
  <Row>
    <Col>
      <Form.Control placeholder="Work Length" type="number" />
    </Col>
    <Col>
      <Form.Control placeholder="Break Length" type="number" />
    </Col>
  </Row>

  <Button variant="primary" type="submit" onClick={() => props.updateSettings()} >
        Save
    </Button>
</Form> 
    );
}

export default Settings