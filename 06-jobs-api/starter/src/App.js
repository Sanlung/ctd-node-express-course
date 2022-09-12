import {useState, useEffect, useRef, useCallback} from "react";
import {Routes, Route, Link, Navigate, useNavigate} from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import JobForm from "./components/JobForm";
import Jobs from "./components/Jobs";

const useSemiPersistentState = (key, initialState) => {
  const isMounted = useRef(false);
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialState
  );
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [token, setToken] = useSemiPersistentState("token", null);
  const [jobs, setJobs] = useState(["loading"]);
  const [message, setMessage] = useState("");
  const urlPrefix = `https://sanlung-jobs-api.herokuapp.com`;
  let navigate = useNavigate();

  const getJobs = useCallback(async () => {
    if (token) {
      try {
        const response = await fetch(`${urlPrefix}/api/v1/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application-json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.status === 200) {
          setJobs(data.jobs);
        } else {
          setMessage(data.msg);
        }
      } catch (err) {
        setMessage("A communications error occurred");
      }
    }
  }, [token, urlPrefix]);

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const register = async (name, email, password, password1) => {
    setMessage("");
    if (password !== password1) {
      setMessage("The passwords entered do not match");
    } else {
      try {
        const response = await fetch(`${urlPrefix}/api/v1/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
        const data = await response.json();

        if (response.status === 201) {
          setMessage(`Registration successful. Welcome ${data.user.name}`);
          setToken(data.token);
          await getJobs();
          navigate("/jobs");
        } else {
          setMessage(data.msg);
        }
      } catch (err) {
        setMessage("A communications error occurred");
      }
    }
  };

  const login = async (email, password) => {
    setMessage("");
    try {
      const response = await fetch(`${urlPrefix}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password}),
      });
      const data = await response.json();

      if (response.status === 200) {
        setMessage(`Login successful. Welcome ${data.user.name}`);
        setToken(data.token);
        await getJobs();
        navigate("/jobs");
      } else {
        setMessage(data.msg);
      }
    } catch (err) {
      setMessage("A communications error occurred");
    }
  };

  const logOut = () => {
    setToken(null);
    setJobs(["loading"]);
    setMessage("You are logged out");
    navigate("/");
  };

  const addJob = async (__, company, position, status) => {
    setMessage("");
    try {
      const response = await fetch(`${urlPrefix}/api/v1/jobs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: company,
          position: position,
          status: status,
        }),
      });
      const data = await response.json();

      if (response.status === 201) {
        setMessage("The job entry was created");
        await getJobs();
        navigate("/jobs");
      } else {
        setMessage(data.msg);
      }
    } catch (err) {
      setMessage("A communications error occurred");
    }
  };

  const updateJob = async (jobId, company, position, status) => {
    setMessage("");
    try {
      const response = await fetch(`${urlPrefix}/api/v1/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: company,
          position: position,
          status: status,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        setMessage("The job entry was updated");
        getJobs();
        navigate("/jobs");
      } else {
        setMessage(data.msg);
      }
    } catch (err) {
      setMessage("A communications error occurred");
    }
  };

  const removeJob = async (jobId) => {
    setMessage("");
    try {
      const response = await fetch(`${urlPrefix}/api/v1/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setMessage(data.msg);
      if (response.status === 200) {
        await getJobs();
      }
    } catch (err) {
      setMessage("A communications error occurred");
    }
  };

  return (
    <div className='container'>
      <h1>Jobs List</h1>
      <Routes>
        <Route
          path='register'
          element={
            <SignUpForm
              message={message}
              onSetMessage={setMessage}
              onSignUp={register}
            />
          }
        />
        <Route
          path='login'
          element={
            <LoginForm
              message={message}
              onSetMessage={setMessage}
              onLogin={login}
            />
          }
        />
        <Route
          path='jobs/edit/:id'
          element={
            token ? (
              <JobForm
                message={message}
                token={token}
                urlPrefix={urlPrefix}
                onUpdate={updateJob}
                onLogOut={logOut}
                onSetMessage={setMessage}
              />
            ) : (
              <Navigate replace to='/' />
            )
          }
        />
        <Route
          path='jobs/new'
          element={
            token ? (
              <JobForm
                message={message}
                token={token}
                onUpdate={addJob}
                onLogOut={logOut}
                onSetMessage={setMessage}
              />
            ) : (
              <Navigate replace to='/' />
            )
          }
        />
        <Route
          path='jobs'
          element={
            token ? (
              <Jobs
                jobs={jobs}
                message={message}
                onRemoveJob={removeJob}
                onLogOut={logOut}
                onSetMessage={setMessage}
              />
            ) : (
              <Navigate replace to='/' />
            )
          }
        />
        <Route
          path='/'
          element={<Home message={message} onSetMessage={setMessage} />}
        />
      </Routes>
      <div style={{marginTop: "1rem"}}>
        <Link to='/api-docs'>Documentation</Link>
      </div>
    </div>
  );
};

export default App;
