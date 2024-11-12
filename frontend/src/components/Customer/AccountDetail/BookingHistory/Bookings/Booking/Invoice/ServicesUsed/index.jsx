import React from 'react';
import Overlay from '../../../../../../../Overlay';
import DataTable from 'react-data-table-component';
import { IoClose } from 'react-icons/io5';

const ServicesUsed = ({ servicesUsed, isShow, onClose }) => {
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
            name: 'Name',
            selector: (row) => row.name,
        },
        {
            name: 'Price',
            selector: (row) => row.price,
        },
    ];

    const data = [
        {
            id: 1,
            name: 'Room 1',
            price: '3.000.000 đ',
            // totalServicePrice: '300.000 đ',
        },
        {
            id: 2,
            name: 'Room 2',
            price: '2.000.000 đ',
            // totalServicePrice: '318.000 đ',
        },
    ];

    return (
        <>
            {/* Show/Hide Service Details */}
            <Overlay isShow={isShow} onClose={onClose} />
            <div
                className="shadow"
                style={{
                    width: '500px',
                    height: '550px',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    zIndex: 20,
                    transform: 'translate(-50%, -50%)',
                    padding: '1.2rem 1.6rem 1.6rem 1.6rem',
                    backgroundColor: 'white',
                }}
            >
                <div className="d-flex align-items-center justify-content-between pb-3">
                    <h3>Services Used</h3>
                    <IoClose size={30} className="cursor-pointer options-hover p-1 rounded-circle" onClick={onClose} />
                </div>
                <div>
                    <DataTable columns={columns} data={data} customStyles={customStyles} />
                </div>
            </div>
        </>
    );
};

export default ServicesUsed;
