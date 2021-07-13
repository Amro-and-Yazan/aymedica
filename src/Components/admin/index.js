import React from 'react';
import Consultation from './ticket';
import ModalForm from './modal.js';
import './admin.css';
import io from 'socket.io-client';
const socket = io('localhost:5000/', { transports: ['websocket'] });
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffName: '',
      consultations: [],
      onlineStaff: [],
      showModal: false,
      id:0,
      socketId:0,
      diagnosis:'',
      prescription:''
    };
  }
  componentDidMount() {
    // run once when component is mounted
    const staffName = prompt("Please Enter Doctor's Name");
    this.setState({ staffName });
    socket.on('connect', () => {
      //1a
      socket.emit('join', { name: staffName });
      socket.emit('getAll');
      socket.on('newConsultation', (payload) => {
        this.setState({ consultations: [...this.state.consultations, payload] });
      });
      socket.on('onlineStaff', (payload) => {
        this.setState({ onlineStaff: [...this.state.onlineStaff, payload] });
      });
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
      id:this.state.id, 
      docName: this.state.staffName, 
      patientId: this.state.socketId,
      diagnosis:this.state.diagnosis,
      prescription:this.state.prescription });

    this.setState({
      showModal:false
    })
  };

  handleShowModal = (id, socketId)=>{
    this.setState({
      showModal: true,
      id:id,
      socketId:socketId
    })
    
  }

  handleClose = ()=>{
    this.setState({
      showModal:false
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
          <h2>Opened Consults</h2>
          <section id="tickets">
            {this.state.consultations.map((consultation) => {
              return (<>
                <Consultation {...consultation} handleShowModal={this.handleShowModal} key={consultation.id} />
                
                {this.state.showModal &&
                <ModalForm info={this.state.consultations.find(element=>{
                 return element.id == this.state.id;
                })} showModal={this.state.showModal} closeModal={this.handleClose} handleClaim={this.handleClaim} handleDiagnosisChange={this.handleDiagnosisChange} handlePrescriptionChange={this.handlePrescriptionChange}/>
                }
                </>
              );
            })}
          </section>
        </section>
        <aside id="online-staff">
          <h2>Available Doctors</h2>
          {this.state.onlineStaff.map((staff) => (
            <h2 key={staff.id}>{staff.name}</h2>
          ))}
        </aside>
      </main>
    );
  }
}

export default Admin;