import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getDetailCompany } from "../../services/companyService";
import { Card } from "antd";

function InfoCompany() {
  const id = getCookie("id");

  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getDetailCompany(id);
      setCompany(response);
    };
    fetchAPI();
  }, []);

  return (
    <>
      <Card title="Thông tin công ty">
        <div className="mb-5">
          Tên công ty: <strong>{company.companyName}</strong>
        </div>
        <div className="mb-5">
          Email: <strong>{company.email}</strong>
        </div>
        <div className="mb-5">
          Số điện thoại: <strong>{company.phone}</strong>
        </div>
        <div className="mb-5">
          Số nhân viên: <strong>{company.quantityPeople}</strong>
        </div>
      </Card>
    </>
  );
}

export default InfoCompany;
