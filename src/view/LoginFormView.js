import { FaRegCircleUser } from 'react-icons/fa6';

export function LoginFormView({ error, email, password, setEmail, setPassword, loginFunction }) {
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-image">
          <h1 className="login-title">
            Blood <span>Share</span>
          </h1>
        </div>
        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault();
            loginFunction();
          }}
        >
          <h1>Log In</h1>
          {error && <p className="login-error">{error}</p>}
          <div className="login-input-container">
            <FaRegCircleUser size={22} />
            <input
              className="login-input"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="email"
              placeholder="Email address"
            />
          </div>
          <div className="login-input-container">
            <FaRegCircleUser size={22} />
            <input
              className="login-input"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              placeholder="Password"
            />
          </div>
          <p className="login-forgot">
            Forgot your password? <a href="https://teamsigmoidwebsite.vercel.app/">Contact us</a>
          </p>
          <button className="login-button" type="submit">
            Log In
          </button>
          <div className="login-account">
            <p>
              You are a hospital and do not have an account? You are missing out on blood!!!{' '}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSckhDpJUwjaYR_hO6n6-G25EdzTnzuqXCu0_E39SwozYqXKjg/viewform?usp=header"
                className="login-atag"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
