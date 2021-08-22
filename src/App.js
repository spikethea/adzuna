import React, { useEffect, useState} from 'react';

//Packages
import {useSpring, animated as a} from 'react-spring';

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
          setFormErrors(f=> ({ ...f, emailAddress: "Invalid email address."}));
          
        }
      } else {
        setEmailAddressValid(false);
        setFormErrors(f=> ({ ...f, emailAddress: "Email Address field must be non-empty"}));
      }

      //validation to check for the character length & non-empty value of notes
      if (notes !== '') {
        if (wordCount(notes) >= 6) {
          setNotesValid(true);
          setFormErrors(f=> ({ ...f, notes: undefined}));
        } else {
          setFormErrors(f=> ({ ...f, notes: "Notes field must have a minimum of 6 words."}));
          setNotesValid(false);
        }
      } else {
        setNotesValid(true);
        setFormErrors(f=> ({ ...f, notes: " Notes field must be non-empty"}));
      }

  }, [fullName, emailAddress, notes])

  //Methods

  //function to validate and set the Field
  const validateField = (fieldType, e)=> {


    // Here I use a switch case statement to determine the type of validation dependent on the field type, avoiding code duplication.
    switch(fieldType) {

      case 'fullName':
        // set the value of the Full Name field to update the value on change, using the event value
        setFullName(e.target.value);
      break;

      case 'emailAddress':
        // set the value of the Email Address field to update the value on change, using the event value
        setEmailAddress(e.target.value);
      break;

      case 'notes':
         // set the value of the notes field to update the value on change, using the event value
        setNotes(e.target.value);
      break;

      default: return null;

    }
  }

  const handleSubmit = (e)=> {
    // prevent the default action of HTML buttons
    e.preventDefault()

    //checking all the fields are valid.
    if (fullNameValid && emailAddressValid && notesValid) {
      setFormState(states.SUBMITTED);
      //window.location.reload();
    } else {
      setFormState(states.ERROR);
    }
  }

  //function to handle resetting the forms fields
  const resetForm = () => {

    // changing the state of the form back to its intial value
    setFormState(states.UNFINISHED);

    //resetting the fields back to empty strings
    setFullName('');
    setNotes('');
    setEmailAddress('');
  }

  //function which returns the converted character length to word count.
  const wordCount = (text = '') => {
    return text.split(/\S+/).length - 1;
  };

  //defined settings for the transition animation of the Form with react-spring
  const styleProps1 = useSpring({
    to: { opacity: formState === states.SUBMITTED ? 1 : 0 },
    from: { opacity: 0 }
 });
 
 //defined settings for transition animation of the validation confirmation with react-spring
 const styleProps2 = useSpring({
    to: { opacity: formState === states.SUBMITTED ? 0 : 1 },
    from: { opacity: 0 }
 });

  return (
    <div className="App">
      <header className="App-header"></header>
      <section className="form-container">
      {formState === states.SUBMITTED ? // (using ternary operators) conditionally render the component depending on the validation state
      <a.article style={styleProps1}>
        <h1>Thank You!</h1>
        <p>Your account details have been submitted successfully</p>
        <button onClick={resetForm}>Resubmit</button>
      </a.article>
      : // render the form on condition that the form is not submitted
      <a.form style={styleProps2} onSubmit={(e) => handleSubmit(e)}>
        <h1>Adzuna Simple Form</h1>
        <section>
          <fieldset>
            <label htmlFor="fname">Full Name:</label>
            <input type="text" id="fname" name="fname" onChange={(e)=> validateField('fullName', e)} value={fullName}/>
            {formState === states.ERROR ? <p className="error-message">{formErrors.fullName}</p>: null}{/*  using ternary operators, th  */}
          </fieldset>
          <fieldset>
            <label htmlFor="fname">Email Address:</label>
            <input type="email" id="email" name="email" onChange={(e)=> validateField('emailAddress', e)} value={emailAddress}/>
            {formState === states.ERROR ? <p className="error-message">{formErrors.emailAddress}</p>: null}
          </fieldset>
          <fieldset>
            <label htmlFor="fname">Notes:</label>
            <textarea type="notes" id="notes" onChange={(e) => validateField('notes', e)} value={notes}/>
            {formState === states.ERROR ? <p className="error-message">{formErrors.notes}</p>: null}
            <p className="info-text">{wordCount(notes)} word(s)</p>
          </fieldset>
          </section>
          <footer>
            <button type="submit">Submit</button>
          </footer>
        </a.form>
      }
      </section>
      <footer>
        <p></p>
      </footer>
    </div>
  );
}

export default App;
