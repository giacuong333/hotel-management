import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate, useParams } from 'react-router';
import { useUser } from '~/providers/UserProvider';
import axios from 'axios';
import formatCurrency from '~/utils/currencyPipe';

const customStyles = {
    header: {
        style: {
            border: '2px solid #e0e0e0',
        },
    },
    headRow: {
        style: {
            border: '2px solid #35776d',
            backgroundColor: '#35776d',
            color: '#fff',
        },
    },
    headCells: {
        style: {
            border: '1px solid #ccc',
        },
    },
    rows: {
        style: {
            borderBottom: '1px solid #ddd',
        },
        highlightOnHoverStyle: {
            border: '1px solid #b5b5b5',
        },
    },
    cells: {
        style: {
            border: '1px solid #ddd',
        },
    },
};

const Invoice = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [servicesUsed, setServicesUsed] = useState();
    const [roomsUsed, setRoomsUsed] = useState();
    const [booking, setBooking] = useState();
    const [stayedDate, setStayedDate] = useState();
    const bookingId = useParams()?.id;

    // fetch data
    useEffect(() => {
        fetchServicesUsed();
        fetchBooking();
    }, [bookingId, stayedDate]);

    // Calculate stayed dates
    useEffect(() => {
        if (booking) {
            const checkIn = new Date(booking?.checkIn);
            const checkOut = new Date(booking?.checkOut);
            const timeDifference = Math.abs(checkOut - checkIn);
            const datesStayed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            setStayedDate(datesStayed);
        }
    }, [booking]);

    const fetchServicesUsed = async () => {
        try {
            const url = `http://localhost:5058/booking/${bookingId}`;
            const response = await axios.get(url);
            if (response?.status === 200) {
                const data = response?.data?.serviceUsage?.$values.map((s) => {
                    s.service.formattedPrice = formatCurrency(s.service.price);
                    return s.service;
                });
                setServicesUsed(data);
            }
        } catch (error) {
            console.log('Error while fetching services used', error);
        }
    };

    const fetchBooking = async () => {
        try {
            const url = `http://localhost:5058/booking/${bookingId}`;
            const response = await axios.get(url);
            if (response?.status === 200) {
                const data = response?.data?.bookingDetails?.$values.map((r) => {
                    r.room.formattedPrice = formatCurrency(r?.room?.price);
                    r.room.roomTotal =
                        r?.room?.price && stayedDate ? formatCurrency(r?.room?.price * stayedDate) : 'Calculating...';
                    return r?.room;
                });
                setRoomsUsed(data);
                setBooking(response?.data);
            }
        } catch (error) {
            console.log('Error while fetching services used', error);
        }
    };

    const roomColumns = [
        {
            name: 'ID',
            selector: (row) => row.id,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
        },
        {
            name: 'Type',
            selector: (row) => row.type,
        },
        {
            name: 'Beds',
            selector: (row) => row.bedNum,
        },
        {
            name: 'Area',
            selector: (row) => `${row.area}m2`,
        },
        {
            name: 'Price',
            selector: (row) => row.formattedPrice,
        },
        {
            name: 'Room Total',
            selector: (row) => row.roomTotal,
        },
    ];

    const servicesColumns = [
        {
            name: 'ID',
            selector: (row) => row.id,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
        },
        {
            name: 'Price',
            selector: (row) => row.formattedPrice,
        },
    ];

    return (
        <>
            {/* Main */}
            <main className="">
                <div className="d-flex flex-column gap-4">
                    <div className="d-flex align-items-center gap-2">
                        <small className="fw-semibold cursor-pointer" onClick={() => navigate(-1)}>
                            Booking History
                        </small>
                        <span>/</span>
                        <small className="fw-semibold secondary-color">Invoice</small>
                    </div>
                    <div>
                        <div className="bg-white shadow p-5">
                            <div
                                className="d-flex align-items-center justify-content-between pb-5"
                                style={{ borderBottom: '2px solid #35776d' }}
                            >
                                <div>
                                    <p>ID: #2213</p>
                                    <p>John Smith</p>
                                </div>
                                <div className="bg-black shadow p-2">
                                    <img
                                        src="http://localhost:3000/static/media/luxestay_logo.b519c98a9069f3de9e39.b519c98a9069f3de9e39.png"
                                        alt="Logo"
                                    />
                                </div>
                            </div>

                            <div className="d-flex flex-wrap align-items-start justify-content-between gap-4 pt-3">
                                <div>
                                    <h5>BILL TO</h5>
                                    <p className="text-capitalize">{user?.name}</p>
                                    <p>{user?.email}</p>
                                    <p>{user?.phoneNumber}</p>
                                </div>
                                <div>
                                    <h5>Invoice #312</h5>
                                    <p>Invoice Date {}</p>
                                    <p>Check-In Date: {booking?.checkIn.split('T')[0]}</p>
                                    <p>Check-Out Date: {booking?.checkOut.split('T')[0]}</p>
                                    <p>Stayed Date: {stayedDate ? stayedDate : 'Calculating...'}</p>
                                </div>
                            </div>

                            <div className="pt-4 d-flex flex-column gap-2">
                                <h5>Rooms Used</h5>
                                <DataTable columns={roomColumns} data={roomsUsed} customStyles={customStyles} />
                            </div>

                            <div className="pt-4 d-flex flex-column gap-2">
                                <h5>Services Used</h5>
                                <DataTable columns={servicesColumns} data={servicesUsed} customStyles={customStyles} />
                            </div>

                            <div className="d-flex align-items-start justify-content-end pt-4">
                                <div className="d-flex flex-column align-items-end gap-2">
                                    <span className="d-flex align-items-center justify-content-between gap-5">
                                        <p>Subtotal</p>
                                        <p>3.000.000 đ</p>
                                    </span>
                                    <span className="d-flex align-items-center justify-content-between gap-5">
                                        <p>Discount 5.0%</p>
                                        <p>3.000.000 đ</p>
                                    </span>
                                    <span className="d-flex align-items-center justify-content-between gap-5">
                                        <h6 className="fw-bold">Total</h6>
                                        <h6 className="fw-bold">3.000.000 đ</h6>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Invoice;
