import React from 'react';

import { PiSquaresFour } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa6';
import { IoTicketOutline } from 'react-icons/io5';
import { LuContact2 } from 'react-icons/lu';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { VscFeedback } from 'react-icons/vsc';
import { MdOutlineRateReview } from 'react-icons/md';
import { LuGalleryVertical } from 'react-icons/lu';
import { IoReceiptOutline } from 'react-icons/io5';
import { TbUsersGroup } from 'react-icons/tb';
import { FaBuffer } from 'react-icons/fa6';
import { GrBusinessService } from 'react-icons/gr';
import { FcStatistics } from 'react-icons/fc';
import { FaChartBar } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const Siderbar = () => {
    return (
        <aside className="sidebar">
            <h2 className="text-white ps-3">LuxStay</h2>
            <ul className="py-5">
                <li className="cursor-pointer">
                    <Link className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2" to="/admin">
                        <PiSquaresFour size={24} className="text-white" />
                        <p>Dashboard</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/user"
                    >
                        <FaRegUser size={24} className="text-white" />
                        <p>User</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/booking"
                    >
                        <IoTicketOutline size={24} className="text-white" />
                        <p>Booking</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/room"
                    >
                        <MdOutlineMeetingRoom size={24} className="text-white" />
                        <p>Room</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/discount"
                    >
                        <RiDiscountPercentLine size={24} className="text-white" />
                        <p>Discount</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/feedback"
                    >
                        <VscFeedback size={24} className="text-white" />
                        <p>Feedback</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/review"
                    >
                        <MdOutlineRateReview size={24} className="text-white" />
                        <p>Review</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/receipt"
                    >
                        <IoReceiptOutline size={24} className="text-white" />
                        <p>Receipt</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/permission"
                    >
                        <TbUsersGroup size={24} className="text-white" />
                        <p>Permission</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/role"
                    >
                        <FaBuffer size={24} className="text-white" />
                        <p>Role</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/service"
                    >
                        <GrBusinessService size={24} className="text-white" />
                        <p>Service</p>
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link
                        className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                        to="/admin/statistic"
                    >
                        <FaChartBar size={24} className="text-white" />
                        <p>Statistic</p>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Siderbar;
