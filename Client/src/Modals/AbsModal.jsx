import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { AbsDaysContext, TokenContext, devOrProdContext } from "../Contexts/Context";
import {convertToCompatibleDateFormat, calculateDateDifferenceInDays} from '../dataUtils';

const AbsModal = ({ isOpen, onRequestClose }) => {
    
    const [absDate, setAbsDate] = useState("");
    const [value, setValue] = useState("");
    const [days, setDays] = useState(""); 
    const absContext = useContext(AbsDaysContext);
    const { sessionTitle, lastAbsDate, setAbsDays, setLastAbsDate } = absContext;
    const {theToken} = useContext(TokenContext);
    const [hasButtonBeenPressed, setHasButtonBeenPressed] = useState(false);
    const {backendUrl} = useContext(devOrProdContext);


  useEffect(() => {
    if (hasButtonBeenPressed) {
      fetch(`${backendUrl}/abs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({sessionTitle, lastAbsDate}),
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




function handleSubmit(event) {
    event.preventDefault();
    const daysDifference = calculateDateDifferenceInDays(absDate, absContext.lastAbsDate);
    setAbsDays(daysDifference)
    setLastAbsDate(absDate)
    setHasButtonBeenPressed(true)
    onRequestClose()
  }
 
  //absContext.setAbsDays(47)
  //console.log(absContext.absDays + ' days')

  function handleInputChange(event) {
    setAbsDate(event.target.value);
    }

    //console.log(theToken + ' theToken')
    
//console.log(daysDifference + ' days')

    return (
        <Modal 
        className = "abs-modal"
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel="Custom Modal"
        >
          <div className="text-container">
          <p>You last worked on your abdomen on {lastAbsDate} </p>
          <p>Have your worked on abs since? If so enter the date</p>
          </div>
          <div className = 'input-container'>
          <form onSubmit = {handleSubmit}>
          <label>
      
        <input 
            type="date"
            placeholder = "have your worked on abs today? If so enter the date" 
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
    
    export default AbsModal;

  