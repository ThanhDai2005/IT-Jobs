import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { editCompany, getDetailCompany } from "../../services/companyService";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  message,
} from "antd";
const { TextArea } = Input;

function InfoCompany() {
  const id = getCookie("id");
  const [info, setInfo] = useState();
  const [edit, setEdit] = useState(false);
  const rules = [
    { required: true, message: "Hãy điều chỉnh đầy đủ thông tin" },
  ];
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchAPI = async () => {
    const response = await getDetailCompany(id);
    setInfo(response);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    const response = await editCompany(id, values);
    console.log(response);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Cập nhật thành công!",
      });
      fetchAPI();
      setEdit(false);
    }
  };

  return (
    <>
      {contextHolder}

      {info && (
        <Card
          title="Thông tin công ty"
          extra={
            edit ? (
              <Button onClick={handleCancel}>Hủy</Button>
            ) : (
              <Button onClick={handleEdit}>Chỉnh sửa</Button>
            )
          }
        >
          <Form
            layout="vertical"
            initialValues={info}
            form={form}
            disabled={!edit}
            onFinish={handleFinish}
          >
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Email" name="email" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Địa chỉ" name="address" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Số lượng nhân sự"
                  name="quantityPeople"
                  rules={rules}
                >
                  <InputNumber className="w-100" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Thời gian làm việc"
                  name="workingTime"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Link website" name="website" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả ngắn" name="description" rules={rules}>
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả chi tiết" name="detail" rules={rules}>
                  <TextArea rows={8} />
                </Form.Item>
              </Col>
              {edit && (
                <Col span={24}>
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                  <Button className="ml-10" onClick={handleCancel}>
                    Hủy
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </Card>
      )}
    </>
  );
}

export default InfoCompany;
