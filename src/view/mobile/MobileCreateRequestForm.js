import { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../components/drawer';
import { nanoid } from 'nanoid';
import { saveRequests } from '../../model/firebaseModel';
import { sendNotifications } from '../../model/notifications';
import { CiCirclePlus } from 'react-icons/ci';

const options = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];

export function MobileCreateRequestForm({ addRequest, hospitalEmail, reactiveModel }) {
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [bloodTypes, setBloodTypes] = useState([]);
  const [isUrgent, setUrgent] = useState(false);
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState(1);

  function submitForm() {
    setError('');
    if (bloodTypes.length === 0) {
      setError('Please select at least one blood type');
      return;
    }
    const id = /* crypto.randomUUID(); */ nanoid(10);
    const req = {
      id,
      hospitalName: reactiveModel.name,
      hospitalEmail: reactiveModel.email,
      hospitalId: reactiveModel.id,
      bloodTypes: bloodTypes,
      urgency: isUrgent,
      description: notes,
      amount,
      current: true,
      latitude: reactiveModel.latitude,
      longitude: reactiveModel.longitude,
      location: reactiveModel.location,
      updatedAt: new Date().toISOString(),
    };
    addRequest(req);
    saveRequests(req);
    sendNotifications(id);
    setIsOpen(false);
  }

  function toggleBloodType(option) {
    console.log('toggleBloodType called with:', option);
    setBloodTypes((prev) => {
      if (prev.includes(option)) {
        console.log('Removing:', option);
        return prev.filter((el) => el !== option);
      } else {
        console.log('Adding:', option);
        return [...prev, option];
      }
    });
  }

  function clearForm() {
    setBloodTypes([]);
    setUrgent(false);
    setNotes('');
    setAmount(1);
    setError('');
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(val) => {
        clearForm();
        setIsOpen(val);
      }}
    >
      <DrawerTrigger className="mobile-sign-up-button">
        <button className="requestDialogueButton">
          <div className="relative">
            {' '}
            <CiCirclePlus size={80} color="black" />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '50%',
                transform: 'translate(50%, -50%)',
                backgroundColor: 'white',
                width: 63,
                height: 63,
                zIndex: -1,
                borderRadius: 50,
              }}
            ></div>
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Request a Donation</DrawerTitle>
          <DrawerDescription>Please fill in the form below to request a donation.</DrawerDescription>
        </DrawerHeader>
        <div className="mobile-registration">
          <p style={{ fontWeight: 'bold', fontSize: 17, marginTop: 15 }}>Hospital Details</p>
          <div className="mobile-registration-input">
            <label>Email</label>
            <input type="text" disabled={true} value={hospitalEmail} />
          </div>
          <div className="mobile-registration-input">
            <label>Phone</label>
            <input type="text" disabled={true} value="+46 11 111 111" />
          </div>
          <p style={{ fontWeight: 'bold', fontSize: 17, marginTop: 15 }}>Request Details</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="mobile-registration-input">
            <label>Blood type</label>
            <div className="radio-group">
              {options.map((option, index) => (
                <label
                  className="radio-option"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleBloodType(option);
                  }}
                  key={index}
                >
                  <input
                    type="radio"
                    name={'customRadio' + index}
                    value={option}
                    checked={bloodTypes.includes(option)}
                    onClick={(e) => e.preventDefault()}
                  />
                  <span className="custom-radio"></span>
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div className="mobile-registration-input checkbox-container" style={{ flexDirection: 'row' }}>
            <label className="checkbox-label-text">Urgent request</label>
            <input
              value={isUrgent}
              onChange={(e) => setUrgent(e.target.checked)}
              type="checkbox"
              id="myCheckbox"
              class="custom-checkbox"
            />
            <label for="myCheckbox" class="checkbox-label"></label>
          </div>
          <div className="mobile-registration-input">
            <label>Amount (in units)</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              className="formInput amountInput"
              style={{ marginLeft: 0 }}
            />
          </div>
          <div className="mobile-registration-input">
            <label>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="textarea" />
          </div>
        </div>
        <DrawerFooter className={'mobile-registration-footer'}>
          <button onClick={submitForm} className="mobile-registration-footer">
            Submit
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
