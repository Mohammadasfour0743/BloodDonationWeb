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

export function MobileRegistrationForm() {
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
          <div className="mobile-registration-input">
            <label>Name of the blood bank</label>
            <input type="text" placeholder="Blood bank name" />
          </div>
          <div className="mobile-registration-input">
            <label>Name of the hospital the blood bank belongs to</label>
            <input type="text" />
          </div>
          <div className="mobile-registration-input">
            <label>License number of the blood bank</label>
            <input type="text" />
          </div>
          <div className="mobile-registration-input">
            <label>Registration number of the hospital (if any)</label>
            <input type="text" />
          </div>
          <div className="mobile-registration-input">
            <label>Location of the blood bank/hospital</label>
            <input type="text" />
          </div>
          <div className="mobile-registration-input">
            <label>Phone contact</label>
            <input type="text" />
          </div>
          <div className="mobile-registration-input">
            <label>Email contact</label>
            <input type="text" />
          </div>
        </div>
        <DrawerFooter className={'mobile-registration-footer'}>
          <button className="mobile-registration-footer">Submit</button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
