import { observer } from 'mobx-react-lite';
import { RequestDialogue } from '../presenter/RequestDialogueButton';

const HospitalProfile = observer(function HospitalProfile({ model }) {
  return (
    <>
      <div>
        <h1>Hospital Profile</h1>
      </div>

      <RequestDialogue />
    </>
  );
});

export default HospitalProfile;
