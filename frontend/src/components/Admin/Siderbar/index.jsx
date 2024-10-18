import React from 'react';
import { PiSquaresFour } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa6';
import { IoTicketOutline } from 'react-icons/io5';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { VscFeedback } from 'react-icons/vsc';
import { MdOutlineRateReview } from 'react-icons/md';
import { IoReceiptOutline } from 'react-icons/io5';
import { TbUsersGroup } from 'react-icons/tb';
import { FaBuffer } from 'react-icons/fa6';
import { GrBusinessService } from 'react-icons/gr';
import { FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useCheckPermission } from '../../../providers/CheckPermissionProvider';

const Siderbar = () => {
    const {
        readUser,
        createUser,
        updateUser,
        deleteUser,
        readRoom,
        createRoom,
        updateRoom,
        deleteRoom,
        readBooking,
        createBooking,
        updateBooking,
        deleteBooking,
        readDiscount,
        createDiscount,
        updateDiscount,
        deleteDiscount,
        readFeedBack,
        createFeedBack,
        updateFeedBack,
        deleteFeedBack,
        readGallery,
        createGallery,
        updateGallery,
        deleteGallery,
        readReceipt,
        createReceipt,
        updateReceipt,
        deleteReceipt,
        readReview,
        createReview,
        updateReview,
        deleteReview,
        readService,
        createService,
        updateService,
        deleteService,
        readAdditionalFee,
        createAdditionalFee,
        updateAdditionalFee,
        deleteAdditionalFee,
        readRole,
        createRole,
        updateRole,
        deleteRole,
        readStatistic,
        assigningPermissions,
        roleAssignment,
    } = useCheckPermission();

    console.log('Read:  ' + readUser);

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

                {readUser === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/user"
                        >
                            <FaRegUser size={24} className="text-white" />
                            <p>User</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}

                {readBooking === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/booking"
                        >
                            <IoTicketOutline size={24} className="text-white" />
                            <p>Booking</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}

                {readRoom === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/room"
                        >
                            <MdOutlineMeetingRoom size={24} className="text-white" />
                            <p>Room</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
                {readDiscount === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/discount"
                        >
                            <RiDiscountPercentLine size={24} className="text-white" />
                            <p>Discount</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
                {readFeedBack === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/feedback"
                        >
                            <VscFeedback size={24} className="text-white" />
                            <p>Feedback</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}

                {readReview === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/review"
                        >
                            <MdOutlineRateReview size={24} className="text-white" />
                            <p>Review</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
                {readReceipt === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/receipt"
                        >
                            <IoReceiptOutline size={24} className="text-white" />
                            <p>Receipt</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
                {roleAssignment === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/permission"
                        >
                            <TbUsersGroup size={24} className="text-white" />
                            <p>Permission</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
                {readRole === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/role"
                        >
                            <FaBuffer size={24} className="text-white" />
                            <p>Role</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
                {readService === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/service"
                        >
                            <GrBusinessService size={24} className="text-white" />
                            <p>Service</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
                {readStatistic === 1 ? (
                    <li className="cursor-pointer">
                        <Link
                            className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                            to="/admin/statistic"
                        >
                            <FaChartBar size={24} className="text-white" />
                            <p>Statistic</p>
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
            </ul>
        </aside>
    );
};

export default Siderbar;
