import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { BsTrash } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import ConfirmPopup from '~/components/ConfirmPopup';
import FormGroup from '~/components/FormGroup';
import Overlay from '~/components/Overlay';
import formatCurrency from '~/utils/currencyPipe';
import { isEmpty } from '~/utils/formValidation';
import ToastContainer, { showToast } from '~/utils/showToast';

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
        center: true,
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
    const [showAddForm, setShowAddForm] = useState(false);
    const [fields, setFields] = useState({ receiptId, name: '', price: '' });
    const [errors, setErrors] = useState({});
    const [showTrash, setShowTrash] = useState(false);
    const [deleteMany, setDeleteMany] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [showConfirmDeleteMany, setShowConfirmDeleteMany] = useState({ show: false, confirm: false });

    useEffect(() => {
        receiptId && fetchAdditionalFees();
    }, []);

    const fetchAdditionalFees = async () => {
        try {
            const currentReceiptId = receiptId || fields.receiptId;
            const url = `http://localhost:5058/receipt/${currentReceiptId}`;
            const response = await axios.get(url);
            if (response?.status === 200) {
                let data = response?.data?.additionalFees?.$values;
                let total = 0;
                data = data.map((a) => {
                    a.formattedPrice = formatCurrency(a?.price);
                    total += a?.price;
                    return { ...a };
                });
                data.push({
                    key: 'total',
                    name: <h5>Total</h5>,
                    formattedPrice: <h5>{formatCurrency(total)}</h5>,
                });
                setAdditionalFees(data);
            }
        } catch (error) {
            console.log('Error while fetching services used', error);
            showToast("There's something wrong while fetching data", 'error');
        }
    };

    const handleSelectedRowsChange = ({ allSelected, selectedCount, selectedRows }) => {
        if (selectedCount > 0) {
            setShowTrash(true);
            setDeleteMany(() => {
                return selectedRows.map((row) => {
                    return row.id;
                });
            });
        } else {
            setShowTrash(false);
            setDeleteMany([]);
        }
    };

    const handleDeleteRowsSelected = async () => {
        try {
            console.log('Payload', deleteMany);
            const url = 'http://localhost:5058/additionalFee';
            const response = await axios.delete(url, {
                data: deleteMany,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                reset();
                await fetchAdditionalFees();
                showToast('Services deleted successfully', 'success');
            }
        } catch (error) {
            console.log(error);
            showToast("There's something wrong while deleting services used", 'error');
        }
    };

    const reset = () => {
        setDeleteMany([]);
        setShowTrash(false);
        setToggleCleared(!toggleCleared);
        setShowConfirmDeleteMany({ show: false, confirm: false });
    };

    const handleValidation = async () => {
        const errorList = {};

        if (isEmpty(fields.name)) errorList.name = 'Name is required';
        if (isEmpty(fields.price)) errorList.price = 'Price is required';
        else if (!Number(fields.price)) errorList.price = 'Price is invalid';

        setErrors(errorList);

        return Object.keys(errorList).length === 0;
    };

    const handleSubmit = async () => {
        if (handleValidation()) {
            console.log('Payload', fields);
            try {
                const url = 'http://localhost:5058/additionalFee';
                const response = await axios.post(url, fields);
                if (response.status === 201) {
                    await fetchAdditionalFees();
                    setShowAddForm(false);
                    setFields({ name: '', price: '', receiptId: fields.receiptId });
                    showToast('Service added successfully', 'success');
                }
            } catch (error) {
                console.log(error.message);
                showToast("There's something wrong while adding service", 'error');
            }
        }
    };

    const handleFieldChange = (key, value) => {
        setFields((prev) => {
            return { ...prev, [key]: value };
        });
    };

    const handleFieldInput = (key) => {
        setErrors((prev) => {
            return { ...prev, [key]: '' };
        });
    };

    return (
        <div className="mx-5 shadow">
            {/* Overlay */}
            <Overlay isShow={onShow} onClose={onClose} />

            {ToastContainer}
            <div
                className="d-flex flex-column gap-2 bg-white animation-effect"
                style={{
                    maxWidth: '70rem',
                    width: '82%',
                    height: 'auto',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    zIndex: 20,
                    transform: 'translate(-50%, -50%)',
                    padding: '1.4rem 2rem 2rem 2rem',
                }}
            >
                <div className="d-flex flex-column gap-3">
                    <IoClose
                        size={30}
                        className="rounded-circle cursor-pointer p-1 additionalFee-button-hover animation-effect"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: '-36px',
                            padding: '.5rem',
                            backgroundColor: '#35776d',
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            onClose();
                            setShowAddForm(false);
                            setFields({ name: '', price: '', receiptId: fields.receiptId });
                        }}
                    />
                    <button
                        className="additionalFee-button-hover animation-effect rounded-pill"
                        style={{
                            position: 'absolute',
                            top: '36px',
                            right: '-34px',
                            padding: '.5rem',
                            backgroundColor: '#35776d',
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => setShowAddForm(true)}
                    >
                        A <br />
                        A <br />
                        D <br />
                    </button>
                </div>

                {/* Add Form */}
                {showAddForm && (
                    <div className="d-flex flex-column gap-3 mb-3">
                        <FormGroup
                            label="Name"
                            id="name"
                            name="name"
                            placeHolder="Name"
                            type="text"
                            error={errors?.name}
                            // Icon={MdOutlineEmail}
                            value={fields?.name}
                            customParentInputStyle="p-1 pe-3 rounded-2 additionalFee-input-focus animation-effect"
                            customParentParentInputStyle=""
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            onInput={() => handleFieldInput('name')}
                        />
                        <FormGroup
                            label="Price"
                            id="price"
                            name="price"
                            placeHolder="Price"
                            type="text"
                            error={errors?.price}
                            // Icon={MdOutlineEmail}
                            value={fields?.price}
                            customParentInputStyle="p-1 pe-3 rounded-2 additionalFee-input-focus animation-effect"
                            customParentParentInputStyle=""
                            onChange={(e) => handleFieldChange('price', e.target.value)}
                            onInput={() => handleFieldInput('price')}
                        />
                        <div className="d-flex flex-wrap align-items-center gap-3">
                            <button
                                className="p-2 flex-grow-1 rounded-2"
                                style={{
                                    backgroundColor: '#35776d',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    border: '1px solid #35776d',
                                }}
                                onClick={handleSubmit}
                            >
                                Add
                            </button>
                            <button
                                className="p-2 primary-bg-color primary-bg-color-hover border flex-grow-1 rounded-2"
                                onClick={() => {
                                    setShowAddForm(false);
                                    setFields({ name: '', price: '', receiptId: fields.receiptId });
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Data table */}
                <div className="d-flex align-items-center justify-content-start gap-3">
                    {showTrash && (
                        <BsTrash
                            size={30}
                            className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                            style={{
                                backgroundColor: '#35776d',
                                color: '#fff',
                            }}
                            onClick={() => setShowConfirmDeleteMany({ show: true, confirm: false })}
                        />
                    )}
                    <h5 className="m-0">Additional Fees</h5>
                </div>
                <DataTable
                    pagination
                    selectableRows
                    clearSelectedRows={toggleCleared}
                    selectableRowDisabled={(row) => React.isValidElement(row.name)}
                    onSelectedRowsChange={handleSelectedRowsChange}
                    columns={columns}
                    data={additionalFees}
                    customStyles={customStyles}
                />

                {/* Show confirmation when clicking on delete a user*/}
                {showConfirmDeleteMany.show && (
                    <ConfirmPopup
                        header="Are you sure you want to delete the selected Additional Fees?"
                        message="This action cannot be undone."
                        negativeChoice="Cancel"
                        positiveChoice="Delete"
                        customCloseBtn={{
                            backgroundColor: '#35776d',
                            color: '#fff',
                        }}
                        customePositiveChoiceBtn={{
                            backgroundColor: '#35776d',
                            color: '#fff',
                        }}
                        isShow={showConfirmDeleteMany.show}
                        onYes={() => handleDeleteRowsSelected()}
                        onClose={reset}
                    />
                )}
            </div>
        </div>
    );
};

export default AdditionalFeeForm;
