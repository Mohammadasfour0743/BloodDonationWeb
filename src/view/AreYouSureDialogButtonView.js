import { IoClose } from 'react-icons/io5';

export function AreYouSureDialogButtonView({ clickEventHandler }) {
  return (
    <div onClick={clickEventHandler} className="remove-request">
      <IoClose size={26} />
    </div>
  );
}
