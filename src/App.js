import React, { useState} from 'react';

//Packages
import * as Yup from 'yup';
import { Formik } from 'formik';

import './App.css';

function App() {

  //setting Form Variables using useState 
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [notes, setNotes] = useState('');

  //boolean value to determine if the values can be submitted
  const [fullNameValid, setFullNameValid] = useState(false);
  const [emailAddressValid, setEmailAddressValid] = useState(false);
  const [notesValid, setNotesValid] = useState(false);

  //
  const [validationSuccess, setValidationSuccess] = useState(false);

  //function to validate and set the Field
  const validateField = (fieldType, e)=> {

    console.log(fieldType);

    // declaring a local variable for regular expression pattern to validate the email address string
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    
    // determine the type of validation dependent on the field type.
    switch(fieldType) {
      case 'fullName':
        // set the value of the Full Name
        setFullName(e.target.value);

        //validation to check for the non-empty value of name
        if (fullName !== '') {
          setFullNameValid(true);
        } else {
          setFullNameValid(false);
        }
      break;
      case 'emailAddress':
        // set the value of the Full Name
        setEmailAddress(e.target.value);

        //check if the email address field is empty 
        if (emailAddress !== ''){
          //regexp validation
          if (regex.test(e.target.value)) {
            setEmailAddressValid(true);
            console.log("valid email address")
          } else {
            setEmailAddressValid(false);
            console.log("invalid email address")
          }
        } else {
          setEmailAddressValid(false);
        }
      break;
      case 'notes':
        setNotes(e.target.value);

        //validation to check for the non-empty value of name
        if (notes !== '') {
          if (notes.length >= 20) {
            setNotesValid(true);
          } else {
            console.log("notes too short");
            setNotesValid(false);
          }
        } else {
          setNotesValid(true);
          console.log("notes empty");
        }
      break;
    }

    
  }

  const handleSubmit = ()=> {

    //checking all the fields are valid
    if (fullNameValid && emailAddressValid && notesValid) {
      validationSuccess(true);
      //window.location.reload();
    } else {
      validationSuccess(false);
      alert("You have entered an invalid email address!");
    }
  }


  return (
    <div className="App">
      <header className="App-header"></header>
      <section className="form-container">
      {validationSuccess ? // (using ternary operators) conditionally render the component depending on the validation success
      <h1>Thank You!</h1>
      : // render the 
      <form>
        <h1>Adzuna Form</h1>
          <fieldset>
            <label htmlFor="fname">Full Name:</label><br />
            <input type="text" id="fname" name="fname" onChange={(e)=> validateField('fullName', e)} value={fullName}/><br />
            <label htmlFor="fname">Email Address:</label><br />
            <input type="email" id="email" name="email" onChange={(e)=> validateField('emailAddress', e)} value={emailAddress}/><br />
            <label htmlFor="fname">Notes:</label><br />
            <textarea type="notes" id="notes" onChange={(e) => validateField('notes', e)} value={notes}/><br />
            <p>{notes.length} character(s)</p>
          </fieldset>
          <button type="submit" onClick={() => handleSubmit()}>Submit</button>
        </form>
      }
        
      </section>
    </div>
  );
}

export default App;
