import React from 'react';
import Consultation from './consultation';
import ModalForm from './modal.js';
import ListGroup from 'react-bootstrap/ListGroup';
import './admin.css';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'https://ay-medica.herokuapp.com/';
const socket = io(SERVER_URL, { transports: ['websocket'] });
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffName: '',
      consultations: [],
      onlineStaff: [],
      showModal: false,
      id: 0,
      socketId: 0,
      diagnosis: '',
      prescription: ''
    };
  }
  componentDidMount() {

    const staffName = prompt("Please Enter Your Username");
    this.setState({ staffName });
    socket.on('connect', () => {

      socket.emit('join', { docName: staffName });
      socket.on('notFound', (payload) =>{
        // console.log('Hello', payload);
       const userName = prompt(`${payload.Error}`);
      
        socket.emit('join', { docName: userName });
      })
      socket.emit('getAll');
      socket.on('newConsultation', (payload) => {
        this.setState({ consultations: [...this.state.consultations, payload] });
      });
      socket.on('onlineStaff', async (payload) => {
        // console.log(payload);
        await this.setState({ onlineStaff: [...this.state.onlineStaff, payload] });
        // console.log(this.state);
      });
      socket.on('closed', (payload) => {
        // console.log('hello',payload);
        this.setState({
          consultations: this.state.consultations.filter((cons) => cons.id !== payload),
        });
      })
      socket.on('offlineStaff', (payload) => {
        this.setState({
          onlineStaff: this.state.onlineStaff.filter((staff) => staff.id !== payload.id),
        });
      });
    });
  }
  handleClaim = (e) => {
    e.preventDefault();

    socket.emit('diagnose', {
      id: this.state.id,
      docName: this.state.staffName,
      patientId: this.state.socketId,
      diagnosis: this.state.diagnosis,
      prescription: this.state.prescription
    });

    this.setState({
      showModal: false,
      consultations: this.state.consultations.filter((cons) => cons.id !== this.state.id)
    })
  };

  handleShowModal = (id, socketId) => {
    this.setState({
      showModal: true,
      id: id,
      socketId: socketId
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  handleDiagnosisChange = (e) => {
    this.setState({ diagnosis: e.target.value });
  };

  handlePrescriptionChange = (e) => {
    this.setState({ prescription: e.target.value });
  };

  render() {
    return (
      <main className="admin-container1">
        <section id="container">
          <h2 id="consults">Pending Consults</h2>
          <section id="tickets">
            {this.state.consultations.map((consultation) => {
              return (<>
                <Consultation {...consultation} handleShowModal={this.handleShowModal} key={consultation.id} />

                {this.state.showModal &&
                  <ModalForm info={this.state.consultations.find(element => {
                    return element.id == this.state.id;
                  })} showModal={this.state.showModal} closeModal={this.handleClose} handleClaim={this.handleClaim} handleDiagnosisChange={this.handleDiagnosisChange} handlePrescriptionChange={this.handlePrescriptionChange} />
                }
              </>
              );
            })}
          </section>
        </section>
        <aside id="online-staff">
          <h2 id="avDoc">Available Doctors</h2>
          <ListGroup>
            {this.state.onlineStaff.map((staff) => (

              <ListGroup.Item action variant="info">
                <h2 key={staff.id}>{staff.docName}</h2>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </aside>
      </main>
    );
  }
}

export default Admin;