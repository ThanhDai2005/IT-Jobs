import { Card, Col, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import { getListCompany } from "../../services/companyService";
import { Link } from "react-router-dom";

function SearchList(props) {
  const { data } = props;

  const [dataFinal, setDataFinal] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const company = await getListCompany();
      const result = [];

      for (let i = 0; i < data.length; i++) {
        result.push({
          ...company.find((item) => item.id == data[i].idCompany),
          ...data[i],
        });
      }

      setDataFinal(result);
    };
    fetchAPI();
  }, [data]);

  return (
    <>
      {dataFinal.length > 0 ? (
        <div className="mt-20">
          <Row gutter={[20, 20]}>
            {dataFinal.map((item) => (
              <Col xl={8} lg={8} key={item.id}>
                <Card title={<Link to={`/job/${item.id}`}>{item.name}</Link>}>
                  <div className="mb-10">
                    <span>Ngôn ngữ: </span>
                    {item.tags.map((tag, index) => (
                      <Tag className="mb-5" color="blue" key={index}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <div className="mb-10">
                    <span>Thành phố: </span>
                    {item.city.map((city, index) => (
                      <Tag className="mb-5" color="orange" key={index}>
                        {city}
                      </Tag>
                    ))}
                  </div>
                  <div className="mb-10">
                    Lương: <strong>{item.salary}$</strong>
                  </div>
                  <div className="mb-10">
                    Công ty: <strong>{item.companyName}</strong>
                  </div>
                  <div className="mb-10">
                    Ngày tạo: <strong>{item.createAt}</strong>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <>
          <div className="mt-20">Không tìm thấy công việc nào.</div>
        </>
      )}
    </>
  );
}

export default SearchList;
