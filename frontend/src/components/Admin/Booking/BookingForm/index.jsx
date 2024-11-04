import React, { useEffect, useState } from 'react';
import Overlay from '~/components/Overlay';
import ToastContainer from '~/utils/showToast';

const BookingForm = ({ data, type, onClose, onBookingAdded, isShowed }) => {
    const [bookedRooms, setBookedRooms] = useState([]);

    useEffect(() => {
        const filterdRoomsBookedByUser = data?.bookingDetails?.$values?.filter((item) => {
            return data?.bookingId === item?.bookingDetails?.$values?.bookingId;
        });
        setBookedRooms(filterdRoomsBookedByUser);
    }, [data]);

    return (
        <>
            {ToastContainer}
            <Overlay isShow={isShowed} onClose={onClose} />
            <div
                style={{
                    width: '700px',
                    height: '550px',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    zIndex: 20,
                    transform: 'translate(-50%, -50%)',
                    padding: '0 1rem',
                }}
            >
                <div className="bg-white p-3 rounded-3">
                    <ul>
                        {bookedRooms?.map((item) => {
                            return (
                                <li key={item?.room?.id} className="secondary-bg-color p-3 rounded-3">
                                    <p className="text-white">{item?.room?.name}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default BookingForm;
