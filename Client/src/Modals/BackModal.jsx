import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { BackDaysContext, devOrProdContext  } from "../Contexts/Context";
import {convertToCompatibleDateFormat, calculateDateDifferenceInDays} from '../dataUtils';

const BackModal = ({ isOpen, onRequestClose }) => {
    
const [backDate, setBackDate] = useState("");
const [value, setValue] = useState("");
const [days, setDays] = useState(""); 
const backContext = useContext(BackDaysContext);
const { sessionTitle, lastBackDate, setBackDays, setLastBackDate } = backContext;
const [hasButtonBeenPressed, setHasButtonBeenPressed] = useState(false);
const {backendUrl} = useContext(devOrProdContext);

function handleSubmit(event) {
    event.preventDefault();
    const daysDifference = calculateDateDifferenceInDays(backDate, backContext.lastBackDate);
    setBackDays(daysDifference)
    setLastBackDate(backDate)
    setHasButtonBeenPressed(true)
    onRequestClose()
  }

 
  function handleInputChange(event) {
    setBackDate(event.target.value);
    }

  useEffect(() => {
    if (hasButtonBeenPressed) {
      fetch(`${backendUrl}/back`, {
    //fetch('http://localhost:3000/back', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({sessionTitle, lastBackDate}),
    })
    .then((response) => {
    return response.json();
    })
    .then((data) => {
    console.log('Response from backend:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
  }
    }, [hasButtonBeenPressed])



//console.log(backContext.backDays + 'back days')

    return (
        <Modal 
        className = "back-modal"
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel="Custom Modal"
        >
          <div className="text-container">
          <p>You last worked on your back on {backContext.lastBackDate}</p>
          <p>Have your worked on back since? If so enter the date</p>
          </div>
          <div className = 'input-container'>
          <form onSubmit = {handleSubmit}>
         
          <label>
   
        <input 
            type="date"
            placeholder = "have your worked on back today? If so enter the date" 
            //value={value} 
            onChange={handleInputChange} 
        />
      </label>
      <button className = 'modal-button' type="submit">Submit</button>
      </form>
        
          <button className = 'modal-button' onClick={onRequestClose}>Close</button>
          </div>
        </Modal>
      );
    };
    
    export default BackModal;