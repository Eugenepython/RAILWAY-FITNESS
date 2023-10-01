import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { LegsDaysContext, devOrProdContext  } from "../Contexts/Context";
import {convertToCompatibleDateFormat, calculateDateDifferenceInDays} from '../dataUtils';


const LegsModal = ({ isOpen, onRequestClose }) => {
    
const [legsDate, setLegsDate] = useState("");
const [value, setValue] = useState("");
const [days, setDays] = useState(""); 
const legsContext = useContext(LegsDaysContext);
const { sessionTitle, lastLegsDate, setLegsDays, setLastLegsDate } = legsContext;
const [hasButtonBeenPressed, setHasButtonBeenPressed] = useState(false);
const {backendUrl} = useContext(devOrProdContext);
        //console.log(legsContext)


    function handleSubmit(event) {
        event.preventDefault();
        const daysDifference = calculateDateDifferenceInDays(legsDate, legsContext.lastLegsDate);
        legsContext.setLegsDays(daysDifference)
        legsContext.setLastLegsDate(legsDate)
        setHasButtonBeenPressed(true)
        onRequestClose()
      }

        function handleInputChange(event) {
        setLegsDate(event.target.value);
        }

useEffect(() => {
    if (hasButtonBeenPressed) {
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/legs`, {
    //fetch('http://localhost:3000/legs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({sessionTitle, lastLegsDate}),
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


//console.log(legsContext.legsDays + 'legs days')

        return (
            <Modal
            className = "legs-modal"
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Custom Modal"
            >
                <div className="text-container">
                <p>You last worked on your legs on {legsContext.lastLegsDate}.</p>
                <p>Have your worked on legs since? If so enter the date</p>
                </div>
                <div className = 'input-container'>
                <form onSubmit = {handleSubmit}>
                <label>
       
            <input
                type="date"
                placeholder = "have your worked on legs today? If so enter the date"
                //value={value}
                onChange={handleInputChange}
            />
            </label>
            <button  className = 'modal-button' type="submit">Submit</button>
            </form>
            <button  className = 'modal-button' onClick={onRequestClose}>Close</button>
            </div>
            </Modal>
        );
        };

export default LegsModal;

 