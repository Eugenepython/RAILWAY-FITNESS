import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { ChestDaysContext, devOrProdContext  } from "../Contexts/Context";
import {convertToCompatibleDateFormat, calculateDateDifferenceInDays} from '../dataUtils';


const ChestModal = ({ isOpen, onRequestClose }) => {

const [chestDate, setChestDate] = useState("");
const [value, setValue] = useState("");
const [days, setDays] = useState(""); 
const chestContext = useContext(ChestDaysContext);
const { sessionTitle, lastChestDate, setChestDays, setLastChestDate } = chestContext;
const [hasButtonBeenPressed, setHasButtonBeenPressed] = useState(false);


function handleSubmit(event) {
    event.preventDefault();
    const daysDifference = calculateDateDifferenceInDays(chestDate, chestContext.lastChestDate);
    chestContext.setChestDays(daysDifference)
    chestContext.setLastChestDate(chestDate)
    setHasButtonBeenPressed(true)
    onRequestClose()
  }

    function handleInputChange(event) {
    setChestDate(event.target.value);
    }

useEffect(() => {
    if (hasButtonBeenPressed) {
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/chest`, {
    //fetch('http://localhost:3000/chest', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({sessionTitle, lastChestDate}),
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







//console.log(chestContext.chestDays + 'chest days')

    return (
        <Modal
        className = "chest-modal"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Custom Modal"
        >
            <div className="text-container">
            <p>You last worked on your chest on {chestContext.lastChestDate}</p>
            <p>Have your worked on chest since? If so enter the date</p>
            </div>
            <div className = 'input-container'>
            <form onSubmit = {handleSubmit}>
            
            <label>
 
        <input
            type="date"
            placeholder = "have your worked on chest today? If so enter the date"
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
    
    export default ChestModal;
 