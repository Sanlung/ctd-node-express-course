const LogOutButton = ({onLogOut}) => (
  <button type='button' onClick={(e) => onLogOut()}>
    Log out
  </button>
);

export default LogOutButton;
