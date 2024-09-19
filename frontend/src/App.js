import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import CustomerLayout from "./Layouts/CustomerLayout";
import AdminLayout from "./Layouts/AdminLayout";

import CustomerHome from "./components/Customer/Home";
import Bus from "./components/Customer/Bus";
import Cart from "./components/Customer/Cart";
import AdminHome from "./components/Admin/Home";
import User from "./components/Admin/User";

import SignUp from "./components/Authentication/SignUp";

function App() {
      return (
            <>
                  <BrowserRouter>
                        <Routes>
                              {/* Authentication */}
                              <Route path="/signup" element={<SignUp />} />
                              {/* Customer */}
                              <Route path="/" element={<CustomerLayout />}>
                                    <Route index element={<CustomerHome />} />
                                    <Route path="bus" element={<Bus />} />
                                    <Route path="cart" element={<Cart />} />
                              </Route>
                              {/* Admin */}
                              <Route path="/admin/" element={<AdminLayout />}>
                                    <Route index element={<AdminHome />} />
                                    <Route path="user" element={<User />} />
                              </Route>
                        </Routes>
                  </BrowserRouter>
            </>
      );
}

export default App;
