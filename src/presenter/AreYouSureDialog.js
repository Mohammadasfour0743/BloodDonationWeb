import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { AreYouSureDialogView } from '../view/AreYouSureDialogView';
import { AreYouSureDialogButtonView } from '../view/AreYouSureDialogButtonView';

export const AreYouSureDialog = observer(function AreYouSureDialog({ model, removeItem, requestId }) {
  const [dialogueOpen, setDialogueOpen] = useState(false);

  function onYesClicked() {
    setDialogueOpen(false);
    removeItem(requestId);
  }

  function onEditDialogueButtonClicked(event) {
    event.stopPropagation();
    setDialogueOpen(true);
  }

  function onOverlayClick() {
    setDialogueOpen(false);
  }

  if (dialogueOpen) {
    return <AreYouSureDialogView removeRequest={onYesClicked} closeEventHandler={onOverlayClick} />;
  }

  return <AreYouSureDialogButtonView clickEventHandler={onEditDialogueButtonClicked} />;
});
