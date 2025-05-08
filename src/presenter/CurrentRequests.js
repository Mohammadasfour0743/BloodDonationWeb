import { observer } from 'mobx-react-lite';
import { CurrentRequestsView } from '../view/CurrentRequestsView';
import { sortByDate } from '../utils';

export const CurrentRequests = observer(function CurrentRequests({ model }) {
  return (
    <CurrentRequestsView
      requests={sortByDate(
        model.requests.filter((ele) => {
          return ele.current;
        })
      )}
      hospitalName={model.name}
      deactivateRequest={(id) => model.deactivateRequest(id)}
      model={model}
    />
  );
});
