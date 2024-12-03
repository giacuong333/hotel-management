import React, { useEffect, useState } from 'react';

import Overlay from '~/components/Overlay';
import ToastContainer from '~/utils/showToast';

import DataTable from 'react-data-table-component';
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
        selector: (row) => row.formattedPrice,
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
        selector: (row) => row.formattedPrice,
    },
];

const ReceiptForm = ({ data, onClose, isShowed }) => {
    const [servicesData, setServicesData] = useState([]);
    const [totalServicesUsed, setTotalServicesUsed] = useState(null);
    const [differenceDate, setDifferenceData] = useState(null);
    const [subTotal, setSubTotal] = useState(null);
    const [subTotalWithDiscount, setSubTotalWithDiscount] = useState(null);

    console.log('Receipt detail: ', data);

    // Services used
    useEffect(() => {
        let totalOfServices = 0;
        const servicesData = data?.booking?.serviceUsage?.$values.map((s) => {
            totalOfServices += s?.quantity * s?.service?.price;
            return { ...s.service, formattedPrice: formatCurrency(s?.service?.price), quantity: s.quantity };
        });
        setTotalServicesUsed(totalOfServices);
        setServicesData(servicesData);
    }, [data]);

    // Calculate stayed dates
    useEffect(() => {
        const checkIn = new Date(data?.booking?.checkIn);
        const checkOut = new Date(data?.booking?.checkOut);
        const timeDifference = Math.abs(checkOut - checkIn);
        const datesStayed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setDifferenceData(datesStayed);
    }, [data?.booking?.checkIn, data?.booking?.checkOut]);

    // Calculate subtotal, subtotalwithdiscount
    useEffect(() => {
        if (differenceDate && data?.booking?.checkIn && data?.booking?.checkOut) {
            setSubTotal(differenceDate * data?.booking?.room?.price + totalServicesUsed);
            setSubTotalWithDiscount(
                (differenceDate * data?.booking?.room?.price + totalServicesUsed) *
                    ((100 - data?.discount?.value) / 100),
            );
        }
    }, [
        differenceDate,
        data?.booking?.checkIn,
        data?.booking?.checkOut,
        data?.booking?.room?.price,
        data?.discount?.value,
        totalServicesUsed,
    ]);

    return (
        <>
            {/* Toast */}
            {ToastContainer}

            <Overlay isShow={isShowed} onClose={onClose} />
            <main
                className=""
                style={{
                    maxWidth: '70rem',
                    width: '100%',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    zIndex: 20,
                    transform: 'translate(-50%, -50%)',
                    padding: '1.4rem 2rem 2rem 2rem',
                }}
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
                                            {data?.booking?.customer?.name || data?.booking?.customerName}
                                        </small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Email:</p>
                                        <small className="text-secondary">
                                            {data?.booking?.customer?.email || data?.booking?.customerEmail}
                                        </small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Phone:</p>
                                        <small className="text-capitalize text-secondary">
                                            {data?.booking?.customer?.phoneNumber || data?.booking?.customerPhoneNumber}
                                        </small>
                                    </span>
                                </div>
                                <div>
                                    <h5>Invoice #{data?.id}</h5>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Invoice Date:</p>
                                        <small className="text-capitalize text-secondary">
                                            {String(data?.createdAt).split('T')[0]}
                                        </small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Check-In Date:</p>
                                        <small className="text-capitalize text-secondary">
                                            {String(data?.booking?.checkIn).split('T')[0]}
                                        </small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Check-Out Date:</p>
                                        <small className="text-capitalize text-secondary">
                                            {String(data?.booking?.checkOut).split('T')[0]}
                                        </small>
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <p className="fw-semibold">Stayed Date:</p>
                                        <small className="text-capitalize text-secondary">
                                            {differenceDate || 'Calculating...'}
                                        </small>
                                    </span>
                                </div>
                            </div>

                            <div className="pt-2 d-flex flex-column gap-2">
                                <h5 className="m-0">Rooms Used</h5>
                                <DataTable
                                    columns={roomColumns}
                                    data={[
                                        {
                                            ...data?.booking?.room,
                                            formattedPrice: formatCurrency(data?.booking?.room?.price),
                                        },
                                    ]}
                                    customStyles={customStyles}
                                />
                            </div>
                            <div className="pt-2 d-flex flex-column gap-2">
                                <h5 className="m-0">Services Used</h5>
                                <DataTable
                                    pagination
                                    columns={servicesUsedColumns}
                                    data={servicesData}
                                    customStyles={customStyles}
                                />
                            </div>

                            <div className="d-flex align-items-start justify-content-end pt-4">
                                <div className="d-flex flex-column align-items-end gap-2">
                                    <span className="d-flex align-items-center justify-content-between gap-5">
                                        <p>Subtotal</p>
                                        <p>{formatCurrency(subTotal)}</p>
                                    </span>
                                    <span className="d-flex align-items-center justify-content-between gap-5">
                                        <p>Discount {data?.discount?.value}%</p>
                                        <p>{formatCurrency(subTotalWithDiscount)}</p>
                                    </span>
                                    <span className="d-flex align-items-center justify-content-between gap-5">
                                        <h6 className="fw-bold">Total</h6>
                                        <h6 className="fw-bold">{formatCurrency(subTotalWithDiscount)}</h6>
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

export default ReceiptForm;
