import { Outlet } from "react-router";
import Siderbar from "../../components/Customer/Siderbar";
import Header from "../../components/Admin/Header";

const AdminLayout = () => {
      return (
            <>
                  <Siderbar />
                  <Header />
                  <Outlet />
            </>
      );
};

export default AdminLayout;
