import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import formatCurrency from '~/utils/currencyPipe';
import { formatDate } from '~/utils/formatDate';

const BookingDetail = () => {
    const [booking, setBooking] = useState(null);
    const bookingId = Number(useLocation().pathname.charAt(useLocation().pathname.length - 1));

    console.log('Booking detail', booking);

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        try {
            const url = 'http://localhost:5058/booking';
            const response = await axios.get(`${url}/${bookingId}`);
            console.log('Booking details', response);
            if (response?.status === 200) {
                const data = response?.data;
                const formattedDate = formatDate(data?.checkIn).split(',')[0];
                data.formattedDate = formattedDate;
                setBooking(response?.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <ul className="d-flex flex-column gap-2">
            <li className="d-flex align-items-center gap-4 border border-secondary rounded-3 p-4 ps-0 shadow-sm">
                <div className="text-center fw-semibold px-5 border-end border-secondary" style={{ color: '#d25733' }}>
                    <p>{booking?.formattedDate.split(' ')[0]}</p>
                    <p className="fs-1 lh-1">{booking?.formattedDate.split(' ')[1]}</p>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 w-full">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Room:</p>
                                <small>{booking?.room?.name}</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Type:</p>
                                <small>{booking?.room?.type}</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Price:</p>
                                <small>{formatCurrency(booking?.room?.price)}</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Area:</p>
                                <small>{booking?.room?.area}m2</small>
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    );
};

export default BookingDetail;
