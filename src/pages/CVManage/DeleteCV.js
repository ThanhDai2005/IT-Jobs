import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCV } from "../../services/cvService";

function DeleteCV(props) {
  const { record, onReload } = props;

  const handleDelete = async () => {
    const response = await deleteCV(record.id);
    if (response) {
      onReload();
    }
  };

  return (
    <>
      <div>
        <Tooltip title="Xóa bản ghi">
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

export default DeleteCV;
