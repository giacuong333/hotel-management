import { Outlet } from "react-router";
import Siderbar from "../../components/Admin/Siderbar";
import Header from "../../components/Admin/Header";

const AdminLayout = () => {
      return (
            <div className="row admin-bg-color">
                  <div className="col-2 pe-0">
                        <Siderbar />
                  </div>
                  <div className="col-10">
                        <div className="row">
                              <Header />
                        </div>
                        <div className="row bg-white shadow w-full admin-outlet mt-3 ms-1">
                              <Outlet />
                        </div>
                  </div>
            </div>
      );
};

export default AdminLayout;
