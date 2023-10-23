import React from 'react'
import Arms from './components/Arms'
import Head from './components/Head'
import Chest from './components/Chest'
import Abs from './components/Abs'
import Legs from './components/Legs'
import Shoulders from './components/Shoulders'
import Back from './components/Back'
import AbsModal from './Modals/AbsModal'
import ArmsModal from './Modals/ArmsModal'
import BackModal from './Modals/BackModal'
import ChestModal from './Modals/ChestModal'
import LegsModal from './Modals/LegsModal'
import ShouldersModal from './Modals/ShouldersModal'
import HistoryModal from './Modals/HistoryModal'
import { useState, useContext } from 'react';
import { UserNameContext, TokenContext, EntryContext, HistoryContext } from "./Contexts/Context";


function TheBody() {
    const [absOpen, setAbsOpen] = useState(false);
  const [armsOpen, setArmsOpen] = useState(false);
  const [backOpen, setBackOpen] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [legsOpen, setLegsOpen] = useState(false);
  const [shouldersOpen, setShouldersOpen] = useState(false);
  const {sessionTitle, setSessionTitle} = useContext(UserNameContext);
  const {theToken, setTheToken} = useContext(TokenContext);
  const {entryOpen, setEntryOpen} = useContext(EntryContext);
  const {history, setHistory, historyLength, setHistoryLength} = useContext(HistoryContext);
  const[historyOpen, setHistoryOpen,  ] = useState(false)

 //console.log(sessionTitle + ' sessionTitle in TheBody.jsx')

    function toggleAbs () {
        setAbsOpen(true);
        //console.log("abs")
      };

      function toggleArms () {
        setArmsOpen(true);
        //console.log("arms")
      };

      function toggleBack() {
        setBackOpen(true);
        //console.log("back")
      };

      function toggleChest() {
        setChestOpen(true);
        //console.log("chest")
      };

      function toggleLegs() {
        setLegsOpen(true);
        //console.log("legs")
      };

      function toggleShoulders() {
        setShouldersOpen(true);
        //console.log("shoulders")
      };

      function getHistory() {
        setHistoryOpen(true)
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionTitle }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            //console.log('Response from backend:', data);
            //console.log(data.answer.length + "original length")
            setHistoryLength(data.answer.length)
           // console.log(data.answer)
            setHistory(data.answer)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

      const closeModal = () => {
        setAbsOpen(false);
        setArmsOpen(false);
        setBackOpen(false);
        setChestOpen(false);
        setLegsOpen(false);
        setShouldersOpen(false);
        setHistoryOpen(false)
      };

      //console.log(theToken + ' theToken')

  function logOut() {
    setEntryOpen(true)
  setTheToken('')
    //console.log("logout")
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({sessionTitle}),
      })
      .then((response) => {
      return response.json();
      })
      .then((data) => {
      //console.log('Response from backend:', data);
      })
      .catch((error) => {
      //console.error('Error:', error);
      });
    // i need to fetch a backend url called 'logout and use it to cancel the session
  }


    return (
      
     <div>
     
      <div className = 'toprow'>
          <h1 className = 'userTitle'>{sessionTitle}</h1>
          <button className = 'logout-button' onClick={() => logOut()}>Logout</button>
        </div>
        
      <div className = 'top-buttons'>
        <button className="fitness-button" onClick={() => toggleAbs()}>Abs</button>
        <button className="fitness-button" onClick={() => toggleArms()}>Arms</button>
        <button className="fitness-button" onClick={() => toggleBack()}>Back</button>
       
      <AbsModal isOpen={absOpen} onRequestClose={closeModal} />
      <ArmsModal isOpen={armsOpen} onRequestClose={closeModal} />
      <BackModal isOpen={backOpen} onRequestClose={closeModal} />
      <ChestModal isOpen={chestOpen} onRequestClose={closeModal} />
      <LegsModal isOpen={legsOpen} onRequestClose={closeModal} />
      <ShouldersModal isOpen={shouldersOpen} onRequestClose={closeModal} />
      <HistoryModal isOpen={historyOpen} theUser = {sessionTitle} onRequestClose={closeModal} />
      </div>   
            
            <div className = "image-holder">
           <Abs/>
            <Arms/>
            <Back/>
            <Chest/>
            <Head/>
            <Legs/>
            <Shoulders/>
            </div>
         
            
     <div className = 'bottom-buttons'>
     <button className="fitness-button" onClick={() => toggleChest()}>Chest</button>
        <button className="fitness-button" onClick={() => toggleLegs()}>Legs</button>
        <button className="fitness-button" onClick={() => toggleShoulders()}>Shoulders</button>
        </div>
     
  
        <div className = "history-button-holder">
        <button className = 'historyButton' onClick={() => getHistory()}>GET YOUR WORKOUT HISTORY</button>
        </div>
        </div>
      
        
       
       
    )
}

export default TheBody;


