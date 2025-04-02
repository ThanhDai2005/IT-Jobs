import { useEffect, useState } from "react";
import { getListCompany } from "../../services/companyService";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

function Company() {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListCompany();
      setCompany(response);
    };
    fetchAPI();
  }, []);

  return (
    <>
      {company && (
        <>
          <h2>Danh sách công ty</h2>

          <div className="mb-20">
            <Row gutter={[20, 20]}>
              {company.map((item) => (
                <Col xl={8} lg={8}>
                  <Link to={`/company/${item.id}`}>
                    <Card>
                      <div className="mb-10">
                        Công ty: <strong>{item.companyName}</strong>
                      </div>
                      <div className="mb-10">
                        Số điện thoại: <strong>{item.companyName}</strong>
                      </div>
                      <div className="mb-10">
                        Số nhân sự: <strong>{item.quantityPeople}</strong>
                      </div>
                      <div className="mb-10">
                        website: <strong>{item.website}</strong>
                      </div>
                      <div className="mb-10">
                        Địa chỉ: <strong>{item.address}</strong>
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

export default Company;
