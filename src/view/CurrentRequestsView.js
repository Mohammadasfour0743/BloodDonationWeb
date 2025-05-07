import { observer } from 'mobx-react-lite';
import { CurrentRequestItem } from '../presenter/CurrentRequestItem';

export const CurrentRequestsView = observer(function CurrentRequestsView({
  requests,
  deactivateRequest,
  hospitalName,
  model,
}) {
  return (
    <div className="current-requests">
      <div className="current-requests-content">
        <h1>Current requests</h1>
        {requests.map((request, idx) => (
          <CurrentRequestItem
            model={model}
            hospitalName={hospitalName}
            request={request}
            deactivateRequest={deactivateRequest}
            idx={idx}
            responses={model.getResponses(request.id).length}
          />
        ))}
      </div>
    </div>
  );
});
