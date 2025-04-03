import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export function CurrentRequestItemView({ request, hospitalName, idx, isOpen, setOpen, removeItem }) {
  function onItemPressed() {
    setOpen((state) => !state);
  }

  function onRemovePressed(event) {
    event.stopPropagation();
    removeItem(request.id);
  }

  return (
    <div onClick={onItemPressed} className="current-request-item" key={idx}>
      <div className="top-left">
        {request.urgency && (
          <div className="urgent-box">
            <p>Urgent</p>
          </div>
        )}
        <div className="responses">
          <p>2 responses</p>
        </div>
      </div>
      <div className="current-request-item-content">
        <div className="current-request-item-header">
          <h2>{hospitalName}</h2>
          <div className="separator" />
          <h2>Blood type {request.bloodType}</h2>
        </div>
        <div className="urgency">{request.amount} units</div>
      </div>
      <div className="arrow">
        {!isOpen && <FaChevronDown size={25} />}
        {isOpen && <FaChevronUp size={25} />}
      </div>
      {isOpen && (
        <div className="description">
          <h3>Notes</h3>
          <p>{request.description}</p>
        </div>
      )}
      <p className="id">ID {request.id}</p>
      <div onClick={onRemovePressed} className="remove-request">
        <IoClose size={26} />
      </div>
    </div>
  );
}
