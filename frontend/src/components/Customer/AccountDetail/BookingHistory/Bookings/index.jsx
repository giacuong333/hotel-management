import React, { useCallback, useEffect, useState } from 'react';
import Booking from './Booking';
import axios from 'axios';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const bookingsPerPage = 4;

const Bookings = ({ type }) => {
    const [bookings, setBookings] = useState([]);
    const [paginationBookings, setPaginationBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOfPages, setTotalOfPages] = useState(0);

    useEffect(() => {
        const lastIndexOfBookings = currentPage * bookingsPerPage;
        const firstIndexOfBookings = lastIndexOfBookings - bookingsPerPage;
        setPaginationBookings(() => {
            const result = bookings.slice(firstIndexOfBookings, lastIndexOfBookings);
            return result;
        });
    }, [totalOfPages, currentPage, bookings]);

    const fetchBookings = useCallback(
        async (url) => {
            try {
                const response = await axios.get(url);
                if (response?.status === 200) {
                    const data = response?.data?.$values;
                    if (type === 'booking') setBookings(data.sort((b) => (b?.status === 3 ? 1 : -1)));
                    else setBookings(data);

                    setTotalOfPages(Math.ceil(data.length / bookingsPerPage));
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        [type],
    );

    useEffect(() => {
        if (type === 'booking') fetchBookings('http://localhost:5058/booking/customer_booking');
        else if (type === 'cancelled') fetchBookings('http://localhost:5058/booking/customer_cancelled_booking');
    }, [type, fetchBookings]);

    // Handle navigation
    const nextPage = () => {
        currentPage < totalOfPages && setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1);
    };

    const selectPage = (current) => {
        current !== currentPage && setCurrentPage(current);
    };

    return (
        <div>
            <ul className="d-flex flex-column gap-2">
                {paginationBookings.map((booking) => (
                    <Booking booking={booking} key={booking?.id} />
                ))}
            </ul>

            {/* Pagination */}
            {bookings.length !== 0 && (
                <div className="mt-4 d-flex align-items-center justify-content-end gap-2">
                    <button
                        className={`p-2 px-3 rounded-2 cursor-pointer shadow-sm border ${
                            currentPage === 1 ? 'pe-none cursor-default opacity-50' : ''
                        }`}
                        onClick={prevPage}
                    >
                        <MdOutlineKeyboardArrowLeft />
                    </button>
                    {[...Array(totalOfPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <button
                                key={page}
                                className="p-2 px-3 rounded-2 cursor-pointer shadow-sm border"
                                onClick={() => selectPage(page)}
                                style={{
                                    background: page === currentPage ? '#35776d' : '',
                                    color: page === currentPage ? '#fff' : '',
                                }}
                            >
                                {page}
                            </button>
                        );
                    })}
                    <button
                        className={`p-2 px-3 rounded-2 cursor-pointer shadow-sm border ${
                            currentPage === totalOfPages ? 'pe-none cursor-default opacity-50' : ''
                        }`}
                        onClick={nextPage}
                    >
                        <MdOutlineKeyboardArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Bookings;
