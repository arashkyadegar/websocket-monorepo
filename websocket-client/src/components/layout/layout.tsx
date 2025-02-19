import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Layout = () => {
  const auth = useAuth();
  if (auth.token === "") return <Navigate to="/" />;

  return <Outlet />;
};

export default Layout;
