import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { items } from './itemList';
import { IoIosArrowBack } from 'react-icons/io';
import { useCheckPermission } from '../../../providers/CheckPermissionProvider';

const Siderbar = () => {
    const {
        readUser,
        readRoom,
        readBooking,
        readDiscount,
        readFeedBack,
        readGallery,
        readReceipt,
        readReview,
        readService,
        readAdditionalFee,
        readRole,
        readStatistic,
    } = useCheckPermission();
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const permissions = {
        readUser,
        readRoom,
        readBooking,
        readDiscount,
        readFeedBack,
        readGallery,
        readReceipt,
        readReview,
        readService,
        readAdditionalFee,
        readRole,
        readStatistic,
    };

    console.log('Show sidebar', showSidebar);

    return (
        <aside className="sidebar shadow position-relative">
            {/* Hide/Show Sidebar */}
            <IoIosArrowBack
                size={26}
                className={`bg-white rounded-circle p-1 cursor-pointer shadow-sm animation-effect ${
                    showSidebar ? 'rotate180' : ''
                }`}
                style={{ position: 'absolute', top: '20px', right: 0, transform: 'translateX(50%)' }}
                onClick={() => setShowSidebar(!showSidebar)}
            />
            <h2 className="text-white mx-3 px-2 py-3 border-bottom border-light-subtle">LuxStay</h2>
            <ul className="">
                {items
                    .filter((item) => permissions[item.permissionKey] === 1)
                    .map((item) => {
                        return (
                            <li
                                key={item.id}
                                className={`cursor-pointer m-3 rounded-2 ${
                                    selectedItemId === item.id ? 'selectedItem' : ''
                                }`}
                                onClick={() => setSelectedItemId(item.id)}
                            >
                                <Link className="text-white p-2 d-flex align-items-center gap-2" to={item?.path}>
                                    <item.Icon size={20} className="text-white" />
                                    <p>{item?.title}</p>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </aside>
    );
};

export default Siderbar;
