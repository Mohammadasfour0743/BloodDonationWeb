export function LoginFormView({ email, password, setEmail, setPassword, loginFunction }) {
  return (
    <div className="login-container">
      <div className="login-image"></div>
      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault();
          loginFunction();
        }}
      >
        <h1>Log In</h1>
        <input
          className="login-input"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          placeholder="Email address"
        />
        <input
          className="login-input"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
          type="password"
          placeholder="Password"
        />
        <button className="login-button" type="submit">
          Log In
        </button>
        <div className="login-account">
          <p>Don't have an account yet?</p>
          <a href="https://www.y8.com/games/fruit_merge" className="login-atag">
            {' '}
            Sign up{' '}
          </a>
        </div>
      </form>
    </div>
  );
}
