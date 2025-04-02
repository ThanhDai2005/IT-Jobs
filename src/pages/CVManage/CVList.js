import { Button, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getCVCompany } from "../../services/cvService";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import CVJobName from "./CvJobName";
import DeleteCV from "./DeleteCV";
import { Link } from "react-router-dom";

function CVList() {
  const id = getCookie("id");

  const [listCV, setListCV] = useState([]);

  const fetchAPI = async () => {
    const response = await getCVCompany(id);
    setListCV(response.reverse());
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
      dataIndex: "idJob",
      key: "idJob",
      render: (_, record) => <CVJobName record={record} />,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {record.statusRead ? (
            <Tag color="green">Đã đọc</Tag>
          ) : (
            <Tag color="gray">Chưa đọc</Tag>
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
            <Link to={`/detail-cv/${record.id}`}>
              <Tooltip title="Xem chi tiết">
                <Button size="small">
                  <EyeOutlined />
                </Button>
              </Tooltip>
            </Link>
          </div>
          <DeleteCV record={record} onReload={handleReload} />
        </>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={listCV} columns={columns} rowKey="id" />;
    </>
  );
}

export default CVList;
