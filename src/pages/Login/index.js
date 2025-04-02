import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { getListCompany } from "../../services/companyService";
import { setCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

function Login() {
  const rules = [{ required: true, message: "Hãy nhập đầy đủ thông tin!" }];
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const [accountCompany, setAccountCompany] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListCompany();
      setAccountCompany(response);
    };
    fetchAPI();
  }, []);

  const handleFinish = (values) => {
    const login = accountCompany.find(
      (item) => item.email == values.email && item.password == values.password
    );
    if (login) {
      setCookie("id", login.id, 1);
      setCookie("companyName", login.companyName, 1);
      setCookie("email", login.email, 1);
      setCookie("token", login.token, 1);
      dispatch(checkLogin(true));
      navigate("/");
    } else {
      messageApi.error("Tài khoản hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <>
      {contextHolder}

      <Row justify="center">
        <Col xl={12} lg={12}>
          <Card title="Đăng nhập">
            <Form layout="vertical" onFinish={handleFinish}>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={rules}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;
