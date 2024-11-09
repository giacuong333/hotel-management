import React from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import { BsThreeDots } from 'react-icons/bs';

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

const columns = [
    {
        name: 'ID',
        selector: (row) => row.id,
    },
    {
        name: 'Room',
        selector: (row) => row.room,
    },
    {
        name: 'Room Price',
        selector: (row) => row.roomPrice,
    },
    {
        name: 'Total Service Price',
        selector: (row) => row.totalServicePrice,
    },
    {
        action: '',
        selector: (row) => row.options,
    },
];

const data = [
    {
        id: 1,
        room: 'Room 1',
        roomPrice: '3.000.000 đ',
        totalServicePrice: '300.000 đ',
        options: <BsThreeDots size={28} className="cursor-pointer options-hover p-2 rounded-circle" />,
    },
    {
        id: 2,
        room: 'Room 2',
        roomPrice: '2.000.000 đ',
        totalServicePrice: '318.000 đ',
        options: <BsThreeDots size={28} className="cursor-pointer options-hover p-2 rounded-circle" />,
    },
];

const Invoice = () => {
    const navigate = useNavigate();

    return (
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
                            <div className="bg-black rounded-3">
                                <img
                                    src="http://localhost:3000/static/media/luxestay_logo.b519c98a9069f3de9e39.b519c98a9069f3de9e39.png"
                                    alt="Logo"
                                />
                            </div>
                        </div>

                        <div className="d-flex align-items-start justify-content-between pt-3">
                            <div>
                                <h5>BILL TO</h5>
                                <p>Nhung Vy</p>
                                <p>nhungvy@gmail.com</p>
                                <p>0948800917</p>
                            </div>
                            <div>
                                <h5>Invoice #312</h5>
                                <p>Invoice Date</p>
                                <p>Due Date</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <DataTable columns={columns} data={data} customStyles={customStyles} />
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
    );
};

export default Invoice;
