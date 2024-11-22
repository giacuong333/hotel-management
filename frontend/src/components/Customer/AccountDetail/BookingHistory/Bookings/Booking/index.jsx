import React from 'react';
import { TfiReload } from 'react-icons/tfi';
import { useNavigate } from 'react-router';
import { formatDate } from '~/utils/formatDate';

const Booking = ({ booking }) => {
    const navigate = useNavigate();

    return (
        <li className="d-flex flex-column gap-3 p-4 rounded-3 border shadow-sm" style={{ backgroundColor: '#f3f3f1' }}>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 ">
                <div className="d-flex flex-wrap align-items-center gap-lg-5 gap-3">
                    <span className="d-flex flex-column gap-1">
                        <small className="text-secondary">Booking placed</small>
                        <p className="fw-semibold">{formatDate(booking.createdAt)}</p>
                    </span>
                    <span className="d-flex flex-column gap-1">
                        <small className="text-secondary">Total</small>
                        <p className="fw-semibold">$157.99</p>
                    </span>
                    <span className="d-flex flex-column gap-1">
                        <small className="text-secondary">Check-in</small>
                        <p className="fw-semibold">{formatDate(booking.checkIn)}</p>
                    </span>
                </div>
                <div className="d-flex flex-column align-items-lg-end align-items-start gap-1">
                    <p className="fw-semibold">Booking #{booking.id}</p>
                    <span className="d-flex align-items-center gap-3">
                        <p
                            className="fw-semibold text-decoration-underline cursor-pointer"
                            style={{ color: '#35776d' }}
                            onClick={() => navigate(`/account/bookinghistory/bookingdetails/${booking?.id}`)}
                        >
                            View room details
                        </p>
                        <span className="text-black-50">|</span>
                        <p
                            className="fw-semibold text-decoration-underline cursor-pointer"
                            style={{ color: '#35776d' }}
                            onClick={() => navigate(`/account/bookinghistory/invoice/booking/${booking?.id}`)}
                        >
                            View invoice
                        </p>
                    </span>
                </div>
            </div>
            {(booking.status === 3 || booking.status === 0) && (
                <div>
                    <button
                        className="text-white p-2 px-3 rounded-3 border d-flex align-items-center gap-2 svg-rotate-half-circle"
                        style={{ backgroundColor: '#35776d' }}
                    >
                        <TfiReload size={14} className="icon" />
                        <span>Book it again</span>
                    </button>
                </div>
            )}
        </li>
    );
};

export default Booking;
