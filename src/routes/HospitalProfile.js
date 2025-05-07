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
      <div className="hero">
        <div className="hero-content">
          <div>
            <h1>Hospital Profile</h1>
            <h2>Located in: {model.location}</h2>
          </div>
        </div>
      </div>
      <div className="contact">
        <p>Contact</p>
        <div className="separator" />
        <MdOutlineMailOutline style={{ marginRight: -12 }} />
        <p>{model.email}</p>
        <div className="separator" />
        <MdOutlineLocalPhone style={{ marginRight: -12 }} />
        <p>{model.phone}</p>

        <EditDialogue model={model} />
      </div>
      <CurrentRequests model={model} />
      <RequestDialogue model={model} />
    </div>
  );
});

export default HospitalProfile;
