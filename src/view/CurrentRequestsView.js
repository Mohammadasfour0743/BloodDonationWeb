export function CurrentRequestsView({ requests }) {
  function renderItem(request, idx) {
    return (
      <div className="current-request-item" key={idx}>
        <div className="current-request-item-header">
          <h2>{request.hospital.name}</h2>
          <div className="separator" />
          <h2>Blood type {request.bloodType}</h2>
        </div>
        <div className="urgency">
          <p>{request.urgency && `Urgent request for ${request.amount} unit(s)`}</p>
        </div>
        <p className="id">ID {request.id}</p>
      </div>
    );
  }

  return (
    <div className="current-requests">
      <div className="current-requests-content">
        <h1>Current requests</h1>
        {requests.map(renderItem)}
        <button>Donation history</button>
      </div>
    </div>
  );
}
