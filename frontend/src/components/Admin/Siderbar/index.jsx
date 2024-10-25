import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { items } from './itemList';
import { IoIosArrowBack } from 'react-icons/io';
import { useCheckPermission } from '../../../providers/CheckPermissionProvider';

const Siderbar = ({ showSidebar, setShowSidebar }) => {
    const {
        readDashboard,
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

    const permissions = {
        readDashboard,
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

    return (
        <aside className={`sidebar shadow position-relative ${showSidebar ? 'expanded' : 'collapsed'}`}>
            {/* Hide/Show Sidebar */}
            <IoIosArrowBack
                size={26}
                className={`bg-white rounded-circle p-1 cursor-pointer shadow-sm animation-effect ${
                    showSidebar ? 'rotate180' : ''
                }`}
                style={{ position: 'absolute', top: '20px', right: 0, transform: 'translateX(50%)' }}
                onClick={() => setShowSidebar(!showSidebar)}
            />
            <h2
                className={`animation-effect mx-3 px-2 py-3 ${
                    showSidebar
                        ? 'text-white border-bottom border-light-subtle'
                        : 'bg-white text-black p-3 text-center mx-auto'
                }`}
            >
                {showSidebar ? 'LuxStay' : 'Lux'}
            </h2>
            <ul className="">
                {items
                    .filter((item) => permissions[item.permissionKey] === 1)
                    .map((item) => (
                        <li
                            key={item.id}
                            className={`cursor-pointer ${showSidebar ? 'm-3' : 'mx-4 my-3'} rounded-2 ${
                                selectedItemId === item.id ? 'selectedItem' : ''
                            }`}
                            onClick={() => setSelectedItemId(item.id)}
                        >
                            <Link className="text-white p-2 d-flex align-items-center gap-2" to={item?.path}>
                                <item.Icon
                                    size={showSidebar ? 20 : 22}
                                    className={`animation-effect text-white text-center ${
                                        showSidebar ? '' : 'mx-auto'
                                    }`}
                                />
                                {showSidebar ? <p>{item.title}</p> : null}
                            </Link>
                        </li>
                    ))}
            </ul>
        </aside>
    );
};

export default Siderbar;
