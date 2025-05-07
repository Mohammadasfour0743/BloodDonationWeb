import { MdOutlineModeEdit } from 'react-icons/md';

export function EditDialogueButtonView({ clickEventHandler }) {
  return (
    <button className="trigger-button" onClick={clickEventHandler}>
      <MdOutlineModeEdit />
    </button>
  );
}
