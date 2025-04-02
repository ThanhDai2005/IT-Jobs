import { useEffect, useState } from "react";
import { getListCompany } from "../../services/companyService";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";

function CompanyList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListCompany();
      setData(response);
    };
    fetchAPI();
  }, []);

  return (
    <>
      <h2>Danh sách một số công ty</h2>
      <Row gutter={[20, 20]}>
        {data.map((item) => (
          <Col xl={8} lg={8}>
            <Link to={`/company/${item.id}`}>
              <Card>
                <div className="mb-10">
                  Công ty: <strong>{item.companyName}</strong>
                </div>
                <div className="mb-10">
                  Số nhân sự: <strong>{item.quantityPeople}</strong>
                </div>
                <div className="mb-10">
                  Địa chỉ: <strong>{item.address}</strong>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Link to="/company">
        <Button className="mt-20">Xem thêm</Button>
      </Link>
    </>
  );
}

export default CompanyList;
