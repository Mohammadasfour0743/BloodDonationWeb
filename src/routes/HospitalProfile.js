import { observer } from 'mobx-react-lite';
import { RequestDialogue } from '../presenter/RequestDialogueButton';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CurrentRequests } from '../presenter/CurrentRequests';
import { MdOutlineMailOutline } from 'react-icons/md';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { EditDialogue } from '../presenter/EditDialogueButton';
import { Link, Navigate } from 'react-router';
import { MdLogout } from 'react-icons/md';
import { signOutUser } from '../model/firebaseModel';
import { reactiveModel } from '..';
import ContactUsButton from '../view/contactusButton';

const HospitalProfile = observer(function HospitalProfile({ model }) {
  if (model.username === null) {
    return <Navigate to={'/'} />;
  }

  if (model.username === undefined || !model.ready) {
    return <div>Loading...</div>;
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
      <div className="hero">
        <div className="hero-content">
          <div>
            <h1>{reactiveModel.name} Profile</h1>
            <h2>Located in: {reactiveModel.location}</h2>
          </div>
        </div>
      </div>
      <div className="contact">
        <p className="contact-text">Contact</p>
        <div className="separator" />
        <MdOutlineMailOutline className="contact-icon" />
        <p>{model.email}</p>
        <div className="separator" />
        <MdOutlineLocalPhone className="contact-icon" />
        <p>{model.phone}</p>

        <EditDialogue model={model} />
      </div>
      <CurrentRequests model={model} />
      <RequestDialogue model={model} />
      <ContactUsButton></ContactUsButton>
    </div>
  );
});

export default HospitalProfile;
