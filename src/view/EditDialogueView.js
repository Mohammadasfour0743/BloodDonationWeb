import { IoClose } from 'react-icons/io5';

export function EditDialogueView({ saveSettings, closeEventHandler, email, phone, setEmail, setPhone }) {
  return (
    <div className={'requestFormContainer'}>
      <div className={'requestForm'}>
        <div className="topBar">
          <IoClose size={21} onClick={closeEventHandler} className={'closeWindow'} />
        </div>
        <div className={'row header'}>
          <h1>Edit contact details</h1>
        </div>
        <div className={'column inputContainer'}>
          <div className="row inputRow">
            <label>Email</label>
            <input type="text" className="formInput" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="row inputRow">
            <label>Phone</label>
            <input type="text" className="formInput" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="formSubmitContainer">
          <button onClick={() => saveSettings()} className="formSubmit">
            Submit
          </button>
        </div>
      </div>

      <div className={'requestFormOverlay'} onClick={closeEventHandler} />
    </div>
  );
}
