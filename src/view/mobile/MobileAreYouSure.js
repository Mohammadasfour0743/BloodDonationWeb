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

export function MobileAreYouSure({ removeRequest, closeEventHandler }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <div
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(true);
        }}
        className="remove-request"
      >
        <IoClose size={26} />
      </div>
      <DrawerContent style={{ padding: 20 }}>
        <DrawerHeader>
          <DrawerTitle>Are you sure?</DrawerTitle>
          <DrawerDescription>
            This action will permanently cancel the request and move it to the history.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className={'mobile-registration-footer'}>
          <button onClick={() => setIsOpen(false)} className="formSubmit areYouSureNoButton">
            No, go back
          </button>
          <button
            onClick={(event) => {
              removeRequest(event);
              setIsOpen(false);
            }}
            className="formSubmit"
          >
            Yes, cancel
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
