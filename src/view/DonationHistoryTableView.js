export function DonationHistoryTableView({ requests }) {
  function renderRequestRow(request) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        <h1>Donation History</h1>
      </div>
      <div>
        <div>
          <h2>ID</h2>
          <h3>Blood Type(s)</h3>
          <h3>Type</h3>
          <h3>Date deleted</h3>
          <h3>Response count</h3>
        </div>
        {requests.map(renderRequestRow)}
      </div>
    </div>
  );
}
