import { Outlet } from 'react-router';
import Footer from '../../components/Customer/Footer';
import Sidebar from '../../components/Customer/AccountDetail/Sidebar';
import Header from '~/components/Customer/AccountDetail/Header';

const AccountDetailLayout = () => {
    return (
        <div className="primary-bg-color w-full h-full">
            {/* Header */}
            <div className="row">
                <Header />
            </div>
            <div className="container mx-auto px-lg-0 p-4" style={{ minHeight: '100vh' }}>
                <div className="row py-5">
                    {/* Sidebar */}
                    <div className="col-lg-3 col-md-4">
                        <Sidebar />
                    </div>
                    {/* Main content */}
                    <div className="col-lg-9 col-md-8">
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="row">
                <Footer />
            </div>
        </div>
    );
};

export default AccountDetailLayout;
