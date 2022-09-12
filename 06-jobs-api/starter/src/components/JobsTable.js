import JobEntry from "./JobEntry";

const JobsTable = ({jobs, onRemoveJob}) => (
  <table>
    <thead>
      <tr>
        <th>Company</th>
        <th>Position</th>
        <th>Status</th>
        <th colSpan={2}></th>
      </tr>
    </thead>
    <tbody>
      {jobs.map((job) => (
        <JobEntry
          key={job._id}
          jobId={job._id}
          company={job.company}
          position={job.position}
          status={job.status}
          onRemoveJob={onRemoveJob}
        />
      ))}
    </tbody>
  </table>
);

export default JobsTable;
