import React from 'react';
import itemList from './itemList';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Top = () => {
    const navigate = useNavigate();
    const [availablesQuanlity, setAvailablesQuanlity] = useState(0);

    const [checkouts, setCheckouts] = useState(0);
    const [cancellations, setCancellations] = useState(0);
    const [pending, setPendings] = useState(0);

    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const response = await axios.get(url, { headers: { 'Content-Type': 'application/json' } });
                if (response.status === 200) {
                    setter(response.data.$values ? response.data.$values.length : 0);
                }
            } catch (error) {
                console.log('Error fetching:', error);
            }
        };

        fetchData('http://localhost:5058/dashboard/availablerooms', setAvailablesQuanlity);
        fetchData('http://localhost:5058/dashboard/TodayCheckouts', setCheckouts);
        fetchData('http://localhost:5058/dashboard/cancellations', setCancellations);
        fetchData('http://localhost:5058/dashboard/PendingPayments', setPendings);
    }, []);

    const updatedItemList = [
        { ...itemList[0], quantity: availablesQuanlity },
        { ...itemList[1], quantity: checkouts },
        { ...itemList[2], quantity: cancellations },
        // { ...itemList[3], quantity: pending },
    ];
    return (
        <div>
            <div className="d-flex flex-wrap align-items-center w-full gap-4">
                {updatedItemList.map((item) => {
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
