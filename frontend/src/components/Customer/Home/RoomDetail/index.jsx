import React from 'react';
import { FormGroup } from 'react-bootstrap';
import { FaDollarSign } from 'react-icons/fa6';
import ExtraServices from './ExtraServices';

const RoomDetail = () => {
    return (
        <section>
            <div
                className="container mx-auto"
                style={{
                    padding: '4rem 0',
                }}
            >
                <div className="row">
                    <div className="col-lg-8">
                        <div>
                            <div className="position-relative w-full h-full">
                                <img
                                    src="https://luxestay.wpthemeverse.com/wp-content/uploads/2024/08/classic-room.png"
                                    alt=""
                                    className="w-full h-full"
                                />
                                <div
                                    className="bg-white d-inline-flex align-items-center gap-2 px-4 py-3"
                                    style={{
                                        position: 'absolute',
                                        bottom: '1rem',
                                        left: '1rem',
                                        zIndex: 10,
                                    }}
                                >
                                    <span className="text-uppercase">From </span>
                                    <span className="d-flex align-items-center">
                                        <FaDollarSign />
                                        <p className="font-weight-bold">120.000 VND</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="customer-third-bg-color p-4">
                            <p className="text-center fs-3 p-2 pt-0">Your Reservation</p>
                            <div className="py-3 d-flex flex-column gap-4">
                                <span className="d-flex flex-column gap-2">
                                    <p>Check-in</p>
                                    <input
                                        aria-label="Date and time"
                                        type="datetime-local"
                                        className="customer-datetime-picker room-detail"
                                    />
                                </span>
                                <span className="d-flex flex-column gap-2">
                                    <p>Check-out</p>
                                    <input
                                        aria-label="Date and time"
                                        type="datetime-local"
                                        className="customer-datetime-picker room-detail"
                                    />
                                </span>
                                <span className="d-flex flex-column gap-2">
                                    <p>Rooms</p>
                                    <select
                                        aria-label="Date and time"
                                        type="datetime-local"
                                        className="customer-datetime-picker room-detail"
                                    >
                                        <option value="">1</option>
                                    </select>
                                </span>
                                <span className="d-flex flex-column gap-2">
                                    <p>Guests</p>
                                    <select
                                        aria-label="Date and time"
                                        type="datetime-local"
                                        className="customer-datetime-picker room-detail"
                                    >
                                        <option value="">1 Adult</option>
                                    </select>
                                </span>
                            </div>
                            <div className="d-flex flex-column gap-4">
                                <p className="text-start fs-3 py-2 pt-0">Extra Services</p>
                                <ExtraServices />
                                <div className="bg-white border border-secondary p-3">
                                    <p className="fs-4">Your Price</p>
                                    <p className="fs-5">$ 619</p>
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                    <button
                                        variant="primary"
                                        className="customer-primary-button p-3 rounded-0 text-uppercase flex-grow-1 text-center text-uppercase text-white"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoomDetail;
