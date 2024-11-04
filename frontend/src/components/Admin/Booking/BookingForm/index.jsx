import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Overlay from '~/components/Overlay';
import formatCurrency from '~/utils/currencyPipe';
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
                    width: '60%',
                    height: '550px',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    zIndex: 20,
                    transform: 'translate(-50%, -50%)',
                    padding: '0 1rem',
                }}
            >
                <div className="bg-white p-3 rounded-3 position-relative shadow">
                    <IoClose
                        size={30}
                        className="p-1 rounded-circle cursor-pointer text-white customer-primary-button bg-hover-white text-hover-black"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: -38,
                            zIndex: 20,
                        }}
                        onClick={onClose}
                    />
                    <ul className="d-flex flex-wrap align-items-center justify-content-start gap-3">
                        {bookedRooms?.map((item) => {
                            return (
                                <li
                                    key={item?.room?.id}
                                    className="primary-bd-color bg-white solid-shadow p-3 rounded-3"
                                    style={{
                                        minWidth: '200px',
                                    }}
                                >
                                    <span className="d-flex align-items-center justify-content-start gap-1">
                                        <p className="fw-semibold text-secondary-emphasis">Booking Date:</p>
                                        <small className="text-black-50">{data?.createdAt}</small>
                                    </span>
                                    <span className="d-flex align-items-center justify-content-start gap-1">
                                        <p className="fw-semibold text-secondary-emphasis">Room name:</p>
                                        <small className="text-black-50">{item?.room?.name}</small>
                                    </span>
                                    <span className="d-flex align-items-center justify-content-start gap-1">
                                        <p className="fw-semibold text-secondary-emphasis">Room type:</p>
                                        <small className="text-black-50">{item?.room?.type}</small>
                                    </span>
                                    <span className="d-flex align-items-center justify-content-start gap-1">
                                        <p className="fw-semibold text-secondary-emphasis">Price:</p>
                                        <small className="text-black-50">{formatCurrency(item?.room?.price)}</small>
                                    </span>
                                    <span className="d-flex align-items-center justify-content-start gap-1">
                                        <p className="fw-semibold text-secondary-emphasis">Area:</p>
                                        <small className="text-black-50">{item?.room?.area}m2</small>
                                    </span>
                                    <span className="d-flex align-items-center justify-content-start gap-1">
                                        <p className="fw-semibold text-secondary-emphasis">Client:</p>
                                        <small className="text-black-50">
                                            {data?.customer?.name} | {data?.customer?.phoneNumber} |{' '}
                                            {data?.customer?.email}
                                        </small>
                                    </span>
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
