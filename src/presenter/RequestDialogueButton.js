import { RequestDialogueButtonView } from '../view/RequestDialogueButtonView';
import { useState } from 'react';
import { RequestDialogueView } from '../view/RequestDialogueView';
import { observer } from 'mobx-react-lite';
import { useIsMobile } from '../hooks/useIsMobile';
import { MobileCreateRequestForm } from '../view/mobile/MobileCreateRequestForm';

export const RequestDialogue = observer(function RequestDialogue({ model }) {
  const isMobile = useIsMobile();
  const [dialogueOpen, setDialogueOpen] = useState(false);
  function onRequestDialogueButtonClicked() {
    setDialogueOpen(true);
  }

  function onOverlayClick() {
    setDialogueOpen(false);
  }

  if (isMobile) {
    return (
      <MobileCreateRequestForm
        closeEventHandler={onOverlayClick}
        hospitalName={model.name}
        hospitalEmail={model.email}
        hospitalLocation={model.location}
        addRequest={(req) => model.addRequest(req)}
        reactiveModel={model}
      />
    );
  }

  if (dialogueOpen) {
    return (
      <RequestDialogueView
        closeEventHandler={onOverlayClick}
        hospitalName={model.name}
        hospitalEmail={model.email}
        hospitalLocation={model.location}
        addRequest={(req) => model.addRequest(req)}
        reactiveModel={model}
      />
    );
  }

  return <RequestDialogueButtonView clickEventHandler={onRequestDialogueButtonClicked} />;
});
