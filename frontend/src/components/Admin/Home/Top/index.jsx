import React from 'react';
import itemList from './itemList';
import { useNavigate } from 'react-router';

const Top = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="d-flex flex-wrap align-items-center w-full gap-4">
                {itemList.map((item) => {
                    return (
                        <div key={item.id} className="shadow-sm pb-0 flex-grow-1 bg-white">
                            <div className="d-flex align-items-center p-3 gap-3">
                                <item.Icon size={40} className="p-2 secondary-bg-color text-white" />
                                <span className="">
                                    <p className="text-black-50">{item.title}</p>
                                    <p className="fs-3 fw-semibold">{item.quantity}</p>
                                </span>
                            </div>
                            <div className="mt-3 text-center">
                                <button
                                    className="p-2 rounded-top-circle text-uppercase secondary-bg-color w-full text-white view-details-hover animation-effect"
                                    onClick={() => navigate(item.path)}
                                >
                                    View details
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Top;
