export default function Consultation(props){
  return(
    <article className="ticket">
      <h2>Patient: {props.patientName}</h2>
      <p>Age: {props.age} </p>
      <p>Gender: {props.gender}</p>
      <p>Conditions: {props.conditions.map((condition)=>{
        return(
          `${condition} `
        )
      })}</p>
      <p>Symptoms: {props.symptoms}</p>
      <p>Date: {new Date(props.created_at).toLocaleDateString()}</p>
      <button onClick={()=>props.handleShowModal(props.id,props.socketId)}>Diagnose</button>
    </article>
  )
}