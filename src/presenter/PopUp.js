import { PopUpView } from '../view/PopUpView';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

export const Popup = observer(function Popup({ model }) {
  const [isOpen, setOpen] = useState(false);

  if (isOpen) {
    return <PopUpView />;
  }

  return (
    <span
      onClick={() => {
        setOpen(true);
      }}
    >
      Sign up
    </span>
  );
});
