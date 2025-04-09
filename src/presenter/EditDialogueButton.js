import { useEffect, useState } from 'react';
import { RequestDialogueView } from '../view/RequestDialogueView';
import { observer } from 'mobx-react-lite';
import { EditDialogueButtonView } from '../view/EditDialogueButtonView';
import { EditDialogueView } from '../view/EditDialogueView';

export const EditDialogue = observer(function EditDialogue({ model }) {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [email, setEmail] = useState(model.email);
  const [phone, setPhone] = useState(model.phone);

  useEffect(() => {
    setEmail(model.email);
    setPhone(model.phone);
  }, [model.email, model.phone]);

  function saveSettings() {
    model.setEmail(email);
    model.setPhone(phone);
    setDialogueOpen(false);
  }

  function onEditDialogueButtonClicked() {
    setDialogueOpen(true);
  }

  function onOverlayClick() {
    setDialogueOpen(false);
  }

  if (dialogueOpen) {
    return (
      <EditDialogueView
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        closeEventHandler={onOverlayClick}
        saveSettings={saveSettings}
      />
    );
  }

  return <EditDialogueButtonView clickEventHandler={onEditDialogueButtonClicked} />;
});
