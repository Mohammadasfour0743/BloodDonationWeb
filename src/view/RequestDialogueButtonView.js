import { CiCirclePlus } from 'react-icons/ci';
import { useIsMobile } from '../hooks/useIsMobile';

export function RequestDialogueButtonView({ clickEventHandler }) {
  const isMobile = useIsMobile();

  return (
    <button className="requestDialogueButton" onClick={clickEventHandler}>
      <CiCirclePlus size={isMobile ? 80 : 100} color="black" />
    </button>
  );
}
