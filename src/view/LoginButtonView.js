export function LoginButtonView({ clickEventHandler }) {
  return (
    <div className="loginButtonContainer">
      <button className="button" onClick={clickEventHandler}>
        Login
      </button>
    </div>
  );
}
