import React from 'react';
import { Link } from 'react-router-dom';
import { items } from './itemList';
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

    return (
        <aside className="sidebar">
            <h2 className="text-white ps-3">LuxStay</h2>
            <ul className="py-5">
                {items
                    .filter((item) => permissions[item.permissionKey] === 1)
                    .map((item) => {
                        return (
                            <li key={item.id} className="cursor-pointer">
                                <Link
                                    className="text-white w-full h-full px-4 py-3 d-flex align-items-center gap-2"
                                    to={item?.path}
                                >
                                    <item.Icon size={24} className="text-white" />
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
