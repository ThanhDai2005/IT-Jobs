import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  BarsOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function MenuSider() {
  const items = [
    {
      label: <Link to="/admin">Tổng quan</Link>,
      icon: <DashboardOutlined />,
      key: "tongquan",
    },
    {
      label: <Link to="/info-company">Thông tin công ty</Link>,
      icon: <UserOutlined />,
      key: "thongtincongty",
    },
    {
      label: <Link to="/job-manage">Quản lý việc làm</Link>,
      icon: <BarsOutlined />,
      key: "quanlyvieclam",
    },
    {
      label: <Link to="/cv-manage">Quản lý CV</Link>,
      icon: <FileDoneOutlined />,
      key: "quanlicv",
    },
  ];

  return (
    <>
      <Menu mode="inline" items={items} defaultSelectedKeys={["tongquan"]} />
    </>
  );
}

export default MenuSider;
