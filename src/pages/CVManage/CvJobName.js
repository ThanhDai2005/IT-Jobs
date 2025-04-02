import { useEffect, useState } from "react";
import { getJobDetail } from "../../services/jobService";

function CVJobName(props) {
  const { record } = props;

  const [job, setJob] = useState();

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getJobDetail(record.idJob);
      setJob(response);
    };
    fetchAPI();
  }, []);

  return <>{job && <>{job.name}</>}</>;
}

export default CVJobName;
