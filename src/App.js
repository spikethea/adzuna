import React, { useEffect, useState} from 'react';

//Packages
import * as Yup from 'yup';
import { Formik, yupToFormErrors } from 'formik';

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

  //empty object to fill with form errors
  const [formErrors, setFormErrors] = useState({});

  //local object to store all the named possible states of the form, using enums to make it safer and clearer code.
  const states = {
    UNFINISHED: "unfinished",
    ERROR: "error",
    SUBMITTED: 'submitted',
  }
  
  //set the default state of the form to unfinished with useState
  const [formState, setFormState] = useState(states.UNFINISHED);

  //I use the useEffect Hook here to validate the fields based on the value once updated
  useEffect(()=> {

      //validation to check for the non-empty value of name
      if (fullName !== '') {
        setFullNameValid(true);
        setFormErrors(f=> ({  ...f, fullName: undefined}));
      } else {
        setFullNameValid(false);
        setFormErrors(f=> ({ ...f, fullName: "Full Name field must be non-empty"}));
      }

      // declaring a local variable for regular expression pattern to validate the email address string
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      //check if the email address field is empty 
      if (emailAddress !== ''){
        //regexp validation
        if (regex.test(emailAddress)) {
          setEmailAddressValid(true);
          //using dot notation, I can update the value of the form error
          setFormErrors(f=> ({ ...f, emailAddress: undefined}));
        } else {
          setEmailAddressValid(false);
          //using dot notation, I can update the value of the form error using the previous state
          setFormErrors(f=> ({ ...f, emailAddress: "invalid email address."}));
          
        }
      } else {
        setEmailAddressValid(false);
      }

      //validation to check for the character length & non-empty value of notes
      if (notes !== '') {
        if (notes.length >= 20) {
          setNotesValid(true);
          setFormErrors(f=> ({ ...f, notes: undefined}));
        } else {
          setFormErrors(f=> ({ ...f, notes: "Notes field have a minimum of 20 characters."}));
          setNotesValid(false);
        }
      } else {
        setNotesValid(true);
        setFormErrors(f=> ({ ...f, notes: " notes must be a non-empty value."}));
      }

  }, [fullName, emailAddress, notes])

  //Methods

  //function to validate and set the Field
  const validateField = (fieldType, e)=> {


    // Here I use a switch case statement to determine the type of validation dependent on the field type, avoiding code duplication.
    switch(fieldType) {

      case 'fullName':
        // set the value of the Email field to update the value on change
        setFullName(e.target.value);
      break;

      case 'emailAddress':
        // set the value of the email field to update the value on change
        setEmailAddress(e.target.value);
      break;

      case 'notes':
        setNotes(e.target.value);
      break;

      default: return null;

    }
  }

  const handleSubmit = (e)=> {
    

    e.preventDefault()

    //checking all the fields are valid
    if (fullNameValid && emailAddressValid && notesValid) {
      setFormState(states.SUBMITTED);
      //window.location.reload();
    } else {
      setFormState(states.ERROR);
    }
  }


  return (
    <div className="App">
      <header className="App-header"></header>
      <section className="form-container">
      {formState === states.SUBMITTED ? // (using ternary operators) conditionally render the component depending on the validation success
      <h1>Thank You!</h1>
      : // render the 
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Adzuna Form</h1>
          <fieldset>
            <label htmlFor="fname">Full Name:</label>
            <input type="text" id="fname" name="fname" onChange={(e)=> validateField('fullName', e)} value={fullName}/>
            {formState === states.ERROR ? <p>{formErrors.fullName}</p>: null}
          </fieldset>
          <fieldset>
            <label htmlFor="fname">Email Address:</label>
            <input type="email" id="email" name="email" onChange={(e)=> validateField('emailAddress', e)} value={emailAddress}/>
            {formState === states.ERROR ? <p>{formErrors.emailAddress}</p>: null}
          </fieldset>
          <fieldset>
            <label htmlFor="fname">Notes:</label>
            <textarea type="notes" id="notes" onChange={(e) => validateField('notes', e)} value={notes}/>
            {formState === states.ERROR ? <p>{formErrors.notes}</p>: null}
            <p>{notes.length} character(s)</p>
          </fieldset>
          <button type="submit" >Submit</button>
        </form>
      }
      </section>
      <footer>
        <p></p>
      </footer>
    </div>
  );
}

export default App;
