import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
  Switch,
  Tooltip,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getListTags } from "../../services/tagService";
import { getListCity } from "../../services/cityService";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { updateJob } from "../../services/jobService";
const { TextArea } = Input;

function EditJob(props) {
  const { record, onReload } = props;
  const [form] = Form.useForm();
  const rules = [{ required: true, message: "Hãy nhập đầy đủ thông tin!" }];
  const [messageApi, contextHolder] = message.useMessage();

  const [tag, setTag] = useState([]);

  const [city, setCity] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListTags();
      setTag(response);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListCity();
      setCity(response);
    };
    fetchAPI();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    values.updateAt = getTimeCurrent();
    const response = await updateJob(record.id, values);
    if (response) {
      setIsModalOpen(false);
      onReload();
      messageApi.open({
        type: "success",
        content: "Cập nhật thành công",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhật không thành công",
      });
    }
  };

  return (
    <>
      {contextHolder}

      <div>
        <Tooltip placement="top" title="Chỉnh sửa">
          <Button onClick={showModal} size="small" type="primary" ghost>
            <EditOutlined />
          </Button>
        </Tooltip>
      </div>

      <Modal
        title="Chỉnh sửa"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <Form
          onFinish={handleFinish}
          layout="vertical"
          initialValues={record}
          form={form}
        >
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item name="name" label="Tên job" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item name="tags" label="Tags" rules={rules}>
                <Select options={tag} mode="multiple" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="salary" label="Mức lương" rules={rules}>
                <Input addonAfter="$" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="city" label="Thành phố" rules={rules}>
                <Select options={city} mode="multiple" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description" label="Mô tả">
                <TextArea rows={16} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="status" label="Trạng thái">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default EditJob;
