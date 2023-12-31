import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { ArmsDaysContext, devOrProdContext  } from "../Contexts/Context";
import {convertToCompatibleDateFormat, calculateDateDifferenceInDays, formatDate, getDaySuffix} from '../dataUtils';

const ArmsModal = ({ isOpen, onRequestClose }) => {

const [armsDate, setArmsDate] = useState("");
const [value, setValue] = useState("");
const [days, setDays] = useState(""); 
const [hasButtonBeenPressed, setHasButtonBeenPressed] = useState(false);
const armsContext = useContext(ArmsDaysContext);
const { sessionTitle, lastArmsDate, setArmsDays, setLastArmsDate } = armsContext;


function handleSubmit(event) {
    event.preventDefault();
    const daysDifference = calculateDateDifferenceInDays(armsDate, lastArmsDate);
    setArmsDays(daysDifference)
    setLastArmsDate(armsDate)
    setHasButtonBeenPressed(true)
    onRequestClose()
  }
 
 //console.log(sessionTitle + ' is the new user')
 //console.log(armsDate + ' is the new  arms date')
  
function handleInputChange(event) {
  setArmsDate(event.target.value);
  }

  const inputDate = lastArmsDate;
  const formattedDate = formatDate(inputDate);
  

//console.log(lastArmsDate + ' is the new date ooooooooooooooooooooooooooooooo')

  useEffect(() => {
    if (hasButtonBeenPressed) {
    //fetch('http://localhost:3000/arms', {
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/arms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({sessionTitle, lastArmsDate}),
    })
    .then((response) => {
    return response.json();
    })
    .then((data) => {
    //console.log('Response from backend:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
  }
    }, [hasButtonBeenPressed])


//console.log(daysDifference + ' days')

    return (
        <Modal 
        className = "arms-modal"
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel="Custom Modal"
        >
          <div className="text-container">
          <p>You last worked on your arms on {formattedDate}.</p>
          <p>Have your worked on arms since? If so enter the date</p>
          </div>


         <div >

          <form 
          className = 'input-container' 
          onSubmit = {handleSubmit}>
          <label>
          <input
          type="date"
          className="input-date input-bigger" 
          style={{ fontSize: '60px', width: '600px', 'height': '100px' }} 

          onChange={handleInputChange}
          />
        </label>
        <button  className = 'submitDate' type="submit">Submit</button>
        </form>

        </div>
        
      <div className = 'closeButtonContainer'>
          <button className = 'closeModal' onClick={onRequestClose}>Close</button>
          </div>
        </Modal>
      );
    };
    
    export default ArmsModal;

  