import { PiSquaresFour } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa6';
import { IoTicketOutline } from 'react-icons/io5';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { VscFeedback } from 'react-icons/vsc';
import { MdOutlineRateReview } from 'react-icons/md';
import { IoReceiptOutline } from 'react-icons/io5';
import { FaBuffer } from 'react-icons/fa6';
import { GrBusinessService } from 'react-icons/gr';
import { FaChartBar } from 'react-icons/fa';

export const items = [
    {
        id: 1,
        Icon: PiSquaresFour,
        title: 'Dashboard',
        path: '/admin',
        permissionKey: 'readDashboard',
    },
    {
        id: 2,
        Icon: FaRegUser,
        title: 'User',
        path: '/admin/user',
        permissionKey: 'readUser',
    },
    {
        id: 3,
        Icon: IoTicketOutline,
        title: 'Booking',
        path: '/admin/booking',
        permissionKey: 'readBooking',
    },
    {
        id: 4,
        Icon: MdOutlineMeetingRoom,
        title: 'Room',
        path: '/admin/room',
        permissionKey: 'readRoom',
    },
    {
        id: 5,
        Icon: RiDiscountPercentLine,
        title: 'Discount',
        path: '/admin/discount',
        permissionKey: 'readDiscount',
    },
    {
        id: 6,
        Icon: VscFeedback,
        title: 'Feedback',
        path: '/admin/feedback',
        permissionKey: 'readFeedBack',
    },
    {
        id: 7,
        Icon: MdOutlineRateReview,
        title: 'Review',
        path: '/admin/review',
        permissionKey: 'readReview',
    },
    {
        id: 8,
        Icon: IoReceiptOutline,
        title: 'Receipt',
        path: '/admin/receipt',
        permissionKey: 'readReceipt',
    },
    {
        id: 9,
        Icon: FaBuffer,
        title: 'Role',
        path: '/admin/role',
        permissionKey: 'readRole',
    },
    {
        id: 10,
        Icon: GrBusinessService,
        title: 'Service',
        path: '/admin/service',
        permissionKey: 'readService',
    },
    {
        id: 11,
        Icon: FaChartBar,
        title: 'Statistic',
        path: '/admin/statistic',
        permissionKey: 'readStatistic',
    },
];
