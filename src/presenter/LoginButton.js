import { useNavigate } from 'react-router';
import { LoginButtonView } from '../view/LoginButtonView';

export function LoginButton() {
  const navigate = useNavigate();
  function onLoginClicked() {
    navigate('/hospitalprofile');
  }

  return <LoginButtonView clickEventHandler={onLoginClicked} />;
}
