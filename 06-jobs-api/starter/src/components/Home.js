import {Link} from "react-router-dom";

const Home = ({message, onSetMessage}) => (
  <>
    <hr />
    <p>{message}</p>
    <hr />
    <Link to='/login'>
      <button type='button' onClick={(e) => onSetMessage("")}>
        Login
      </button>
    </Link>{" "}
    <Link to='/register'>
      <button type='button' onClick={(e) => onSetMessage("")}>
        Register
      </button>
    </Link>
  </>
);

export default Home;
