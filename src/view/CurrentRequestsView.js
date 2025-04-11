import { CurrentRequestItem } from '../presenter/CurrentRequestItem';

export function CurrentRequestsView({ requests, deactivateRequest, hospitalName }) {
  return (
    <div className="current-requests">
      <div className="current-requests-content">
        <h1>Current requests</h1>
        {requests.map((request, idx) => (
          <CurrentRequestItem
            hospitalName={hospitalName}
            request={request}
            deactivateRequest={deactivateRequest}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
}
