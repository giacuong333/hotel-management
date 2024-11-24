import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import CustomerLayout from './Layouts/CustomerLayout';
import AdminLayout from './Layouts/AdminLayout';

import CustomerHome from './components/Customer/Home';
import AdminHome from './components/Admin/Home';
import Booking from './components/Admin/Booking';
import Dashboard from './components/Admin/Dashboard';
import Discount from './components/Admin/Discount';
import Feedback from './components/Admin/Feedback';
import Receipt from './components/Admin/Receipt';
import Review from './components/Admin/Review';
import Role from './components/Admin/Role';
import Room from './components/Admin/Room';
import Service from './components/Admin/Service';
import Statistic from './components/Admin/Statistic';
import User from './components/Admin/User';
import SignUp from './components/Authentication/SignUp';
import SignIn from './components/Authentication/SignIn';
import { useUser } from './providers/UserProvider';
import RoomDetail from './components/Customer/Home/RoomDetail';
import Rooms from './components/Customer/Rooms';
import RoleProvider from './providers/RoleProvider';
import AccountDetailLayout from './Layouts/AccountDetailLayout';
import AccountDetail from './components/Customer/AccountDetail';
import Payments from './components/Customer/AccountDetail/Payments';
import BookingHistory from './components/Customer/AccountDetail/BookingHistory';
import Password from './components/Customer/AccountDetail/Password';
import RoomProvider from './providers/RoomProvider';
import BookingDetails from './components/Customer/AccountDetail/BookingHistory/Bookings/Booking/BookingDetails';
import Invoice from './components/Customer/AccountDetail/BookingHistory/Bookings/Booking/Invoice';
import ProceedPayment from './components/Customer/Home/ProceedPayment';
import Contacts from './components/Customer/Contact';
function App() {
    const { user } = useUser();
    const isAuthenticated = user !== null;
    const isCustomer = user?.roleId === 4;

    useEffect(() => {
        console.log(isAuthenticated, isCustomer);
    }, []);

    return (
        <Routes>
            {/* If customer logged in, the customer can not access to the log in or register page */}
            {!isAuthenticated && (
                <>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                </>
            )}

            {/* If user logged in, the user can see account information */}
            {isAuthenticated && isCustomer && (
                <Route path="/account/" element={<AccountDetailLayout />}>
                    <Route path="personal" element={<AccountDetail />}></Route>
                    <Route path="payments" element={<Payments />}></Route>
                    <Route path="bookinghistory" element={<BookingHistory />}></Route>
                    <Route path="bookinghistory/invoice/:id" element={<Invoice />}></Route>
                    <Route path="bookinghistory/bookingdetails/:id" element={<BookingDetails />}></Route>
                    <Route path="password" element={<Password />}></Route>
                    
                </Route>
            )}

            {isAuthenticated && isCustomer && (
                <Route path="/account/" element={<AccountDetailLayout />}>
                    <Route path="personal" element={<AccountDetail />}></Route>
                    <Route path="payments" element={<Payments />}></Route>
                    <Route path="bookinghistory" element={<BookingHistory />}></Route>
                    <Route path="bookinghistory/invoice/:id" element={<Invoice />}></Route>
                    <Route path="bookinghistory/bookingdetails/:id" element={<BookingDetails />}></Route>
                    <Route path="password" element={<Password />}></Route>
                </Route>
            )}

            {/* If customer logged in with roleId = 2 or default customer does not log in, move on to the customer page. */}
            {(isAuthenticated && isCustomer) || !isAuthenticated ? (
                // Customer
                <Route path="/" element={<CustomerLayout />}>
                    <Route index element={<CustomerHome />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/room/:id" element={<RoomDetail />} />
                    {isAuthenticated && isCustomer && <Route path="/proceed-payment" element={<Payments />} />}
                <Route path="/contact" element={<Contacts />} />

                </Route>
            ) : (
                // If roleId != 4, move on to the admin page
                isAuthenticated &&
                !isCustomer && (
                    // Admin
                    <Route path="/admin/" element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminHome />} />
                        <Route
                            path="booking"
                            element={
                                <RoomProvider>
                                    <Booking />
                                </RoomProvider>
                            }
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="discount" element={<Discount />} />
                        <Route path="feedback" element={<Feedback />} />
                        <Route path="receipt" element={<Receipt />} />
                        <Route path="review" element={<Review />} />
                        <Route
                            path="role"
                            element={
                                <RoleProvider>
                                    <Role />
                                </RoleProvider>
                            }
                        />
                        <Route path="room" element={<Room />} />
                        <Route path="service" element={<Service />} />
                        <Route path="statistic" element={<Statistic />} />
                        <Route
                            path="user"
                            element={
                                <RoleProvider>
                                    <User />
                                </RoleProvider>
                            }
                        />
                    </Route>
                )
            )}
        </Routes>
    );
}

export default App;
