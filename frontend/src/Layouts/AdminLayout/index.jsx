import { Outlet } from 'react-router';
import Siderbar from '../../components/Admin/Siderbar';
// import Header from "../../components/Admin/Header";
import Header from '~/components/Admin/Header';
import { useState } from 'react';

const AdminLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="row admin-bg-color">
            {/* Adjust column size based on sidebar state */}
            <div
                className={`animation-effect ${
                    showSidebar ? 'col-lg-2 col-md-3 col-4' : 'col-lg-1 col-md-2 col-3'
                } pe-0`}
            >
                <Siderbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            </div>
            {/* Adjust the content column size */}
            <div
                className={`animation-effect ${showSidebar ? 'col-lg-10 col-md-9 col-8' : 'col-lg-11 col-md-10 col-9'}`}
            >
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
