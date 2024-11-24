import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import formatCurrency from '~/utils/currencyPipe';
import ToastContainer, { showToast } from '~/utils/showToast';
import { RotatingLines } from 'react-loader-spinner';

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
        selector: (row) => formatCurrency(row.price),
    },
    {
        name: 'Room Total',
        selector: (row) => formatCurrency(row.roomTotal),
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
        name: 'Quantity',
        selector: (row) => row.quantity,
    },
    {
        name: 'Price',
        selector: (row) => formatCurrency(row.price),
    },
];

const Invoice = () => {
    const navigate = useNavigate();
    const [servicesUsed, setServicesUsed] = useState();
    const [roomsUsed, setRoomsUsed] = useState();
    const [stayedDate, setStayedDate] = useState();
    const bookingId = useParams()?.id;
    const [receipt, setReceipt] = useState({});
    const [subtotal, setSubtotal] = useState(null);
    const [subtotalWithDiscount, setSubtotalWithDiscount] = useState(null);
    const [total, setTotal] = useState(null);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        fetchReceipt();
    }, [bookingId, stayedDate]);

    useEffect(() => {
        roomsUsed && setSubtotal(roomsUsed[0].roomTotal);
    }, [bookingId, roomsUsed, subtotal]);

    useEffect(() => {
        subtotal &&
            setSubtotalWithDiscount(() => {
                const totalServices = servicesUsed.reduce((total, su) => total + su.price * su.quantity, 0);
                return (totalServices + subtotal) * (receipt?.discount?.value / 100);
            });
    }, [bookingId, receipt?.discount?.value, servicesUsed, subtotal]);

    useEffect(() => {
        subtotal && subtotalWithDiscount && setTotal(subtotal - subtotalWithDiscount);
    }, [subtotal, subtotalWithDiscount]);

    useEffect(() => {
        if (receipt.booking) {
            const checkIn = new Date(receipt?.booking?.checkIn);
            const checkOut = new Date(receipt?.booking?.checkOut);
            const timeDifference = Math.abs(checkOut - checkIn);
            const datesStayed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            setStayedDate(datesStayed);
        }
    }, [receipt?.booking]);

    const fetchReceipt = async () => {
        try {
            setPending(true);
            const response = await axios.get(`http://localhost:5058/receipt/booking/${bookingId}`);
            if (response.status === 200) {
                const room = response.data?.booking?.room;
                room.roomTotal = room?.price && stayedDate ? room?.price * stayedDate : 'Calculating...';
                const servicesUsed = response.data?.booking?.serviceUsage?.$values?.map((s) => {
                    return { ...s?.service, quantity: s?.quantity };
                });
                setServicesUsed(servicesUsed);
                setRoomsUsed([room]);
                setReceipt(response.data);
            }
        } catch (error) {
            console.log('Error while fetching invoice details', error);
            showToast("There's something wrong while fetching receipt details", 'error');
        } finally {
            setPending(false);
        }
    };

    return (
        <>
            {/* Toast */}
            {ToastContainer}

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
                    {pending ? (
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ height: '100vh', width: '100%' }}
                        >
                            <RotatingLines
                                visible={true}
                                height="40"
                                width="40"
                                strokeColor="#35776d"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : (
                        <div>
                            <div className="bg-white shadow p-5">
                                <div
                                    className="d-flex align-items-center justify-content-between pb-5"
                                    style={{ borderBottom: '2px solid #35776d' }}
                                >
                                    <div>
                                        <p>ID: #{receipt?.id}</p>
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
                                        <p className="text-capitalize">{receipt?.booking?.customer?.name}</p>
                                        <p>{receipt?.booking?.customer?.email}</p>
                                        <p>{receipt?.booking?.customer?.phoneNumber}</p>
                                    </div>
                                    <div>
                                        <h5>Invoice #{receipt?.id}</h5>
                                        <p>Invoice Date {receipt?.createdAt?.split('T')[0]}</p>
                                        <p>Check-In Date: {receipt?.booking?.checkIn.split('T')[0]}</p>
                                        <p>Check-Out Date: {receipt?.booking?.checkOut.split('T')[0]}</p>
                                        <p>Stayed Date: {stayedDate ? stayedDate : 'Calculating...'}</p>
                                    </div>
                                </div>

                                <div className="pt-4 d-flex flex-column gap-2">
                                    <h5>Rooms Used</h5>
                                    <DataTable columns={roomColumns} data={roomsUsed} customStyles={customStyles} />
                                </div>

                                <div className="pt-4 d-flex flex-column gap-2">
                                    <h5>Services Used</h5>
                                    <DataTable
                                        columns={servicesColumns}
                                        data={servicesUsed}
                                        customStyles={customStyles}
                                    />
                                </div>

                                <div className="d-flex align-items-start justify-content-end pt-4">
                                    <div className="d-flex flex-column align-items-end gap-2">
                                        <span className="d-flex align-items-center justify-content-between gap-5">
                                            <p>Subtotal</p>
                                            <p>{subtotal ? formatCurrency(subtotal) : 'Calculating...'}</p>
                                        </span>
                                        <span className="d-flex align-items-center justify-content-between gap-5">
                                            <p>Discount {receipt?.discount?.value}%</p>
                                            <p>
                                                {subtotalWithDiscount
                                                    ? formatCurrency(subtotalWithDiscount)
                                                    : 'Calculating...'}
                                            </p>
                                        </span>
                                        <span className="d-flex align-items-center justify-content-between gap-5">
                                            <h6 className="fw-bold">Total</h6>
                                            <h6 className="fw-bold">
                                                {total ? formatCurrency(total) : 'Calculating...'}
                                            </h6>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Invoice;
