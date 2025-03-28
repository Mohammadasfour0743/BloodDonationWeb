import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const options = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];

export function RequestDialogueView({ closeEventHandler }) {
  const [selected, setSelected] = useState('');

  return (
    <div className={'requestFormContainer'}>
      <div className={'requestForm'}>
        <div className="topBar">
          <IoClose size={21} onClick={closeEventHandler} className={'closeWindow'} />
        </div>
        <div className={'row header'}>
          <h1>Request a Donation</h1>
        </div>
        <div className={'column inputContainer'}>
          <div className="row inputRow subheaderContainer">
            <h2 className="subheader">Hospital Details</h2>
          </div>
          <div className="row inputRow">
            <label>Name</label>
            <input disabled={true} type="text" className="formInput" />
          </div>
          <div className="row inputRow">
            <label>Location</label>
            <input disabled={true} type="text" className="formInput" />
          </div>
          <div className="row inputRow">
            <label>Email</label>
            <input disabled={true} type="text" className="formInput" />
          </div>
          <div className="row inputRow">
            <label>Phone</label>
            <input disabled={true} type="text" className="formInput" value="+46 11 111 111" />
          </div>
        </div>
        <div className="column inputContainer radio-group-container">
          <div className="row inputRow subheaderContainer">
            <h2 className="subheader">Request Details</h2>
          </div>
          <div className="row inputRow">
            <label>Blood type</label>
          </div>
          <div className="radio-group">
            {options.map((option, index) => (
              <label className="radio-option" key={index}>
                <input
                  type="radio"
                  name="customRadio"
                  value={option}
                  checked={selected === option}
                  onChange={() => setSelected(option)}
                />
                <span className="custom-radio"></span>
                {option}
              </label>
            ))}
          </div>
          <div className="row inputRow checkbox-container">
            <label className="checkbox-label-text">Urgent request</label>
            <input type="checkbox" id="myCheckbox" class="custom-checkbox" />
            <label for="myCheckbox" class="checkbox-label"></label>
          </div>
          <div className="row inputRow amountRow">
            <label>Amount (in units)</label>
            <input type="number" className="formInput amountInput" />
          </div>
          <div className="column">
            <label>Notes</label>
            <textarea className="textarea" />
          </div>
        </div>
        <div className="formSubmitContainer">
          <button className="formSubmit">Submit</button>
        </div>
      </div>

      <div className={'requestFormOverlay'} onClick={closeEventHandler} />
    </div>
  );
}
