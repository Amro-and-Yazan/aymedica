// import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


export default function ModalForm(props) {
  return (

    <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header closeButton={props.closeModal}>
        <Modal.Title>Diagnosis Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <article className="ticket">
          <h2>Patient: {props.info.patientName}</h2>
          <p>Age: {props.info.age} </p>
          <p>Gender: {props.info.gender}</p>
          <p>Conditions: {props.info.conditions.map((condition) => {
            return (
              `${condition} `
            )
          })}</p>
          <p>Symptoms: {props.info.symptoms}</p>
          <p>Date: {new Date(props.info.created_at).toLocaleDateString()}</p>
        </article>
        <Form onSubmit={(e)=> props.handleClaim(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control type="text" placeholder="Enter Diagnosis Here" onChange={props.handleDiagnosisChange}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Prescription</Form.Label>
            <Form.Control type="text" placeholder="Enter Prescription Here" onChange={props.handlePrescriptionChange}/>
          </Form.Group>
        <Button variant="primary" type="submit" >
          Send
        </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}