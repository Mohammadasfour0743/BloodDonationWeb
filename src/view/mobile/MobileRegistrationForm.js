import { useState } from 'react';
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
import { saveApplicationDetails } from '../../model/firebaseModel';

export function MobileRegistrationForm() {
  const [feedback, setFeedback] = useState(null);
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
  // random stuff trying to trigger deployment

  const handleSubmit = async () => {
    await saveApplicationDetails(formData);
    setFeedback('Application submitted successfully');
  };
  return (
    <Drawer>
      <DrawerTrigger className="mobile-sign-up-button">Sign Up</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Registration form</DrawerTitle>
          <DrawerDescription>
            Once the account of the hospital is verified, you'll get access to Blood Share.
          </DrawerDescription>
        </DrawerHeader>
        <div className="mobile-registration">
          {feedback && <p style={{ color: 'green' }}>{feedback}</p>}
          <div className="mobile-registration-input">
            <label>Name of the blood bank</label>
            <input
              onChange={handleChange('bloodBankName')}
              value={formData.bloodBankName}
              type="text"
              placeholder="Blood bank name"
            />
          </div>
          <div className="mobile-registration-input">
            <label>Name of the hospital the blood bank belongs to</label>
            <input onChange={handleChange('hospitalName')} value={formData.hospitalName} type="text" />
          </div>
          <div className="mobile-registration-input">
            <label>License number of the blood bank</label>
            <input onChange={handleChange('licenseNumber')} value={formData.licenseNumber} type="text" />
          </div>
          <div className="mobile-registration-input">
            <label>Registration number of the hospital (if any)</label>
            <input onChange={handleChange('registrationNumber')} value={formData.registrationNumber} type="text" />
          </div>
          <div className="mobile-registration-input">
            <label>Location of the blood bank/hospital</label>
            <input onChange={handleChange('location')} value={formData.location} type="text" />
          </div>
          <div className="mobile-registration-input">
            <label>Phone contact</label>
            <input onChange={handleChange('contactPhone')} value={formData.contactPhone} type="text" />
          </div>
          <div className="mobile-registration-input">
            <label>Email contact</label>
            <input onChange={handleChange('contactEmail')} value={formData.contactEmail} type="text" />
          </div>
        </div>
        <DrawerFooter className={'mobile-registration-footer'}>
          <button onClick={handleSubmit} className="mobile-registration-footer">
            Submit
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
