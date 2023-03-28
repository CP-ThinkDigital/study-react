import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const Layout = () => {
  return (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
};

export default Layout;
