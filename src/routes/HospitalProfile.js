import { observer } from 'mobx-react-lite';
import { RequestDialogue } from '../presenter/RequestDialogueButton';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CurrentRequests } from '../presenter/CurrentRequests';
import { MdOutlineMailOutline } from 'react-icons/md';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { EditDialogue } from '../presenter/EditDialogueButton';
import { Navigate } from 'react-router';

const HospitalProfile = observer(function HospitalProfile({ model }) {
  if (model.username === null) {
    return <Navigate to={'/'} />;
  }

  if (model.username === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="mainHeader">
        <GiHamburgerMenu color="white" size={35} />
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
        <EditDialogue model={model} />
        <p>{model.phone}</p>
      </div>
      <CurrentRequests model={model} />
      <RequestDialogue model={model} />
    </div>
  );
});

export default HospitalProfile;
