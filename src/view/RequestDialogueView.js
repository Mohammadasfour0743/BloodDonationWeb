import { IoClose } from 'react-icons/io5';

export function RequestDialogueView({ closeEventHandler }) {
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
      </div>
      <div className={'requestFormOverlay'} onClick={closeEventHandler} />
    </div>
  );
}
