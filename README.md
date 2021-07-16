# AYMedica

## Developed By

- Yazan Tafesh
- Amro Albarham

## Description

This is a website dedicated to help patients and doctors connect with each other by enabling the patient to fill a medical consultation form and send it to the doctor, and then the doctor can read the patient's information and send them back a diagnosis based on that info.

## Data Flow

- Data filled by the patient is sent to the backend and saved as a consultation in a queue.

- Then all consultations are sent back to the front end to the doctor's side and rendered as separate ones.

- Doctors can now view all pending consultations and when one of them is clicked its data is rendered in a modal with a small form for the doctor to fill in their diagnosis.

- When that form is submitted, the consultation is removed from the queue and the data the doctor filled in is sent to the backend and then sent back to the front end to exact patient that submitted it and rendered as an alert.

## Technologies Used

React, Socket.io, Netlify, Heroku, MongoDB and MongoAtlas.
