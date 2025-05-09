import { Link } from 'react-router';

import './mobile-login.css';
import { MobileRegistrationForm } from './MobileRegistrationForm';

export function MobileLoginPage({ error, email, password, setEmail, setPassword, loginFunction }) {
  return (
    <div className="mobile-login-container">
      <div className="mobile-login-page">
        <div>
          <h1>Log In</h1>
        </div>
        <div className="mobile-inputs">
          {error && <p>{error}</p>}
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button onClick={loginFunction}>Log In</button>
        </div>
        <div className="mobile-login-footer">
          <p>
            Don't have an account? <MobileRegistrationForm />
          </p>
        </div>
      </div>
    </div>
  );
}
