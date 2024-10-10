import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside>
            <div className="">
                <div className="d-flex flex-column gap-1 mb-5">
                    <div className="" style={{ width: '80px', height: '80px' }}>
                        <img
                            src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-2.jpg"
                            alt=""
                            className="w-full h-full rounded-circle border"
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                        />
                    </div>
                    <p className="fw-semibold fs-5">Gia Cường</p>
                    <small className="text-black-50">legiacuong@gmail.com</small>
                </div>
                <ul className="d-flex flex-column gap-4">
                    <li className="fw-semibold cursor-pointer">
                        <Link to="/account/personal" className="secondary-color">
                            Personal information
                        </Link>
                    </li>
                    <li className="fw-semibold cursor-pointer">
                        <Link to="/account/payments">Payments</Link>
                    </li>
                    <li className="fw-semibold cursor-pointer">
                        <Link to="/account/bookinghistory">Booking History</Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
