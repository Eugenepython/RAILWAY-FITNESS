import { useEffect, useState } from 'react'
import TheBody from './TheBody'
import { HistoryContext, EntryContext,  AbsDaysContext, ArmsDaysContext, BackDaysContext, ChestDaysContext, LegsDaysContext, ShouldersDaysContext, UserNameContext, TokenContext  } from "./Contexts/Context";
import {calculateDateDifferenceInDays} from './dataUtils';
import EntryModal from './Modals/EntryModal'


const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; 
const day = today.getDate();

function getDate(input){
  const date = new Date(input)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
  }
  


function App() {  

  const [entryOpen, setEntryOpen] = useState(true);

  function loggedIn () {
    setEntryOpen(false);
    console.log("logged in")
  };

  const closeModal = () => {
    setEntryOpen(false);
  };

  
  const todayDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
 
  const [lastAbsDate, setLastAbsDate] = useState(null) // this ill be importd from postsreql
   let daysSinceAbs = calculateDateDifferenceInDays(todayDate, lastAbsDate)
  const [absDays, setAbsDays] = useState(daysSinceAbs) 

  const [lastArmsDate, setLastArmsDate] = useState(null) 
  let daysSinceArms = calculateDateDifferenceInDays(todayDate, lastArmsDate)
  const [armsDays, setArmsDays] = useState(daysSinceArms) 

  const[lastBackDate, setLastBackDate] = useState(null) 
  let daysSinceBack = calculateDateDifferenceInDays(todayDate, lastBackDate)
  const [backDays, setBackDays] = useState(daysSinceBack)

  const[lastChestDate, setLastChestDate] = useState(null)
  let daysSinceChest = calculateDateDifferenceInDays(todayDate, lastChestDate)
  const [chestDays, setChestDays] = useState(daysSinceChest)

  const[lastLegsDate, setLastLegsDate] = useState(null)
  let daysSinceLegs = calculateDateDifferenceInDays(todayDate, lastLegsDate)
  const [legsDays, setLegsDays] = useState(daysSinceLegs)

  const[lastShouldersDate, setLastShouldersDate] = useState(null)
  let daysSinceShoulders = calculateDateDifferenceInDays(todayDate, lastShouldersDate)
  const [shouldersDays, setShouldersDays] = useState(daysSinceShoulders)

const [sessionTitle, setSessionTitle] = useState('')

const [theToken, setTheToken] = useState('')  
 

//const userData = 'sessionTitle'
//console.log(userData.player)

useEffect(() => {
  const userData = { 
    userName: sessionTitle 
  };
  //console.log(userData)
  fetch('http://localhost:3000/dates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData), 
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let armsArray =[]
      let absArray = []
      let backArray = []
      let chestArray = []
      let legsArray = []
      let shouldersArray = []

      for (let i =0; i<data.length; i++) {
        //console.log(data[i].workout_type)
        data[i].workout_type === 'arms' ? armsArray.push(data[i]) : null
        data[i].workout_type === 'abs' ? absArray.push(data[i]) : null
        data[i].workout_type === 'back' ? backArray.push(data[i]) : null
        data[i].workout_type === 'chest' ? chestArray.push(data[i]) : null
        data[i].workout_type === 'legs' ? legsArray.push(data[i]) : null
        data[i].workout_type === 'shoulders' ? shouldersArray.push(data[i]) : null
       //console.log(armsArray[armsArray.length -1].last_workout_date + ' james bond went to thunderball')
        //const myDate = getDate(armsArray[armsArray.length -1].last_workout_date)
        //console.log(myDate)
armsArray.length > 0 ? setLastArmsDate(getDate(armsArray[armsArray.length -1].last_workout_date)) : setLastArmsDate(null)
absArray.length > 0 ? setLastAbsDate(getDate(absArray[absArray.length -1].last_workout_date)) : setLastAbsDate(null)
backArray.length > 0 ? setLastBackDate(getDate(backArray[backArray.length -1].last_workout_date)) : setLastBackDate(null)
chestArray.length > 0 ?  setLastChestDate(getDate(chestArray[chestArray.length -1].last_workout_date)) : setLastChestDate(null)
legsArray.length > 0 ? setLastLegsDate(getDate(legsArray[legsArray.length -1].last_workout_date)) : setLastLegsDate(null)
shouldersArray.length > 0 ? setLastShouldersDate(getDate(shouldersArray[shouldersArray.length -1].last_workout_date)) : setLastShouldersDate(null)
    }
    })
    .catch((error) => {
      console.log('Error getting dates:', error);
    });
}, [theToken]);

//console.log(lastArmsDate + ' lastArmsDate')
 
 //console.log(lastAbsDate + ' lastAbsDate')
 //console.log(daysSinceAbs + ' daysSinceAbs')
 //console.log(armsDays + ' armsDays')
 //console.log(daysSinceBack + ' daysSinceBack')
  //console.log(chestDays + ' chestDays')

 console.log(sessionTitle + ' sessionTitle')
  return (
    <>
      <div>

      
<TokenContext.Provider value={{ theToken, setTheToken}}>
<UserNameContext.Provider value={{ sessionTitle, setSessionTitle}}>
<AbsDaysContext.Provider value={{ daysSinceAbs, setAbsDays, absDays, lastAbsDate, setLastAbsDate, todayDate, sessionTitle }}>
<ArmsDaysContext.Provider value={{ daysSinceArms, setArmsDays, armsDays, lastArmsDate, setLastArmsDate, todayDate, sessionTitle }}>
<BackDaysContext.Provider value={{ daysSinceBack, setBackDays, backDays, lastBackDate, setLastBackDate, todayDate, sessionTitle }}>
<ChestDaysContext.Provider value={{ daysSinceChest, setChestDays, chestDays, lastChestDate, setLastChestDate, todayDate, sessionTitle}}>
<LegsDaysContext.Provider value={{ daysSinceLegs, setLegsDays, legsDays, lastLegsDate, setLastLegsDate, todayDate, sessionTitle}}>
<ShouldersDaysContext.Provider value={{ daysSinceShoulders, setShouldersDays, shouldersDays, lastShouldersDate, setLastShouldersDate, todayDate, sessionTitle}}>
<EntryContext.Provider value={{ entryOpen, setEntryOpen, closeModal }}>


<EntryModal  /> 

{theToken ? <TheBody/> : null}


</EntryContext.Provider>
</ShouldersDaysContext.Provider>
</LegsDaysContext.Provider>
</ChestDaysContext.Provider>
</BackDaysContext.Provider>
</ArmsDaysContext.Provider>
</AbsDaysContext.Provider>
</UserNameContext.Provider>
</TokenContext.Provider>

      </div>
  
    </>
  )
}

export default App
