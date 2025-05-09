import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { AreYouSureDialogView } from '../view/AreYouSureDialogView';
import { AreYouSureDialogButtonView } from '../view/AreYouSureDialogButtonView';
import { useIsMobile } from '../hooks/useIsMobile';
import { MobileAreYouSure } from '../view/mobile/MobileAreYouSure';

export const AreYouSureDialog = observer(function AreYouSureDialog({ model, removeItem, requestId }) {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const isMobile = useIsMobile();

  function onYesClicked(event) {
    event.stopPropagation();
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

  if (isMobile) {
    return <MobileAreYouSure removeRequest={onYesClicked} closeEventHandler={onOverlayClick} />;
  }

  if (dialogueOpen) {
    return <AreYouSureDialogView removeRequest={onYesClicked} closeEventHandler={onOverlayClick} />;
  }

  return <AreYouSureDialogButtonView clickEventHandler={onEditDialogueButtonClicked} />;
});
