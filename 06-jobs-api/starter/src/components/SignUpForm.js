import {useState} from "react";
import {Link} from "react-router-dom";
import InputWithLabel from "./InputWithLabel";

const SignUpForm = ({message, onSetMessage, onSignUp}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const handleSetName = (name) => setName(name);

  const handleSetEmail = (email) => setEmail(email);

  const handleSetPassword = (password) => setPassword(password);

  const handleSetPassword1 = (password1) => setPassword1(password1);

  const handleSignUp = (e) => {
    e.preventDefault();
    onSignUp(name, email, password, password1);
    setName("");
    setEmail("");
    setPassword("");
    setPassword1("");
  };

  return (
    <>
      <hr />
      <p>{message}</p>
      <hr />
      <form onSubmit={handleSignUp}>
        <InputWithLabel
          name='name'
          type='text'
          value={name}
          onSetValue={handleSetName}>
          Name:
        </InputWithLabel>
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
        <InputWithLabel
          name='password1'
          type='password'
          value={password1}
          onSetValue={handleSetPassword1}>
          Confirm Password:
        </InputWithLabel>
        <button type='submit'>Register</button>{" "}
        <Link to='/'>
          <button type='button' onClick={(e) => onSetMessage("")}>
            Cancel
          </button>
        </Link>
      </form>
    </>
  );
};

export default SignUpForm;
