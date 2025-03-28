import { RequestDialogueButtonView } from '../view/RequestDialogueButtonView';
import { useState } from 'react';
import { RequestDialogueView } from '../view/RequestDialogueView';

export function RequestDialogue() {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  function onRequestDialogueButtonClicked() {
    setDialogueOpen(true);
  }

  function onOverlayClick() {
    setDialogueOpen(false);
  }

  if (dialogueOpen) {
    return <RequestDialogueView closeEventHandler={onOverlayClick} />;
  }

  return <RequestDialogueButtonView clickEventHandler={onRequestDialogueButtonClicked} />;
}
