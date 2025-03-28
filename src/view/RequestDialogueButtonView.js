import { CiCirclePlus } from 'react-icons/ci';

export function RequestDialogueButtonView({ clickEventHandler }) {
  return (
    <button className="requestDialogueButton" onClick={clickEventHandler}>
      <CiCirclePlus size={100} />
    </button>
  );
}
