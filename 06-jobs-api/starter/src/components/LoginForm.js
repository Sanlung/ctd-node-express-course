import {useState} from "react";
import {Link} from "react-router-dom";
import InputWithLabel from "./InputWithLabel";

const LoginForm = ({message, onSetMessage, onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetEmail = (email) => setEmail(email);

  const handleSetPassword = (password) => setPassword(password);

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <hr />
      <p>{message}</p>
      <hr />
      <form onSubmit={handleLogin}>
        <InputWithLabel
          name='email'
          type='email'
          value={email}
          onSetValue={handleSetEmail}>
          Email:
        </InputWithLabel>
        <InputWithLabel
          name='password'
          type='password'
          value={password}
          onSetValue={handleSetPassword}>
          Password:
        </InputWithLabel>
        <button type='submit'>Login</button>{" "}
        <Link to='/'>
          <button type='button' onClick={(e) => onSetMessage("")}>
            Cancel
          </button>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
