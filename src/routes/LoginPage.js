import { LoginButton } from '../presenter/LoginButton';
import { observer } from 'mobx-react-lite';
import { LoginForm } from '../presenter/LoginForm';

const LoginPage = observer(function LoginPage() {
  return <LoginForm />;
});
export default LoginPage;
