import React from 'react';
import './home.css';
import io from 'socket.io-client';
import { Form, Col, Button } from 'react-bootstrap';
const SERVER_URL = process.env.SERVER_URL || 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: '',
      conditions:[]
    };
  }
  componentDidMount() {
    let patientName;
    while(!patientName){
      patientName = prompt("Please Enter Patient's Full Name");
    }
    this.setState({ patientName });
    socket.on('connect', () => {
      socket.on('diagnosed', function (payload) {
        alert(`Dr. ${payload.docName} diagnosed your case as follows: (${payload.diagnosis}) and prescribed (${payload.prescription})`);
      });
    });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleConditionsChange = (e) => {
    if(e.target.checked){
      this.setState({ 
        conditions: [...this.state.conditions, e.target.value]
       });
    } else if(!e.target.checked && this.state.conditions.includes(e.target.value)){
      this.setState({
        conditions: this.state.conditions.filter(element=>{
          return element !== e.target.value;
        })
      })
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...this.state,
      created_at: Date.now(),
    };
    console.log('Consult', payload);
    
    socket.emit('createConsultation', payload);
  };

  render() {
    return (
      <Form className='form' onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="bolderLabel">Full Name</Form.Label>
            <Form.Control required type="text" value={this.state.patientName} onChange={this.handleChange} name="name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="bolderLabel">Age</Form.Label>
            <Form.Control required type="number" placeholder="Enter Your Age" onChange={this.handleChange} name="age" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Label className="bolderLabel">Gender</Form.Label>
          <Form.Check  required
            type="radio"
            value="Male"
            label="Male"
            name="gender"
            onChange={this.handleChange}
          />
          <Form.Check 
            type="radio"
            value="Female"
            label="Female"
            name="gender"
            onChange={this.handleChange}
          />
        </Form.Row>
        <Form.Row>
          <Form.Label className="bolderLabel">Check the conditions that apply to you or to any members of your immediate relatives:</Form.Label>
          <Form.Check
            type="checkbox"
            value="Asthma"
            label="Asthma"
            name="conditions"
            onChange={this.handleConditionsChange}
          />
          <Form.Check
            type="checkbox"
            value="Cancer"
            label="Cancer"
            name="conditions"
            onChange={this.handleConditionsChange}
          />
          <Form.Check
            type='checkbox'
            value="Cardiac disease"
            label="Cardiac disease"
            name="conditions"
            onChange={this.handleConditionsChange}
          />
          <Form.Check 
            type="checkbox"
            value="Diabetes"
            label="Diabetes"
            name="conditions"
            onChange={this.handleConditionsChange}
          />
          <Form.Check
            type="checkbox"
            value="Hypertension"
            label="Hypertension"
            name="conditions"
            onChange={this.handleConditionsChange}
          />
          <Form.Check
            type='checkbox'
            value="Epilepsy"
            label="Epilepsy"
            name="conditions"
            onChange={this.handleConditionsChange}
          />
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="bolderLabel">Please enter your symptoms in details:</Form.Label>
            <Form.Control required as="textarea" rows={3} onChange={this.handleChange} name="symptoms" />
          </Form.Group>
          </Form.Row>
        <Button variant="outline-dark" type="submit" className="button1">
          Submit
        </Button>
      </Form>
    );
  }
}

export default Home;