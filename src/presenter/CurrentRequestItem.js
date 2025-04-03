import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { CurrentRequestItemView } from '../view/CurrentRequestItemView';
import { removeReq } from '../model/firebaseModel';

export const CurrentRequestItem = observer(function CurrentRequestItem({
  deactivateRequest,
  request,
  idx,
  hospitalName,
}) {
  const [isOpen, setOpen] = useState(false);

  function removeItem(requestId) {
    deactivateRequest(requestId);
    removeReq(requestId);
  }

  return (
    <CurrentRequestItemView
      request={request}
      idx={idx}
      isOpen={isOpen}
      setOpen={setOpen}
      removeItem={removeItem}
      hospitalName={hospitalName}
    />
  );
});
