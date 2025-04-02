import { useEffect, useState } from "react";
import { getCVCompany } from "../../services/cvService";
import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";

function CVStatistic() {
  const id = getCookie("id");
  const [cv, setCV] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getCVCompany(id);
      setCV(response);
    };
    fetchAPI();
  }, []);

  let cntCV = 0;

  for (let i = 0; i < cv.length; i++) {
    if (cv[i].statusRead == true) {
      cntCV++;
    }
  }

  return (
    <>
      <Card title="CV">
        <div className="mb-5">
          Số lượng CV: <strong>{cv.length}</strong>
        </div>
        <div className="mb-5">
          CV đã đọc: <strong>{cntCV}</strong>
        </div>
        <div className="mb-5">
          CV chưa đọc: <strong>{cv.length - cntCV}</strong>
        </div>
      </Card>
    </>
  );
}

export default CVStatistic;
