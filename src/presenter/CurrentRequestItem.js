import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { CurrentRequestItemView } from '../view/CurrentRequestItemView';

export const CurrentRequestItem = observer(function CurrentRequestItem({ removeRequest, request, idx }) {
  const [isOpen, setOpen] = useState(false);

  function removeItem(requestId) {
    removeRequest(requestId);
  }

  return (
    <CurrentRequestItemView request={request} idx={idx} isOpen={isOpen} setOpen={setOpen} removeItem={removeItem} />
  );
});
