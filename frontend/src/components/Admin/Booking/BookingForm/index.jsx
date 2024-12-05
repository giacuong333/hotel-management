import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Overlay from '~/components/Overlay';
import formatCurrency from '~/utils/currencyPipe';
import ToastContainer from '~/utils/showToast';

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

const roomColumns = [
    {
        name: 'ID',
        selector: (row) => row.id,
        center: true,
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
        center: true,
    },
    {
        name: 'Area',
        selector: (row) => `${row.area}m2`,
    },
    {
        name: 'Price',
        selector: (row) => formatCurrency(row.price),
    },
    {
        name: 'Total Price',
        selector: (row) => formatCurrency(row.roomTotal),
    },
];

const servicesUsedColumns = [
    {
        name: 'ID',
        selector: (row) => row.id,
        center: true,
    },
    {
        name: 'Name',
        selector: (row) => row.name,
    },
    {
        name: 'Quantity',
        selector: (row) => row.quantity,
        center: true,
    },
    {
        name: 'Price',
        selector: (row) => formatCurrency(row.price),
    },
];

const BookingForm = ({ data, onClose, isShowed }) => {
    const [rooms, setRooms] = useState([]);
    const [services, setServices] = useState([]);
    const [total, setTotal] = useState(null);
    const [stayedDate, setStayedDate] = useState(null);

    useEffect(() => {
        if (data) {
            const checkIn = new Date(data?.checkIn);
            const checkOut = new Date(data?.checkOut);
            const timeDifference = Math.abs(checkOut - checkIn);
            const datesStayed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            setStayedDate(datesStayed);
        }
    }, [data, data?.checkIn, data?.checkOut]);

    useEffect(() => {
        data?.room?.price &&
            stayedDate &&
            setRooms(() => {
                const roomTotal = data?.room?.price * stayedDate;
                return [{ ...data.room, roomTotal: roomTotal }];
            });
    }, [data?.room, stayedDate]);

    useEffect(() => {
        data?.serviceUsage.$values &&
            setServices(() => {
                return data?.serviceUsage?.$values.map((su) => {
                    return {
                        ...su?.service,
                        quantity: su.quantity,
                    };
                });
            });
    }, [data]);

    useEffect(() => {
        setTotal(() => {
            const totalServices = services.reduce((total, su) => total + (su.price || 0) * (su.quantity || 0), 0);
            return totalServices + rooms[0]?.roomTotal;
        });
    }, [rooms, services]);

    return (
        <>
            {/* Toast */}
            {ToastContainer}

            {/* Overlay */}
            <Overlay isShow={isShowed} onClose={onClose} />

            {/* Form */}
            <main
                style={{
                    maxWidth: '70rem',
                    width: '100%',
                    padding: '1.4rem 2rem 2rem 2rem',
                }}
                className={`confirm-popup ${isShowed ? 'show' : 'hide'}`}
            >
                <div className="d-flex flex-column gap-4">
                    <div>
                        <div className="bg-white shadow p-5" style={{ overflow: 'scroll', height: '50rem' }}>
                            <div
                                className="d-flex align-items-center justify-content-between pb-5"
                                style={{ borderBottom: '2px solid #35776d' }}
                            >
                                <div>
                                    <p>ID: #{data?.id}</p>
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
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Name:</p>
                                        <small className="text-capitalize text-secondary">
                                            {data?.customer?.name || data?.customerName}
                                        </small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Email:</p>
                                        <small className="text-secondary">
                                            {data?.customer?.email || data?.customerEmail}
                                        </small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Phone:</p>
                                        <small className="text-capitalize text-secondary">
                                            {data?.customer?.phoneNumber || data?.customerPhoneNumber}
                                        </small>
                                    </span>
                                </div>
                                <div>
                                    <h5>Booking #{data?.id}</h5>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Booking Date:</p>
                                        <small className="text-capitalize text-secondary">
                                            {String(data?.createdAt).split('T')[0]}
                                        </small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Check-In Date:</p>
                                        <small className="text-capitalize text-secondary">
                                            {String(data?.checkIn).split('T')[0]}
                                        </small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Check-Out Date:</p>
                                        <small className="text-capitalize text-secondary">
                                            {String(data?.checkOut).split('T')[0]}
                                        </small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Stayed Date:</p>
                                        <small className="text-capitalize text-secondary">
                                            {stayedDate ? String(stayedDate).split('T')[0] : 'Calculating...'}
                                        </small>
                                    </span>
                                </div>
                            </div>

                            <div className="pt-2 d-flex flex-column gap-2">
                                <h5 className="m-0">Rooms Used</h5>
                                <DataTable columns={roomColumns} data={rooms} customStyles={customStyles} />
                            </div>
                            <div className="pt-2 d-flex flex-column gap-2">
                                <h5 className="m-0">Services Used</h5>
                                <DataTable
                                    pagination
                                    columns={servicesUsedColumns}
                                    data={services}
                                    customStyles={customStyles}
                                />
                            </div>

                            <div className="d-flex align-items-start justify-content-end pt-4">
                                <div className="d-flex flex-column align-items-end gap-2">
                                    <span className="d-flex align-items-center justify-content-between gap-5">
                                        <h6 className="fw-bold">Total</h6>
                                        <h6 className="fw-bold">{total ? formatCurrency(total) : 'Calculating...'}</h6>
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

export default BookingForm;
