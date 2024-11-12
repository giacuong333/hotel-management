import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useLocation } from 'react-router';
import axios from 'axios';
import formatCurrency from '~/utils/currencyPipe';
import { formatDate } from '~/utils/formatDate';

const BookingDetail = () => {
    const [booking, setBooking] = useState(null);
    const bookingId = Number(useLocation().pathname.charAt(useLocation().pathname.length - 1));

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        try {
            const url = 'http://localhost:5058/booking';
            const response = await axios.get(`${url}/${bookingId}`);
            console.log('Booking details', response);
            if (response?.status === 200) {
                setBooking(response?.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <ul className="d-flex flex-column gap-2">
            {booking?.bookingDetails?.$values?.map((b) => {
                const formattedDate = formatDate(booking?.checkIn).split(',')[0];

                return (
                    <li
                        key={b?.room?.id}
                        className="d-flex align-items-center gap-4 border border-secondary rounded-3 p-4 ps-0 shadow-sm"
                    >
                        <div
                            className="text-center fw-semibold px-5 border-end border-secondary"
                            style={{ color: '#d25733' }}
                        >
                            <p>{formattedDate.split(' ')[0]}</p>
                            <p className="fs-1 lh-1">{formattedDate.split(' ')[1]}</p>
                        </div>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 w-full">
                            <div className="d-flex flex-wrap align-items-center gap-4">
                                {/* <div className="d-flex flex-column gap-1">
                                    <span className="d-flex align-items-center gap-2">
                                        <GiEntryDoor size={24} />
                                        <small>01/04/2024</small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <GiExitDoor size={24} />
                                        <small> 08/04/2024</small>
                                    </span>
                                </div> */}
                                <div className="d-flex flex-column gap-1">
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Room:</p>
                                        <small>{b?.room?.name}</small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Type:</p>
                                        <small>{b?.room?.type}</small>
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Price:</p>
                                        <small>{formatCurrency(b?.room?.price)}</small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Area:</p>
                                        <small>{b?.room?.area}m2</small>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button className="d-flex align-items-center gap-2 px-4 py-3 rounded-3">
                                    <span>Edit</span>
                                    <IoIosArrowDown />
                                </button>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default BookingDetail;
