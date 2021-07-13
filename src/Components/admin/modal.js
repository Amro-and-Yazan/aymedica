import { Modal, Button, Form } from 'react-bootstrap';
import './modal.css';


export default function ModalForm(props) {
  return (

    <Modal show={props.showModal} onHide={props.closeModal} >
      <Modal.Header closeButton={props.closeModal}>
        <Modal.Title>Diagnosis Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <article >
          <h2 id="middle">Patient: {props.info.patientName}</h2>
          <p className="textz">Age: {props.info.age} </p>
          <p className="textz">Gender: {props.info.gender}</p>
          <p className="textz">Conditions: {props.info.conditions.map((condition) => {
            return (
              `${condition} `
            )
          })}</p>
          <p className="textz">Symptoms: {props.info.symptoms}</p>
          <p className="textz">Date: {new Date(props.info.created_at).toLocaleDateString()}</p>
        </article>
        <Form onSubmit={(e)=> props.handleClaim(e)} id="modal">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="labelz">Diagnosis</Form.Label>
            <Form.Control type="text" placeholder="Enter Diagnosis Here" onChange={props.handleDiagnosisChange}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="labelz">Prescription</Form.Label>
            <Form.Control type="text" placeholder="Enter Prescription Here" onChange={props.handlePrescriptionChange}/>
          </Form.Group>
        <Button variant="outline-dark" type="submit" id="button2" >
          Send
        </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}