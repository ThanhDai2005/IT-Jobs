import { Card, Tag } from "antd";
import GoBack from "../../components/GoBack";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { changeStatusCV, getCV } from "../../services/cvService";
import { getJobDetail } from "../../services/jobService";

function CVDetail() {
  const params = useParams();
  const [cv, setCV] = useState();
  const [job, setJob] = useState();

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getCV(params.id);
      const responseJob = await getJobDetail(response.idJob);
      setCV(response);
      setJob(responseJob);
    };
    fetchAPI();
  }, []);

  changeStatusCV(params.id, { statusRead: true });

  return (
    <>
      <GoBack />
      {cv && job && (
        <>
          <div className="mt-20">
            <Card title={`Ứng viên: ` + cv.name}>
              <div className="mb-20">
                Ngày gửi: <strong>{cv.createAt}</strong>
              </div>
              <div className="mb-20">
                Số điện thoại: <strong>{cv.phone}</strong>
              </div>
              <div className="mb-20">
                Email: <strong>{cv.email}</strong>
              </div>
              <div className="mb-20">
                Thành phố ứng tuyển: <strong>{cv.city}</strong>
              </div>
              <div className="mb-20">
                <div className="mb-10">Giới thiệu bản thân:</div>
                {cv.description}
              </div>
              <div className="mb-20">
                <div className="mb-10">Link project :</div>
                {cv.linkProject}
              </div>
            </Card>
          </div>
          <div className="mt-20">
            <Card title={`Thông tin job: ` + job.name}>
              <div className="mb-20">
                Tag:{" "}
                {(job.tags || "").map((item) => (
                  <Tag color="blue">{item}</Tag>
                ))}
              </div>
              <div className="mb-20">
                Mức lương: <strong>{job.salary}$</strong>
              </div>
              <div className="mb-20">
                <div className="mb-10">Mô tả:</div>
                {job.description}
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export default CVDetail;
