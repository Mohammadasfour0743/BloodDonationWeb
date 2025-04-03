import { observer } from 'mobx-react-lite';
import { LoginFormView } from '../view/LoginFormView';
import { useState } from 'react';

export const LoginForm = observer(function LoginFormRender() {
  const [emailAddress, setEmail] = useState();
  const [password, setPassword] = useState();

  function authenticateUser() {
    console.log(emailAddress);
    console.log(password);
  }

  return (
    <LoginFormView
      loginFunction={authenticateUser}
      email={emailAddress}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
});
