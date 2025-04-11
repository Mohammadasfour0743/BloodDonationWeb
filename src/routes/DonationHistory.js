import { observer } from 'mobx-react-lite';
import { MdLogout } from 'react-icons/md';
import { Link, Navigate } from 'react-router';
import { signOutUser } from '../model/firebaseModel';
import { DonationHistoryTable } from '../presenter/DonationHistoryTable';

const DonationHistory = observer(function DonationHistory({ model }) {
  if (model.username === undefined || !model.ready) {
    return <div>Loading...</div>;
  }
  if (!model.username) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <header className="mainHeader">
        <div className="tabs">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsOXAO2AE1cxIe6KztXTbGRJXHvPGXcM6LNQ&s" />
          <Link to="/hospitalProfile">Current requests</Link>
          <Link to="/donationHistory">Donation history</Link>
          <a>About us</a>
        </div>
        <MdLogout
          className="logoutButton"
          size={25}
          color="white"
          onClick={() => {
            signOutUser();
          }}
        />
      </header>
      <DonationHistoryTable />
    </div>
  );
});
export default DonationHistory;
