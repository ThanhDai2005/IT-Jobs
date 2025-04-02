import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetail } from "../../services/jobService";
import { getDetailCompany } from "../../services/companyService";
import {
  Button,
  Card,
  Row,
  Tag,
  Col,
  Input,
  Form,
  Select,
  notification,
} from "antd";
import GoBack from "../../components/GoBack";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { createCV } from "../../services/cvService";
import { useForm } from "antd/es/form/Form";
const { TextArea } = Input;
const { Option } = Select;

function JobDetail() {
  const params = useParams();
  const [job, setJob] = useState([]);
  const rules = [{ required: true, message: "Hãy điền đầy đủ thông tin" }];
  const [form] = useForm();
  const [noti, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getJobDetail(params.id);
      const detailCompany = await getDetailCompany(response.idCompany);
      const resultFinal = {
        detailCompany: detailCompany,
        ...response,
      };
      setJob(resultFinal);
    };
    fetchAPI();
  }, []);

  console.log(job);

  const handleSubmit = async (values) => {
    values.idJob = job.id;
    values.idCompany = job.detailCompany.id;
    values.createAt = getTimeCurrent();

    const response = await createCV(values);
    if (response) {
      form.resetFields();
      noti.success({
        message: "Gửi yêu cầu thành công!",
        description:
          "Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất",
      });
    } else {
      noti.error({
        message: "Gửi yêu cầu không thành công",
        description: "Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu",
      });
    }
  };

  return (
    <>
      {contextHolder}

      <GoBack />

      <h2>{job.name}</h2>
      <Button type="primary" href="#formApply" size="large" className="mb-20">
        ỨNG TUYỂN NGAY
      </Button>

      <div className="mb-20">
        <span>Tags: </span>
        {(job.tags || []).map((item) => (
          <Tag color="blue">{item}</Tag>
        ))}
      </div>

      <div className="mb-20">
        <span>Thành phố: </span>
        {(job.city || []).map((item) => (
          <Tag color="orange">{item}</Tag>
        ))}
      </div>

      <div className="mb-20">
        Mức lương: <strong>{job.salary}$</strong>
      </div>

      <div className="mb-20">
        Địa chỉ công ty: <strong>{job?.detailCompany?.address}</strong>
      </div>

      <div className="mb-20">
        Thời gian đăng bài: <strong>{job.createAt}</strong>
      </div>

      <div className="mb-20">
        <div className="mb-10">Mô tả công việc:</div>
        <div>{job.description}</div>
      </div>

      <div className="mb-20">
        <div className="mb-10">Giới thiệu công ty:</div>
        <div>{job?.detailCompany?.description}</div>
      </div>

      <Card title="Ứng tuyển ngay" id="formApply">
        <Form
          form={form}
          name="form_apply"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={[20, 20]}>
            <Col xl={6} lg={6}>
              <Form.Item label="Họ tên" name="name" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6}>
              <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6}>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6}>
              <Form.Item label="Thành phố" name="city" rules={rules}>
                <Select placeholder="Chọn thành phố">
                  {(job.city || []).map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xl={24} lg={24}>
              <Form.Item
                label="Giới thiệu bản thân"
                name="description"
                rules={rules}
              >
                <TextArea rows={6} />
              </Form.Item>
            </Col>
            <Col xl={24} lg={24}>
              <Form.Item
                label="Danh sách link project đã làm"
                name="linkProject"
                rules={rules}
              >
                <TextArea rows={6} />
              </Form.Item>
            </Col>
            <Col xl={24} lg={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Gửi yêu cầu
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}

export default JobDetail;
