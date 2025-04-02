import { observer } from 'mobx-react-lite';
import { CurrentRequestsView } from '../view/CurrentRequestsView';

export const CurrentRequests = observer(function CurrentRequests({ model }) {
  return <CurrentRequestsView requests={model.getRequests()} removeRequest={(id) => model.removeRequest(id)} />;
});
