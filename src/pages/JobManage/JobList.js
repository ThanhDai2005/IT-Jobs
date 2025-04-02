import { Button, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getJobCompany } from "../../services/jobService";
import { getCookie } from "../../helpers/cookie";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";

function JobList() {
  const [job, setJob] = useState();
  const id = getCookie("id");

  const fetchAPI = async () => {
    const response = await getJobCompany(id);
    setJob(response.reverse());
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleReload = () => {
    fetchAPI();
  };

  const columns = [
    {
      title: "Tên job",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (_, record) => (
        <>
          {record.tags.map((item, index) => (
            <Tag className="mb-5" color="blue" key={index}>
              {item}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Mức lương ($)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      render: (_, record) => (
        <>
          <div>Ngày tạo: {record.createAt}</div>
          <div>Cập nhật: {record.updateAt}</div>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {record.status ? (
            <Tag color="green">Đang bật</Tag>
          ) : (
            <Tag color="red">Đang tắt</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <div>
            <Tooltip placement="top" title="Xem chi tiết">
              <Link to={`/detail-job/${record.id}`}>
                <Button size="small">
                  <EyeOutlined />
                </Button>
              </Link>
            </Tooltip>
          </div>

          <EditJob record={record} onReload={handleReload} />

          <DeleteJob record={record} onReload={handleReload} />
        </>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={job} columns={columns} rowKey="id" />
    </>
  );
}

export default JobList;
