import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { GiEntryDoor, GiExitDoor } from 'react-icons/gi';

const BookingDetail = () => {
    return (
        <ul className="d-flex flex-column gap-2">
            <li className="d-flex align-items-center gap-4 border border-secondary rounded-3 p-4 ps-0 shadow-sm">
                <div className="text-center fw-semibold px-5 border-end border-secondary" style={{ color: '#d25733' }}>
                    <p>Wed</p>
                    <p className="fs-1 lh-1">28</p>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 w-full">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <GiEntryDoor size={24} />
                                <small>01/04/2024</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <GiExitDoor size={24} />
                                <small> 08/04/2024</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Room:</p>
                                <small>VIP Room 302</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Type:</p>
                                <small>VIP</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Price:</p>
                                <small>5.000.000 đ</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Area:</p>
                                <small>50m2</small>
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

            <li className="d-flex align-items-center gap-4 border border-secondary rounded-3 p-4 ps-0 shadow-sm">
                <div className="text-center fw-semibold px-5 border-end border-secondary" style={{ color: '#d25733' }}>
                    <p>Wed</p>
                    <p className="fs-1 lh-1">28</p>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 w-full">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <GiEntryDoor size={24} />
                                <small>01/04/2024</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <GiExitDoor size={24} />
                                <small> 08/04/2024</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Room:</p>
                                <small>VIP Room 302</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Type:</p>
                                <small>VIP</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Price:</p>
                                <small>5.000.000 đ</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Area:</p>
                                <small>50m2</small>
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

            <li className="d-flex align-items-center gap-4 border border-secondary rounded-3 p-4 ps-0 shadow-sm">
                <div className="text-center fw-semibold px-5 border-end border-secondary" style={{ color: '#d25733' }}>
                    <p>Wed</p>
                    <p className="fs-1 lh-1">28</p>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 w-full">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <GiEntryDoor size={24} />
                                <small>01/04/2024</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <GiExitDoor size={24} />
                                <small> 08/04/2024</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Room:</p>
                                <small>VIP Room 302</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Type:</p>
                                <small>VIP</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Price:</p>
                                <small>5.000.000 đ</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Area:</p>
                                <small>50m2</small>
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

            <li className="d-flex align-items-center gap-4 border border-secondary rounded-3 p-4 ps-0 shadow-sm">
                <div className="text-center fw-semibold px-5 border-end border-secondary" style={{ color: '#d25733' }}>
                    <p>Wed</p>
                    <p className="fs-1 lh-1">28</p>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 w-full">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <GiEntryDoor size={24} />
                                <small>01/04/2024</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <GiExitDoor size={24} />
                                <small> 08/04/2024</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Room:</p>
                                <small>VIP Room 302</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Type:</p>
                                <small>VIP</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Price:</p>
                                <small>5.000.000 đ</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Area:</p>
                                <small>50m2</small>
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

            <li className="d-flex align-items-center gap-4 border border-secondary rounded-3 p-4 ps-0 shadow-sm">
                <div className="text-center fw-semibold px-5 border-end border-secondary" style={{ color: '#d25733' }}>
                    <p>Wed</p>
                    <p className="fs-1 lh-1">28</p>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 w-full">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <GiEntryDoor size={24} />
                                <small>01/04/2024</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <GiExitDoor size={24} />
                                <small> 08/04/2024</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Room:</p>
                                <small>VIP Room 302</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Type:</p>
                                <small>VIP</small>
                            </span>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Price:</p>
                                <small>5.000.000 đ</small>
                            </span>
                            <span className="d-flex align-items-center gap-2">
                                <p className="fw-semibold">Area:</p>
                                <small>50m2</small>
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
        </ul>
    );
};

export default BookingDetail;
