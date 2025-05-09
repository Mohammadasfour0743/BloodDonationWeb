import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { saveApplicationDetails } from '../model/firebaseModel';

export function PopUpView({ closeEventHandler }) {
  const [formData, setFormData] = useState({
    bloodBankName: '',
    hospitalName: '',
    licenseNumber: '',
    registrationNumber: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    await saveApplicationDetails(formData);
    closeEventHandler();
  };

  return (
    <>
      <div className="popUp-overlay"></div>
      <div className="popup-container">
        <div className="topBar">
          <IoClose onClick={closeEventHandler} size={21} className={'closeWindow'} />
        </div>
        <div className="popup-content">
          <h1 className="verification-title">Registration form</h1>
          <p>Once the account of the hospital/blood bank is verified, you’ll get access to Blood Share.</p>
          <div className="note-margin">
            <h2>Note!</h2>
            <p>If you are a hospital without a blood bank you cannot use Blood Share as a blood bank is needed to regulate blood donations</p>
          </div>

          <label>Enter the name of blood bank you represent</label>
          <textarea className="blop" value={formData.bloodBankName} onChange={handleChange('bloodBankName')} />

          <label>Enter the name of the hospital that your blood bank belongs to (if any)</label>
          <textarea className="blop" value={formData.hospitalName} onChange={handleChange('hospitalName')} />

          <label>Enter the license number of the blood bank</label>
          <textarea className="blop" value={formData.licenseNumber} onChange={handleChange('licenseNumber')} />

          <label>Enter the registration number of the hospital (if any)</label>
          <textarea
            className="blop"
            value={formData.registrationNumber}
            onChange={handleChange('registrationNumber')}
          />

          <label>Enter the location of the blood bank/hospital</label>
          <textarea className="blop" value={formData.location} onChange={handleChange('location')} />

          <label>Enter the contact information of the blood bank/hospital</label>
          <div className="email-phone">
            <textarea
              className="blop"
              placeholder="email"
              value={formData.contactEmail}
              onChange={handleChange('contactEmail')}
            />
            <textarea
              className="blop"
              placeholder="phone number"
              value={formData.contactPhone}
              onChange={handleChange('contactPhone')}
            />
          </div>

          <button type="button" className="submit-form" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}
