import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { HistoryContext, devOrProdContext  } from "../Contexts/Context";
import {convertToCompatibleDateFormat, calculateDateDifferenceInDays, formatDate, getDaySuffix} from '../dataUtils';

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


 

const displayHistory = history.map((item) => {
    let theDate = getDate(item.workoutDate)
    const inputDate = theDate;
    const formattedDate = formatDate(inputDate);
    return (
        <div className = 'history-item'>
            <p>{item.workoutType}    -   {formattedDate}</p>
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
                <button  className = 'closeHistory' onClick={onRequestClose}>Close</button>
             <div className = 'history-modal'>{displayHistory}</div>
        </div>
        
        </Modal>
        </>
    );
};

export default HistoryModal;


