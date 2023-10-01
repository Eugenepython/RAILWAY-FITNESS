import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { HistoryContext, devOrProdContext  } from "../Contexts/Context";

function getDate(input){
    const date = new Date(input)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
    }
    


const HistoryModal = ({ isOpen, onRequestClose, theUser }) => {

    console.log(theUser + 'is the user in HistoryModal.jsx')
    const [history, setHistory] = useState([])

    const {backendUrl} = useContext(devOrProdContext);

    useEffect(() => {
        //fetch('http://localhost:3000/history', {
        fetch(`${backendUrl}/history`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ theUser }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              //console.log('Response from backend:', data);
              //console.log(data.answer)
            setHistory(data.answer)
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          
      }, []); 

console.log(history)

const displayHistory = history.map((item) => {
    let theDate = getDate(item.workoutDate)
    console.log(theDate)
    return (
        <div className = 'history-item'>
            <p>{item.workoutType}    -   {theDate}</p>
            </div>
    )
})
    
    return (
        <>
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose} 
            className='history-modal'
            contentLabel="Custom Modal"

        >
            <div>
                <h1>History</h1>
                <button  className = 'modal-button' onClick={onRequestClose}>Close</button>
             <div className = 'history-modal'>{displayHistory}</div>

             

        </div>
        
        </Modal>
        </>
    );
};

export default HistoryModal;


