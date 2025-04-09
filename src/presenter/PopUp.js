import { PopUpView } from '../view/PopUpView';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

export const Popup = observer(function Popup({ model }) {
  const [isOpen, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  if (isOpen) {
    return <PopUpView closeEventHandler={onClose} />;
  }

  return (
    <span
      className="login-atag"
      onClick={() => {
        setOpen(true);
      }}
    >
      Sign up
    </span>
  );
});
