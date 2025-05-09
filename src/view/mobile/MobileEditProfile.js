import { IoClose, IoSearch } from 'react-icons/io5';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../../components/drawer';
import { useState } from 'react';
import { MdOutlineModeEdit } from 'react-icons/md';

export function MobileEditProfile({ saveSettings, email, phone, setEmail, setPhone }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <button className="trigger-button" onClick={() => setIsOpen(true)}>
        <MdOutlineModeEdit />
      </button>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit contact details</DrawerTitle>
          <DrawerDescription>Please fill in the form below to edit your contact details.</DrawerDescription>
        </DrawerHeader>
        <div className="mobile-registration">
          <p style={{ fontWeight: 'bold', fontSize: 17, marginTop: 15 }}>Hospital Details</p>
          <div className="mobile-registration-input">
            <label>Email</label>
            <input type="text" value={email} setEmail={setEmail} />
          </div>
          <div className="mobile-registration-input">
            <label>Phone</label>
            <input type="text" value={phone} setPhone={setPhone} />
          </div>
        </div>
        <DrawerFooter className={'mobile-registration-footer'} style={{ padding: 20 }}>
          <button
            onClick={(event) => {
              saveSettings();
              setIsOpen(false);
            }}
            className="formSubmit"
            ó
          >
            Submit
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
