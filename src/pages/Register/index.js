import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { generateToken } from "../../helpers/generateToken";
import { useEffect, useState } from "react";
import { createCompany, getListCompany } from "../../services/companyService";
import { useNavigate } from "react-router-dom";

function Register() {
  const rules = [{ required: true, message: "Hãy nhập đầy đủ thông tin" }];
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListCompany();
      setCompany(response);
    };
    fetchAPI();
  }, []);

  const handleFinish = async (values) => {
    values.token = generateToken();

    const checkEmail = company.find((item) => item.email == values.email);

    const checkPhone = company.find((item) => item.phone == values.phone);

    if (checkEmail) {
      messageApi.error("Email đã tồn tại!");
    } else if (checkPhone) {
      messageApi.error("Số điện thoại đã tồn tại!");
    } else {
      const result = await createCompany(values);
      if (result) {
        navigate("/login");
      }
    }
  };

  return (
    <>
      {contextHolder}

      <Row justify="center">
        <Col xl={12} lg={12}>
          <Form onFinish={handleFinish} layout="vertical">
            <Card title="Đăng ký tài khoản">
              <Form.Item label="Tên công ty" name="name" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={rules}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Register;
