import {Link} from "react-router-dom";

const JobEntry = ({jobId, company, position, status, onRemoveJob}) => (
  <tr>
    <td>{company}</td>
    <td>{position}</td>
    <td>{status}</td>
    <td>
      <Link to={`/jobs/edit/${jobId}`}>
        <button type='button'>Edit</button>
      </Link>
    </td>
    <td>
      <button type='button' onClick={(e) => onRemoveJob(jobId)}>
        Remove
      </button>
    </td>
  </tr>
);

export default JobEntry;
