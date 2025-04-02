import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { getListCity } from "../../services/cityService";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [city, setCity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListCity();
      if (response) {
        const objAll = {
          key: 0,
          value: "All",
        };
        setCity([objAll, ...response]);
      }
    };
    fetchAPI();
  }, []);

  const handleSubmit = (values) => {
    let city = values.city || "";
    city = values.city == "All" ? "" : city;
    const keyword = values.keyword || "";
    navigate(`/search?city=${city}&keyword=${keyword}`);
  };

  return (
    <>
      <h2>1000+ IT Jobs For Developers</h2>
      <Form onFinish={handleSubmit}>
        <Row gutter={[12, 12]}>
          <Col xl={6} lg={6}>
            <Form.Item name="city">
              <Select placeholder="Chọn thành phố" options={city} />
            </Form.Item>
          </Col>
          <Col xl={15} lg={15}>
            <Form.Item name="keyword">
              <Input placeholder="Nhập từ khóa..." />
            </Form.Item>
          </Col>
          <Col xl={3} lg={3}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default SearchForm;
