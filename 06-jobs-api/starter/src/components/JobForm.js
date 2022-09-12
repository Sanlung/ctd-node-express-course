import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import InputWithLabel from "./InputWithLabel";
import SelectWithLabel from "./SelectWithLabel";
import LogOutButton from "./LogOutButton";

const JobForm = ({
  message,
  token,
  urlPrefix,
  onUpdate,
  onLogOut,
  onSetMessage,
}) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("pending");
  let {id} = useParams();

  const getJob = async () => {
    if (id) {
      try {
        const response = await fetch(`${urlPrefix}/api/v1/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.status === 200) {
          setCompany(data.job.company);
          setPosition(data.job.position);
          setStatus(data.job.status);
        } else {
          onSetMessage("The job entry was not found");
        }
      } catch (err) {
        onSetMessage("A communications error occurred");
      }
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  const handleUpdateJobs = (e) => {
    e.preventDefault();
    onUpdate(id, company, position, status);
    setCompany("");
    setPosition("");
    setStatus("pending");
  };

  return (
    <>
      <LogOutButton onLogOut={onLogOut} />
      <hr />
      <p>{message}</p>
      <hr />
      <form onSubmit={handleUpdateJobs}>
        <InputWithLabel
          name='company'
          type='text'
          value={company}
          onSetValue={setCompany}>
          Company:
        </InputWithLabel>
        <InputWithLabel
          name='position'
          type='text'
          value={position}
          onSetValue={setPosition}>
          Position:
        </InputWithLabel>
        <SelectWithLabel name='status' value={status} onSetValue={setStatus} />
        <button type='submit'>{id ? "Update" : "Add"}</button>{" "}
        <Link to='/jobs'>
          <button type='button' onClick={(e) => onSetMessage("")}>
            Cancel
          </button>
        </Link>
      </form>
    </>
  );
};

export default JobForm;
