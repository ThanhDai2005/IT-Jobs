import { useParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import { getJobDetail } from "../../services/jobService";
import { Tag } from "antd";

function JobDetailAdmin() {
  const params = useParams();
  const [detailJob, setDetailJob] = useState();

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getJobDetail(params.id);
      setDetailJob(response);
    };
    fetchAPI();
  }, []);

  return (
    <>
      <GoBack />

      {detailJob && (
        <>
          <h2>Tên job: {detailJob.name}</h2>
          <div className="mb-20">
            Trạng thái:{" "}
            {detailJob.status ? (
              <Tag color="green">Đang bật</Tag>
            ) : (
              <Tag color="red">Đang tắt</Tag>
            )}
          </div>
          <div className="mb-20">
            Tags:{" "}
            {(detailJob.tags || "").map((item) => (
              <Tag color="blue">{item}</Tag>
            ))}
          </div>
          <div className="mb-20">
            Mức lương: <strong>{detailJob.salary}$</strong>
          </div>
          <div className="mb-20">
            Ngày tạo: <strong>{detailJob.createAt}</strong>
          </div>
          <div className="mb-20">
            Cập nhật: <strong>{detailJob.updateAt}</strong>
          </div>
          <div className="mb-20">
            City:{" "}
            {(detailJob.city || "").map((item) => (
              <Tag color="orange">{item}</Tag>
            ))}
          </div>
          <div className="mb-20">
            <div className="mb-10">Mô tả:</div>
            <div>{detailJob.description}</div>
          </div>
        </>
      )}
    </>
  );
}

export default JobDetailAdmin;
