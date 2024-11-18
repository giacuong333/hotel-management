import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { IoClose } from 'react-icons/io5';
import Overlay from '~/components/Overlay';
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
        selector: (row) => row.formattedPrice,
    },
];

const AdditionalFeeForm = ({ receiptId, onShow, onClose }) => {
    const [additionalFees, setAdditionalFees] = useState([]);

    useEffect(() => {
        fetchAdditionalFees();
    }, [receiptId]);

    const fetchAdditionalFees = async () => {
        try {
            const url = `http://localhost:5058/receipt/${receiptId}`;
            const response = await axios.get(url);
            if (response?.status === 200) {
                console.log('AdditionalFee', response);
                let data = response?.data?.additionalFees?.$values;
                let total = 0;
                data = data.map((a) => {
                    a.formattedPrice = formatCurrency(a?.price);
                    total += a?.price;
                    return a;
                });
                data.push({ name: <h5>Total</h5>, formattedPrice: <h5>{formatCurrency(total)}</h5> });
                setAdditionalFees(data);
            }
        } catch (error) {
            console.log('Error while fetching services used', error);
        }
    };
    return (
        <div className="px-5 mx-5">
            <Overlay isShow={onShow} onClose={onClose} />
            <div
                className="d-flex flex-column gap-2 bg-white"
                style={{
                    maxWidth: '70rem',
                    width: '100%',
                    height: 'auto',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    zIndex: 20,
                    transform: 'translate(-50%, -50%)',
                    padding: '1.4rem 2rem 2rem 2rem',
                }}
            >
                <div className="d-flex align-items-center justify-content-between">
                    <h5>Additional Fees</h5>
                    <IoClose size={30} className="options-hover rounded-circle cursor-pointer p-1" onClick={onClose} />
                </div>
                <DataTable columns={columns} data={additionalFees} customStyles={customStyles} />
            </div>
        </div>
    );
};

export default AdditionalFeeForm;
