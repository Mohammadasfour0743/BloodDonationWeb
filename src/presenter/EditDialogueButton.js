import { useState } from 'react';
import { RequestDialogueView } from '../view/RequestDialogueView';
import { observer } from 'mobx-react-lite';
import { EditDialogueButtonView } from '../view/EditDialogueButtonView';
import { EditDialogueView } from '../view/EditDialogueView';

export const EditDialogue = observer(function EditDialogue({ model }) {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [email, setEmail] = useState(model.email);
  const [phone, setPhone] = useState(model.phone);

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
      />
    );
  }

  return <EditDialogueButtonView clickEventHandler={onEditDialogueButtonClicked} />;
});
