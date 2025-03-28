import { LoginButton } from '../presenter/LoginButton';
import { observer } from 'mobx-react-lite';

const LoginPage = observer(function LoginPage({ model }) {
  return <LoginButton />;
});
export default LoginPage;
