import { observer } from 'mobx-react-lite';
import { MdLogout } from 'react-icons/md';
import { Link, Navigate } from 'react-router';
import { signOutUser } from '../model/firebaseModel';
import { DonationHistoryTable } from '../presenter/DonationHistoryTable';
import ContactUsButton from '../view/contactusButton';

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
          <img src="/logo5.png" alt="Logo" />
          <Link to="/hospitalProfile">Current requests</Link>
          <Link to="/donationHistory">Donation history</Link>
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
      <DonationHistoryTable model={model} />
      <ContactUsButton></ContactUsButton>
    </div>
  );
});
export default DonationHistory;
