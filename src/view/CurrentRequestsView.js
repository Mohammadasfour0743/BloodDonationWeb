import { CurrentRequestItem } from '../presenter/CurrentRequestItem';

export function CurrentRequestsView({ requests, removeRequest }) {
  return (
    <div className="current-requests">
      <div className="current-requests-content">
        <h1>Current requests</h1>
        {requests.map((request, idx) => (
          <CurrentRequestItem request={request} removeRequest={removeRequest} idx={idx} />
        ))}
        <button>Donation history</button>
      </div>
    </div>
  );
}
