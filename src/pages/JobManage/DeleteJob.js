import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteJob } from "../../services/jobService";

function DeleteJob(props) {
  const { record, onReload } = props;

  const handleDelete = async () => {
    const response = await deleteJob(record.id);
    if (response) {
      onReload();
    }
  };

  return (
    <>
      <div>
        <Tooltip placement="top" title="Xóa bản ghi">
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={handleDelete}>
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Tooltip>
      </div>
    </>
  );
}

export default DeleteJob;
