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

    //console.log(theUser + ' is the user in HistoryModal.jsx')

const {history, setHistory, historyLength, setHistoryLength} = useContext(HistoryContext);


 
console.log(historyLength)


const displayHistory = history.map((item) => {
    let theDate = getDate(item.workoutDate)
    //console.log(theDate)
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
                <h1 className = 'historyTitleName'>History</h1>
                <button  className = 'modal-button' onClick={onRequestClose}>Close</button>
             <div className = 'history-modal'>{displayHistory}</div>
        </div>
        
        </Modal>
        </>
    );
};

export default HistoryModal;


