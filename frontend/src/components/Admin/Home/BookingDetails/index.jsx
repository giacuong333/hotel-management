import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Booking Date',
        selector: (row) => row.createdAt,
    },
    {
        name: 'Customer',
        selector: (row) => row.customer,
    },
    {
        name: 'Phone',
        selector: (row) => row.phoneNumber,
    },
    {
        name: 'Check-in',
        selector: (row) => row.checkIn,
    },
    {
        name: 'Check-out',
        selector: (row) => row.checkOut,
    },
    {
        name: 'Payment',
        selector: (row) => row.payment,
    },
];
const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#f7f7f7',
            color: '#333',
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
            padding: '10px',
            borderBottom: '2px solid #ddd',
        },
    },
    header: {
        style: {
            minHeight: '56px',
            backgroundColor: '#eaeaea',
            borderBottom: '2px solid #ddd',
        },
    },
};

const BookingDetails = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5058/dashboard/bookingdetails', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setBookings(response.data.$values || []);
                }
            } catch (error) {
                console.log('Error fetching :', error);
            }
        };

        fetchBookings();
    }, []);
    console.log(bookings);

    const data = bookings
        ?.filter((booking) => booking.status !== null)
        .sort((a, b) => (a.status === 4 ? 0 : 1) - (b.status === 4 ? 0 : 1))
        .map((booking) => ({
            id: booking.id,
            createdAt: booking.createdAt,
            customer: booking.customerName ?? booking.name,
            phoneNumber: booking.customerPhoneNumber ?? booking.phoneNumber,
            checkIn: booking.checkIn || '',
            checkOut: booking.checkOut || '',
            payment: (
                <p
                    style={{
                        backgroundColor: booking.status === 4 ? '#ffd5e1' : '#80CBC4',
                        color: booking.status === 4 ? '#b74c4c' : 'white',
                        fontSize: '10px',
                    }}
                    className="rounded-pill py-1 px-3"
                >
                    {booking.status === 4 ? 'Pending' : 'Received'}
                </p>
            ),
        }));
    return (
        <div>
            <p className="text-capitalize fs-5 fw-semibold mb-2">Booking Details</p>
            <DataTable
                columns={columns}
                data={data}
                className="shadow-sm border"
                highlightOnHover
                pointerOnHover
                customStyles={customStyles}
            />
        </div>
    );
};

export default BookingDetails;
