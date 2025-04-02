import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function GoBack() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <>
      <Button onClick={handleReturn}>Trở lại</Button>
    </>
  );
}

export default GoBack;
