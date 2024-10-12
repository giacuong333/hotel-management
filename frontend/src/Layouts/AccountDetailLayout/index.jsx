import { Outlet } from 'react-router';
import Header from '../../components/Customer/AccountDetail/Header';
import Footer from '../../components/Customer/Footer';
import Sidebar from '../../components/Customer/AccountDetail/Sidebar';

const AccountDetailLayout = () => {
    return (
        <div className="primary-bg-color w-full h-full">
            <div className="container mx-auto px-lg-0 px-4">
                <div className="row">
                    <Header />
                </div>
                <div className="row py-5">
                    <div className="col-lg-3 col-md-4">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-8">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="row">
                <Footer />
            </div>
        </div>
    );
};

export default AccountDetailLayout;
