import { observer } from 'mobx-react-lite';
import { RequestDialogue } from '../presenter/RequestDialogueButton';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { CurrentRequests } from '../presenter/CurrentRequests';
import { MdOutlineMailOutline } from 'react-icons/md';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { EditDialogue } from '../presenter/EditDialogueButton';

const HospitalProfile = observer(function HospitalProfile({ model }) {
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
        <p>{model.contact.email}</p>
        <div className="separator" />
        <MdOutlineLocalPhone style={{ marginRight: -12 }} />
        <p>{model.contact.phone}</p>
        <EditDialogue model={model} />
      </div>
      <CurrentRequests model={model} />
      <RequestDialogue model={model} />
    </div>
  );
});

export default HospitalProfile;
