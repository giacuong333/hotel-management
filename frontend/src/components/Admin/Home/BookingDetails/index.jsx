import React from 'react';

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

const data = [
    {
        id: 1,
        createdAt: '2024-09-03',
        customer: 'Gia Cường',
        phoneNumber: '0948800917',
        checkIn: '2021-09-07',
        checkOut: '2021-09-11',
        payment: (
            <p style={{ backgroundColor: '#80CBC4', fontSize: '10px' }} className="rounded-pill text-white py-1 px-3">
                Received
            </p>
        ),
    },
    {
        id: 2,
        createdAt: '2024-09-03',
        customer: 'Minh Cảnh',
        phoneNumber: '0948867580',
        checkIn: '2021-09-07',
        checkOut: '2021-09-11',
        payment: (
            <p
                style={{ backgroundColor: '#ffd5e1', color: '#b74c4c', fontSize: '10px' }}
                className="rounded-pill py-1 px-3"
            >
                Pending
            </p>
        ),
    },
    {
        id: 3,
        createdAt: '2024-09-03',
        customer: 'Kim Bạc',
        phoneNumber: '0918372900',
        checkIn: '2021-09-07',
        checkOut: '2021-09-11',
        payment: (
            <p
                style={{ backgroundColor: '#ffd5e1', color: '#b74c4c', fontSize: '10px' }}
                className="rounded-pill py-1 px-3"
            >
                Pending
            </p>
        ),
    },
    {
        id: 4,
        createdAt: '2024-09-03',
        customer: 'Như Quỳnh',
        phoneNumber: '9685599039',
        checkIn: '2021-09-07',
        checkOut: '2021-09-11',
        payment: (
            <p style={{ backgroundColor: '#80CBC4', fontSize: '10px' }} className="rounded-pill text-white py-1 px-3">
                Received
            </p>
        ),
    },
    {
        id: 5,
        createdAt: '2024-09-03',
        customer: 'Nhung Vy',
        phoneNumber: '8895049102',
        checkIn: '2021-09-07',
        checkOut: '2021-09-11',
        payment: (
            <p
                style={{ backgroundColor: '#ffd5e1', color: '#b74c4c', fontSize: '10px' }}
                className="rounded-pill py-1 px-3"
            >
                Pending
            </p>
        ),
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
