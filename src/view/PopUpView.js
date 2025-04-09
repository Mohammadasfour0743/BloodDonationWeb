import { IoClose } from 'react-icons/io5';

export function PopUpView({ closeEventHandler }) {
  return (
    <>
      <div className="popUp-overlay"></div>
      <div className="popup-container">
        <div className="topBar">
          <IoClose onClick={closeEventHandler} size={21} className={'closeWindow'} />
        </div>
        <div className="popup-content">
          <h1 className="verification-title">Registration form</h1>
          <p>Once the account of the hospital/blood bank is verrified you will get access to Blood Share website</p>
          <div className="note-margin">
            <h2>Note!!!</h2>
            <p>If you are a hospital without a blood bank you cannot use Blood Share</p>
          </div>
          <label>Enter the name of blood bank you represent</label>
          <textarea className="blop"></textarea>
          <label>Enter the name of the hospital that your blood bank belongs to (if any)</label>
          <textarea className="blop"></textarea>
          <label>Enter the license number of the blood bank</label>
          <textarea className="blop"></textarea>
          <label>Enter the registration number of the hospital (if any)</label>
          <textarea className="blop"></textarea>
          <label>Enter the location of the blood bank/hospital</label>
          <textarea className="blop"></textarea>
          <label>Enter the contact information of the blood bank/hospital</label>
          <div className="email-phone">
            <textarea className="blop" placeholder="email"></textarea>
            <textarea className="blop" placeholder="phone number"></textarea>
          </div>
          <button type="button" className="submit-form">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
