import { IoBedOutline } from 'react-icons/io5';
import { LiaLuggageCartSolid } from 'react-icons/lia';
import { IoPricetagsOutline } from 'react-icons/io5';
import { MdOutlinePayments } from 'react-icons/md';

const itemList = [
    {
        id: 1,
        title: 'Available Rooms',
        Icon: IoBedOutline,
        quantity: 35,
        path: '/admin/room',
    },
    {
        id: 2,
        title: 'Today Checkout',
        Icon: LiaLuggageCartSolid,
        quantity: '08',
        path: '/admin/receipt',
    },
    {
        id: 3,
        title: 'Cancellations',
        Icon: IoPricetagsOutline,
        quantity: 12,
        path: '/admin/room',
    },
    {
        id: 4,
        title: 'Pending Payments',
        Icon: MdOutlinePayments,
        quantity: '07',
        path: '/admin/receipt',
    },
];

export default itemList;
