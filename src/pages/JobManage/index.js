import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import JobList from "./JobList";

function JobManage() {
  return (
    <>
      <h2>Danh sách việc làm</h2>

      <Link to="/create-job">
        <Button>
          <PlusOutlined /> Tạo việc mới
        </Button>
      </Link>
      <div className="mt-20">
        <JobList />
      </div>
    </>
  );
}

export default JobManage;
