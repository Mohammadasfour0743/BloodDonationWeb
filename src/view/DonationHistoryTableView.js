import { useIsMobile } from '../hooks/useIsMobile';

export function DonationHistoryTableView({ requests }) {
  const isMobile = useIsMobile();

  function UrgentBox() {
    return (
      <div className="donation-history-col3">
        <h3 className="donation-history-type-text donation-history-urgent-box ">Urgent</h3>
      </div>
    );
  }

  function renderRequestRow(request) {
    return (
      <div className="donation-history-table-row">
        <h3 className="donation-history-col1 donation-item-id">
          {!isMobile ? request.id.substr(0, 13) : request.id.substr(0, 5)}...
        </h3>
        <h3 className="donation-history-col2">{request.bloodTypes.reduce((acc, curr) => curr + ' ' + acc, '')}</h3>
        {request.urgency ? (
          <UrgentBox />
        ) : (
          <h3 className="donation-history-col3 donation-history-type-text">Non-urgent</h3>
        )}
        <h3 className="donation-history-col4">{'27/03/2025'}</h3>
        <h3 className="donation-history-col5">{'2'} replies</h3>
      </div>
    );
  }

  return (
    <div className="donation-history-page">
      <div className="donation-history-header">
        <h1>Donation History</h1>
      </div>
      <div className="donation-history-table">
        <div className="donation-history-table-header">
          <h3 className="donation-history-col1">ID</h3>
          <h3 className="donation-history-col2">Blood Type(s)</h3>
          <h3 className="donation-history-col3">Type</h3>
          <h3 className="donation-history-col4">Date deleted</h3>
          <h3 className="donation-history-col5">Response count</h3>
        </div>
        <div className="donation-history-body">{requests.map(renderRequestRow)}</div>
      </div>
    </div>
  );
}
