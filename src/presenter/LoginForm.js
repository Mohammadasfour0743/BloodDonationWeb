import { observer } from 'mobx-react-lite';
import { LoginFormView } from '../view/LoginFormView';
import { useState } from 'react';
import { signIn } from '../model/firebaseModel';
import { useNavigate } from 'react-router';
import { useIsMobile } from '../hooks/useIsMobile';
import { MobileLoginPage } from '../view/mobile/MobileLoginForm';

export const LoginForm = observer(function LoginFormRender() {
  const isMobile = useIsMobile();
  const [emailAddress, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function authenticateUser() {
    const { success, message } = await signIn(emailAddress, password);
    if (!success) {
      setError('Invalid credentials');
      return;
    }
    navigate('/hospitalProfile');
  }

  if (isMobile) {
    return (
      <MobileLoginPage
        loginFunction={authenticateUser}
        email={emailAddress}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
      />
    );
  }

  return (
    <LoginFormView
      loginFunction={authenticateUser}
      email={emailAddress}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
    />
  );
});
