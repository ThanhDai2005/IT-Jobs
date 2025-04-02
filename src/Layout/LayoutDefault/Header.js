import { Button } from "antd";
import { Link } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function Header() {
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducers);

  console.log(isLogin);

  return (
    <>
      <header className="layout-default__header">
        <Link to="/" className="layout-default__logo">
          IT Jobs
        </Link>
        {token ? (
          <>
            <div className="layout-default__account">
              <Link to="/admin">
                <Button>
                  <UserOutlined /> Quản lý
                </Button>
              </Link>
              <Link to="/logout">
                <Button>
                  <LogoutOutlined />
                  Đăng xuất
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="layout-default__account">
              <Link to="/login">
                <Button>Đăng nhập</Button>
              </Link>
              <Link to="/register">
                <Button type="primary">Đăng ký</Button>
              </Link>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default Header;
