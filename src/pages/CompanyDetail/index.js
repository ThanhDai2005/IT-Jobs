import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailCompany } from "../../services/companyService";
import { getJobCompany } from "../../services/jobService";
import GoBack from "../../components/GoBack";
import { Card, Col, Row, Tag } from "antd";

function CompanyDetail() {
  const params = useParams();

  const [company, setCompany] = useState([]);
  const [job, setJob] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getDetailCompany(params.id);
      const jobCompany = await getJobCompany(params.id);
      setCompany(response);
      setJob(jobCompany);
    };
    fetchAPI();
  }, []);

  console.log(job);

  return (
    <>
      <GoBack />

      {company && (
        <>
          <h2>{company.companyName}</h2>
          <div className="mb-20">
            Địa chỉ: <strong>{company.address}</strong>
          </div>
          <div className="mb-20">
            Số lượng nhân sư: <strong>{company.quantityPeople}</strong>
          </div>
          <div className="mb-20">
            Thời gian làm việc: <strong>{company.workingTime}</strong>
          </div>
          <div className="mb-20">
            Link website: <strong>{company.website}</strong>
          </div>
          <div className="mb-20">
            <div className="mb-10">Mô tả ngắn:</div>
            <div>{company.description}</div>
          </div>
          <div className="mb-20">
            <div className="mb-10">Mô tả chi tiết:</div>
            <div>{company.detail}</div>
          </div>

          <div className="mb-10">Danh sách các job: </div>

          <div className="mb-20">
            <Row gutter={[20, 20]}>
              {job.map((item) => (
                <Col xl={8} lg={8}>
                  <Link to={`/job/${item.id}`}>
                    <Card title={item.name}>
                      <div className="mb-10">
                        <span>Ngôn ngữ: </span>
                        {(item.tags || "").map((value) => (
                          <Tag color="blue">{value}</Tag>
                        ))}
                      </div>
                      <div className="mb-10">
                        <span>Thành phố: </span>
                        {(item.city || "").map((value) => (
                          <Tag color="orange">{value}</Tag>
                        ))}
                      </div>
                      <div className="mb-10">
                        Lương: <strong>{item.salary}$</strong>
                      </div>
                      <div className="mb-10">Công ty:</div>
                      <div className="mb-10">
                        Ngày tạo: <strong>{item.createAt}</strong>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default CompanyDetail;
