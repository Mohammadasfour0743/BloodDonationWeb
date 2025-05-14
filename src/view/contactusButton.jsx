const ContactUsButton = () => {
  return (
    <button
      className="contactusButton"
      onClick={() => {
        window.open('https://teamsigmoidwebsite.vercel.app', '_blank');
      }}
    >
      Contact us
    </button>
  );
};

export default ContactUsButton;
