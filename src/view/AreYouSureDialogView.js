import { IoClose } from 'react-icons/io5';

export function AreYouSureDialogView({ removeRequest, closeEventHandler }) {
  return (
    <div className={'requestFormContainer'}>
      <div className={'requestForm'}>
        <div className="topBar">
          <IoClose size={21} onClick={closeEventHandler} className={'closeWindow'} />
        </div>
        <div className={'row header areYouSureHeader'}>
          <h1 className="areYouSureTitle">Are you sure?</h1>
          <p>This action will permanently cancel the request and move it to the history.</p>
        </div>
        <div className="formSubmitContainer areYouSureSubmitContainer">
          <button onClick={closeEventHandler} className="formSubmit areYouSureNoButton">
            No, go back
          </button>
          <button onClick={(event) => removeRequest(event)} className="formSubmit">
            Yes, cancel
          </button>
        </div>
      </div>

      <div className={'requestFormOverlay'} onClick={closeEventHandler} />
    </div>
  );
}
