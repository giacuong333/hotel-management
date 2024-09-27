import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';

import CustomerLayout from './Layouts/CustomerLayout';
import AdminLayout from './Layouts/AdminLayout';

import CustomerHome from './components/Customer/Home';
import Bus from './components/Customer/Bus';
import Cart from './components/Customer/Cart';
import AdminHome from './components/Admin/Home';
import Booking from './components/Admin/Booking';
import Contact from './components/Admin/Contact';
import Dashboard from './components/Admin/Dashboard';
import Discount from './components/Admin/Discount';
import Feedback from './components/Admin/Feedback';
import Gallery from './components/Admin/Gallery';
import Permission from './components/Admin/Permission';
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

function App() {
    const { user } = useUser();
    const isAuthenticated = user !== null;
    const isCustomer = user?.roleId === 2;

    return (
        <BrowserRouter>
            <Routes>
                {/* If customer logged in, the customer can not access to the log in or register page */}
                {!isAuthenticated && (
                    <>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                    </>
                )}
                {/* If customer logged in with roleId = 2 or default customer does not log in, move on to the customer page. */}
                {(isAuthenticated && isCustomer) || !isAuthenticated ? (
                    // Customer
                    <Route path="/" element={<CustomerLayout />}>
                        <Route index element={<CustomerHome />} />
                        <Route path="/room/:id" element={<RoomDetail />} />
                    </Route>
                ) : (
                    // If roleId != 2, move on to the admin page
                    isAuthenticated &&
                    !isCustomer && (
                        // Admin
                        <Route path="/admin/" element={<AdminLayout />}>
                            <Route index element={<AdminHome />} />
                            <Route path="booking" element={<Booking />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="discount" element={<Discount />} />
                            <Route path="feedback" element={<Feedback />} />
                            <Route path="gallery" element={<Gallery />} />
                            <Route path="permission" element={<Permission />} />
                            <Route path="receipt" element={<Receipt />} />
                            <Route path="review" element={<Review />} />
                            <Route path="role" element={<Role />} />
                            <Route path="room" element={<Room />} />
                            <Route path="service" element={<Service />} />
                            <Route path="statistic" element={<Statistic />} />
                            <Route path="user" element={<User />} />
                        </Route>
                    )
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
