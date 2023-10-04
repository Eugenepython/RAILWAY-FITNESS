import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { ShouldersDaysContext, devOrProdContext  } from "../Contexts/Context";
import {convertToCompatibleDateFormat, calculateDateDifferenceInDays, formatDate, getDaySuffix} from '../dataUtils';

const ShouldersModal = ({ isOpen, onRequestClose }) => {
        
const [shouldersDate, setShouldersDate] = useState("");
const [value, setValue] = useState("");
const [days, setDays] = useState(""); 
const shouldersContext = useContext(ShouldersDaysContext);
const { sessionTitle, lastShouldersDate, setShouldersDays, setLastShouldersDate } = shouldersContext;

const [hasButtonBeenPressed, setHasButtonBeenPressed] = useState(false);
const inputDate = lastShouldersDate;
const formattedDate = formatDate(inputDate);


function handleSubmit(event) {
event.preventDefault();
const daysDifference = calculateDateDifferenceInDays(shouldersDate, lastShouldersDate);
shouldersContext.setShouldersDays(daysDifference)
shouldersContext.setLastShouldersDate(shouldersDate)
setHasButtonBeenPressed(true)
onRequestClose()
}
    
function handleInputChange(event) {
setShouldersDate(event.target.value);
}

useEffect(() => {
    if (hasButtonBeenPressed) {
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/shoulders`, {
    //fetch('http://localhost:3000/shoulders', {  
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({sessionTitle, lastShouldersDate}),
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





//console.log(shouldersContext.shouldersDays + 'shoulders days')

            return (
                <Modal
                className = "shoulders-modal"
                    isOpen={isOpen}
                    onRequestClose={onRequestClose}
                    contentLabel="Custom Modal"
                >
                    <div className="text-container">
                    <p>You last worked on your shoulders on {formattedDate}</p>
                    <p>have your worked on shoulders since If so enter the date</p>
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

            export default ShouldersModal;

