import { Button, Layout } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import "./LayoutAdmin.scss";
import { useState } from "react";
import MenuSider from "../../components/MenuSider";
const { Header, Sider, Content } = Layout;

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout className="layout-admin">
        <Header className="layout-admin__header">
          <div
            className={
              "layout-admin__logo" +
              (collapsed ? " layout-admin__logo-collapsed" : "")
            }
          >
            {collapsed ? "IT A" : "IT Admin"}
          </div>
          <div className="layout-admin__nav">
            <div className="layout-admin__nav-left">
              <div
                className="layout-admin__collapse"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            </div>
            <div className="layout-admin__nav-right">
              <Link to="/">
                <Button>
                  <HomeOutlined /> Trang chủ
                </Button>
              </Link>
              <Link to="/logout">
                <Button>
                  <LogoutOutlined /> Đăng xuất
                </Button>
              </Link>
            </div>
          </div>
        </Header>

        <Layout>
          <Sider
            className="layout-admin__sider"
            collapsed={collapsed}
            theme="light"
          >
            <MenuSider />
          </Sider>

          <Content className="layout-admin__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutAdmin;
