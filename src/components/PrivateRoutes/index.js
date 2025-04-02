import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function PrivateRoutes() {
  const isLogin = getCookie("token");

  return <>{isLogin ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default PrivateRoutes;
