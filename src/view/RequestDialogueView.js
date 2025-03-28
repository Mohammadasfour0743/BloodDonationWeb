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
        <div className="row">
          <h2>Hospital Details</h2>
        </div>
      </div>
      <div className={'requestFormOverlay'} onClick={closeEventHandler} />
    </div>
  );
}
