import { Button, Col, Form, Input, Row, Select, Switch, message } from "antd";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import { getListTags } from "../../services/tagService";
import { getListCity } from "../../services/cityService";
import { getCookie } from "../../helpers/cookie";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { createJob } from "../../services/jobService";
const { TextArea } = Input;

function CreateJob() {
  const [form] = Form.useForm();
  const rules = [{ required: true, message: "Hãy nhập đầy đủ thông tin!" }];

  const idCompany = getCookie("id");
  const [tag, setTag] = useState([]);
  const [city, setCity] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListTags();
      setTag(response);
    };
    fetchAPI();
  });

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListCity();
      setCity(response);
    };
    fetchAPI();
  });

  const handleFinish = async (values) => {
    values.idCompany = idCompany;
    values.createAt = getTimeCurrent();
    const response = await createJob(values);
    if (response) {
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Tạo job mới thành công",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Tạo job mới không thành công",
      });
    }
  };

  return (
    <>
      <GoBack />

      {contextHolder}

      <h2>Tạo job mới</h2>
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Form.Item name="name" label="Tên job" rules={rules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tags" label="Tags" rules={rules}>
              <Select mode="multiple" options={tag} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="salary" label="Mức lương" rules={rules}>
              <Input addonAfter="$" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="city" label="Thành phố" rules={rules}>
              <Select mode="multiple" options={city} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="description" label="Mô tả">
              <TextArea rows={16} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="status" label="Trạng thái" rules={rules}>
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CreateJob;
