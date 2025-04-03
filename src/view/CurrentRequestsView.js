import { CurrentRequestItem } from '../presenter/CurrentRequestItem';

export function CurrentRequestsView({ requests, deactivateRequest }) {
  return (
    <div className="current-requests">
      <div className="current-requests-content">
        <h1>Current requests</h1>
        {requests.map((request, idx) => (
          <CurrentRequestItem request={request} deactivateRequest={deactivateRequest} idx={idx} />
        ))}
        <button>Donation history</button>
      </div>
    </div>
  );
}
