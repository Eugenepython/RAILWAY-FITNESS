import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import {convertToCompatibleDateFormat, calculateDateDifferenceInDays, formatDate, getDaySuffix} from '../dataUtils';

import { UserNameContext, TokenContext, EntryContext, devOrProdContext  } from "../Contexts/Context";

const EntryModal = () => {

const [loginOpen, setLoginOpen] = useState(false);
const [signinOpen, setSigninOpen] = useState(false);

const {sessionTitle, setSessionTitle} = useContext(UserNameContext);
const {theToken, setTheToken} = useContext(TokenContext);
const {entryOpen, setEntryOpen} = useContext(EntryContext);

const initialSignInData = {
    username: '',
    password: '',
    };
const initialSignUpData = {
    newUserName: '',
    newUserPassword: '',
    repeatNewUserPassword: '',
};

const [signInData, setSignInData] = useState(initialSignInData)
const [signUpData, setSignUpData] = useState(initialSignUpData);
const [signUp, setSignUp] = useState(false);
const [firstNewPass, setFirstNewPass] = useState('')
const [secondNewPass, setSecondNewPass] = useState('')
const [showWelcomeNewUser, setShowWelcomeNewUser] = useState(false);

function revealSignUp() {
        setLoginOpen(false);
        setSignInData(initialSignInData);
        setSignUp(true);
    }

function revealSignIn() {
    setLoginOpen(true);
    setSignUpData(initialSignUpData);
    setSignUp(false);
    setShowWelcomeNewUser(false)
}

function wrongPassword() {
    alert("wrong password")
}

function wrongUser() {
    alert("wrong user")
}

function handleSubmitSignIn(event) {
  event.preventDefault();
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInData),
  })
    .then(response => response.json())
    .then((data) => {
      //console.log('Success:', data);
      //console.log(data.username + "is the username")
      setSessionTitle(data.username)
      setTheToken(data.token)
      if (data.noUser === 'User not found') {
        wrongUser();
      }
      else if (data.message === 'wrong') {
        wrongPassword();
      } else {
        closeModal(); 
      }
    })
}





function handleSubmitSignUp(event){
    event.preventDefault();
    if (firstNewPass === secondNewPass && signUpData.newUserName.length > 6){
        //console.log("they match up!!!!!!!")
        const registrationData = {
            username: signUpData.newUserName, // Use newUserName as email
            password: firstNewPass,        // Use the first password as password
          };
          fetch(`${import.meta.env.VITE_BACKEND_API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        })
              .then(response => {
        if (response.status === 201) {
          //console.log('User registered successfully!');
          setSignUp(false)
          setShowWelcomeNewUser(true)
        } else {
          console.error('Error registering user:', response.statusText);  // this is line 66
        }
      })
      .catch(error => {
        console.error('Network error:', error);
        // Handle network error
      });
  }
  else {
      alert("passwords don't match, or username is too short")
  }
  
}  


function handleInputChange(event) {
    const { name, value } = event.target;
    setSignInData({
        ...signInData,
        [name]: value
    });
}

function handleNewUserChange(event) {
      const { name, value } = event.target;
      //console.log(secondNewPass)
      if (name === 'newUserPassword'){
          setFirstNewPass(value)
      } else if (name === 'repeatNewUserPassword'){
          setSecondNewPass(value)
      }
      setSignUpData({
          ...signUpData,
          [name]: value
      });
  }

  function closeModal(){
    setEntryOpen(false)
  }
  
    return (
        <>
        <Modal
            isOpen={entryOpen}
            onRequestClose={closeModal} 
            className='entry-modal'
        >
           
              <div className = 'titleEntry'><h1>Fitness App</h1></div>
              <div className = 'entryModalContent'>
                <button className='entryButton' onClick={revealSignIn}>Log In</button>
                <button className='entryButton' onClick={revealSignUp}>Sign Up</button>
            
            <div className ='showUserandPassInputs'>
            <p className = 'welcomeNewUser' style={{ display: showWelcomeNewUser ? 'block' : 'none' }}>Welcome new member {signUpData.newUserName} log in with your username and password</p>
            <div style={{ display: loginOpen ? 'block' : 'none' }}>
        <form onSubmit={handleSubmitSignIn}>
        
          
            <label htmlFor="username">Username:</label>
            <input
              className = 'styleInput'
              type="text"
              id="username"
              name="username"
              value={signInData.username}
              onChange={handleInputChange}
            />
          

          
            <label htmlFor="password">Password:</label>
            <input
              className = 'styleInput'
              type="password"
              id="password"
              name="password"
              value={signInData.password}
              onChange={handleInputChange}
            />
          

          <button type="submit" className = 'login-buttons'>Enter</button>

        </form>
        </div>
        </div>
        

        
        <div className = 'showUserandPassInputs' style={{ display: signUp ? 'block' : 'none' }}>
        <form onSubmit={handleSubmitSignUp}>
          <div>
          <p className = 'newUserNameguidance'>Username must be at least 6 characters</p>
            <label htmlFor="username">Your new username</label>
            <input
              className = 'styleInput'
              type="text"
              id="newUsername"
              name="newUserName"
              value={signUpData.newUserName}
              onChange={handleNewUserChange}
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className = 'styleInput'
              type="password"
              id="newUserPassword"
              name="newUserPassword"
              value={signUpData.newUserPassword}
              onChange={handleNewUserChange}
            />
          </div>
          <br></br>

          <div>
            <label htmlFor="password">Repeat Password:</label>
            <input
            className = 'styleInput'
              type="password"
              id="repeatNewUserPassword"
              name="repeatNewUserPassword"
              value={signUpData.repeatNewUserPassword}
              onChange={handleNewUserChange}
            />
          </div>
          
          <button type="submit" className = "login-buttons">Sign Up</button>
         
        </form>
        </div>
       
        </div>
        </Modal>
        </>
    );
};

export default EntryModal;


