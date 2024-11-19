import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FormGroup from '~/components/FormGroup';
import DataTable from 'react-data-table-component';
import { IoClose } from 'react-icons/io5';
import Overlay from '~/components/Overlay';
import formatCurrency from '~/utils/currencyPipe';
import { isEmpty } from '~/utils/formValidation';
import ToastContainer, { showToast } from '~/utils/showToast';
import { BsTrash } from 'react-icons/bs';
import ConfirmPopup from '~/components/ConfirmPopup';

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
        name: 'Quantity',
        selector: (row) => row.quantity,
        center: true,
    },
    {
        name: 'Price',
        selector: (row) => row.formattedPrice,
    },
];

const ServicesUsedForm = ({ receiptId, bookingId, onShow, onClose }) => {
    const [servicesUsed, setServicesUsed] = useState([]);
    const [services, setServices] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showTrash, setShowTrash] = useState(false);
    const [deleteMany, setDeleteMany] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [showConfirmDeleteMany, setShowConfirmDeleteMany] = useState({ show: false, confirm: false });
    const [fields, setFields] = useState({ bookingId, serviceId: null, receiptId, quantity: 1 });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        receiptId && fetchServicesUsed();
    }, []);

    useEffect(() => {
        showAddForm && fetchServices();
    }, [showAddForm]);

    useEffect(() => {}, [showTrash]);

    const fetchServicesUsed = async () => {
        try {
            const currentReceiptId = receiptId || fields.receiptId;
            const url = `http://localhost:5058/receipt/${currentReceiptId}`;
            const response = await axios.get(url);
            if (response?.status === 200) {
                let data = response?.data?.booking?.serviceUsage?.$values;
                console.log('Response', response);
                let total = 0;
                data = data.map((s) => {
                    s.service.formattedPrice = formatCurrency(s.service.price);
                    total += s.service.price * s.quantity;
                    return { ...s.service, id: s.id, quantity: s.quantity };
                });
                data.push({
                    key: 'total',
                    name: <h5>Total</h5>,
                    formattedPrice: <h5>{formatCurrency(total)}</h5>,
                });
                console.log('Table', data);
                setServicesUsed(data);
            }
        } catch (error) {
            console.log('Error while fetching services used', error);
            showToast("There's something wrong when fetching used service", 'error');
        }
    };

    const fetchServices = async () => {
        try {
            const url = `http://localhost:5058/service/active`;
            const response = await axios.get(url);
            if (response?.status === 200) {
                let data = response.data?.$values.map((s) => {
                    return { label: `${s.name} - ${formatCurrency(s.price)}`, value: s.id };
                });
                setServices(data);
            }
        } catch (error) {
            console.log('Error while fetching services used', error);
            showToast("There's something wrong when fetching services", 'error');
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
            const url = 'http://localhost:5058/serviceUsage';
            const response = await axios.delete(url, {
                data: deleteMany,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                reset();
                await fetchServicesUsed();
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

    const handleValidation = () => {
        const errorList = {};

        if (isEmpty(fields.serviceId)) errorList.serviceId = 'Service is required';
        if (!Number(fields.quantity)) errorList.quantity = 'Quantity is invalid';

        setErrors(errorList);

        return Object.keys(errorList).length === 0;
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

    const handleSubmit = async () => {
        if (handleValidation()) {
            try {
                const url = 'http://localhost:5058/serviceUsage';
                const response = await axios.post(url, fields);
                if (response.status === 201) {
                    setShowAddForm(false);
                    await fetchServicesUsed();
                    setFields({ bookingId, serviceId: null, receiptId: fields.receiptId, quantity: 1 });
                    showToast('Service added successfully', 'success');
                }
            } catch (error) {
                console.log(error);
                showToast("There's something wrong while adding service", 'error');
            }
        }
    };

    return (
        <div className="px-5 mx-5 shadow">
            {/* Toast */}
            {ToastContainer}

            <Overlay isShow={onShow} onClose={onClose} />
            <div
                className="d-flex flex-column gap-2 bg-white"
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
                {/* Add and Close */}
                <div className="d-flex flex-column gap-3">
                    <IoClose
                        size={30}
                        className="rounded-circle cursor-pointer p-1 additionalFee-button-hover animation-effect"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: '-36px',
                            zIndex: 10,
                            padding: '.5rem',
                            backgroundColor: '#35776d',
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            onClose();
                            setShowAddForm(false);
                            setFields({ bookingId: null, serviceId: null, receiptId: null, quantity: 1 });
                        }}
                    />
                    <button
                        className="additionalFee-button-hover animation-effect rounded-pill"
                        style={{
                            position: 'absolute',
                            top: '36px',
                            right: '-34px',
                            zIndex: 10,
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
                            label="Service"
                            id="service"
                            name="service"
                            type="select"
                            error={errors?.serviceId}
                            // Icon={icon}
                            value={fields?.serviceId}
                            options={services}
                            customInputStyle="cursor-pointer"
                            customParentInputStyle="p-1 pe-3 rounded-2 additionalFee-input-focus animation-effect"
                            customParentParentInputStyle=""
                            onChange={(e) => handleFieldChange('serviceId', e.target.value)}
                            onInput={() => handleFieldInput('serviceId')}
                        />
                        <FormGroup
                            label="Quantity"
                            id="quantity"
                            name="quantity"
                            type="text"
                            error={errors?.quantity}
                            // Icon={FiPhone}
                            value={fields?.quantity}
                            customParentInputStyle="p-1 pe-3 rounded-2 additionalFee-input-focus animation-effect"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('quantity', e.target.value)}
                            onInput={() => handleFieldInput('quantity')}
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
                                    setFields({ bookingId, serviceId: null, receiptId: fields.receiptId, quantity: 1 });
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
                    <h5 className="m-0">Services Used</h5>
                </div>
                <DataTable
                    pagination
                    selectableRows
                    clearSelectedRows={toggleCleared}
                    selectableRowDisabled={(row) => React.isValidElement(row.name)}
                    onSelectedRowsChange={handleSelectedRowsChange}
                    columns={columns}
                    data={servicesUsed}
                    customStyles={customStyles}
                />

                {/* Show confirmation when clicking on delete a user*/}
                {showConfirmDeleteMany.show && (
                    <ConfirmPopup
                        header="Are you sure you want to delete the selected Services Used?"
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

export default ServicesUsedForm;
