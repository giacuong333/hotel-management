import { Outlet } from "react-router";
import Header from "../../components/Customer/Header";
import Footer from "../../components/Customer/Footer";

const CustomerLayout = () => {
      return (
            <>
                  <Header />
                  <Outlet />
                  <Footer />
            </>
      );
};

export default CustomerLayout;
