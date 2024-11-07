import React from 'react';
import { useNavigate } from 'react-router';
import BookingDetail from './BookingDetail';

const BookingDetails = () => {
    const navigate = useNavigate();

    return (
        <main className="">
            <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-2">
                    <small className="fw-semibold cursor-pointer" onClick={() => navigate(-1)}>
                        Booking History
                    </small>
                    <span>/</span>
                    <small className="fw-semibold secondary-color">Booking Details</small>
                </div>
                {/* Booking details */}
                <div>
                    <BookingDetail />
                </div>
            </div>
        </main>
    );
};

export default BookingDetails;
