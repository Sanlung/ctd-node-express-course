import {Link} from "react-router-dom";
import LogOutButton from "./LogOutButton";
import JobsTable from "./JobsTable";

const Jobs = ({jobs, message, onRemoveJob, onSetMessage, onLogOut}) => (
  <>
    <LogOutButton onLogOut={onLogOut} />
    <hr />
    <p>{message}</p>
    <hr />
    <div>
      {jobs[0] === "loading" ? (
        <p>Loading ...</p>
      ) : jobs.length ? (
        <JobsTable jobs={jobs} onRemoveJob={onRemoveJob} />
      ) : (
        <p>There are no jobs to display for this user</p>
      )}
      <Link to='/jobs/new'>
        <button onClick={(e) => onSetMessage("")}>Add job</button>
      </Link>
    </div>
  </>
);

export default Jobs;
