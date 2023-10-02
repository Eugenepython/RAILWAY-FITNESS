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
import { UserNameContext, TokenContext, EntryContext } from "./Contexts/Context";


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
  const[historyOpen, setHistoryOpen, ] = useState(false)

 

    function toggleAbs () {
        setAbsOpen(true);
        console.log("abs")
      };

      function toggleArms () {
        setArmsOpen(true);
        console.log("arms")
      };

      function toggleBack() {
        setBackOpen(true);
        console.log("back")
      };

      function toggleChest() {
        setChestOpen(true);
        console.log("chest")
      };

      function toggleLegs() {
        setLegsOpen(true);
        console.log("legs")
      };

      function toggleShoulders() {
        setShouldersOpen(true);
        console.log("shoulders")
      };

      function getHistory() {
        console.log("history")
        setHistoryOpen(true)
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
    console.log("logout")
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
      console.log('Response from backend:', data);
      })
      .catch((error) => {
      console.error('Error:', error);
      });
    // i need to fetch a backend url called 'logout and use it to cancel the session
  }



    return (
      <>
      <div className = 'whole'>
        <div className = 'title'>{sessionTitle}
        <button className = 'logout-button' onClick={() => logOut()}>Logout</button>
        </div>
        
      <div className='buttons-and-body'>
      <div className = 'left-buttons'>
        <button className="fitness-button" onClick={() => toggleAbs()}>Abs</button>
        <button className="fitness-button" onClick={() => toggleArms()}>Arms</button>
        <button className="fitness-button" onClick={() => toggleBack()}>Back</button>
        <button className="history-button" onClick={() => getHistory()}><p>Workout</p> <p>History</p></button>
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
         
            
     <div className = 'right-buttons'>
     <button className="fitness-button" onClick={() => toggleChest()}>Chest</button>
        <button className="fitness-button" onClick={() => toggleLegs()}>Legs</button>
        <button className="fitness-button" onClick={() => toggleShoulders()}>Shoulders</button>
        </div>
        </div>
        </div>
        </>
    )
}

export default TheBody;
