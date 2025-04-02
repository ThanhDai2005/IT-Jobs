import { useEffect, useState } from "react";
import { getJobCompany } from "../../services/jobService";
import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";

function JobStatistic() {
  const id = getCookie("id");
  const [job, setJob] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getJobCompany(id);
      setJob(response);
    };
    fetchAPI();
  }, []);

  let cntStatus = 0;

  for (let i = 0; i < job.length; i++) {
    if (job[i].status == true) {
      cntStatus++;
    }
  }

  return (
    <>
      <Card title="Job">
        <div className="mb-5">
          Số lương hob: <strong>{job.length}</strong>
        </div>
        <div className="mb-5">
          Job đang bật: <strong>{cntStatus}</strong>
        </div>
        <div className="mb-5">
          Job đang tắt: <strong>{job.length - cntStatus}</strong>
        </div>
      </Card>
    </>
  );
}

export default JobStatistic;
