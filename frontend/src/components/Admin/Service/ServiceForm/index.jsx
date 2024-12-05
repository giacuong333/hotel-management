import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { IoClose } from 'react-icons/io5';
import FormGroup from '~/components/FormGroup';
import Overlay from '~/components/Overlay';

import { FaRegUser } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { MdLockOutline } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import ToastContainer, { showToast } from '~/utils/showToast';
import Button from 'react-bootstrap/Button';
import {
    isEmail,
    isEmpty,
    isPhoneNumber,
    isValidDate,
    isVerifyPassword,
    isNumberAndGreaterThanOrEqual,
} from '~/utils/formValidation';
import formatCurrency from '~/utils/currencyPipe';
const PopupPanel = ({ data, type, onClose, onServiceAdded, onServiceUpdated, isShowed }) => {
    const [fields, setFields] = useState({
        name: data?.name || '',
        price: data?.price || '',
        status: data?.status || '',
    });

    const [errors, setErrors] = useState({});
    // Reset form fields whenever `type` or `data` changes
    useEffect(() => {
        setFields({
            name: data?.name || '',
            price: data?.price || '',
            status: data?.status || '',
        });
        console.log('Data Status:', data?.status);
        console.log('Fields Price:', fields?.price);
        console.log('Fields Status:', fields?.status);
        setErrors({});
    }, [type, data]);

    const handleValidation = () => {
        const validationErrors = {};

        if (isEmpty(fields.name)) {
            validationErrors.name = 'Name is required';
        } else if (fields.name.trim().length <= 5) {
            validationErrors.name = 'Name must be more than 5 characters';
        }
        if (isEmpty(fields.price)) {
            validationErrors.email = 'price is required';
        } else if (!isNumberAndGreaterThanOrEqual(fields.price, 1000)) {
            validationErrors.price = 'Price must be a number and greater than or equal to 1000';
        }
        if (isEmpty(fields.status)) validationErrors.status = 'Role is required';

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmitClicked = async (e) => {
        e.preventDefault();

        const apiUrl = 'http://localhost:5058/service';

        if (handleValidation()) {
            const payload = { ...fields };

            try {
                if (type === 'add') {
                    const response = await axios.post(`${apiUrl}/`, payload);
                    console.log(response);
                    if (response?.status === 201) {
                        showToast('Service created successfully', 'success');
                        setTimeout(handleClose, 4000);
                        onServiceAdded(response?.data?.newService);
                    }
                } else if (type === 'edit') {
                    const response = await axios.put(`${apiUrl}/${data?.id}`, payload);
                    console.log(response);
                    if (response?.status === 200) {
                        showToast(response?.data?.message, 'success');
                        setTimeout(handleClose, 4000);
                        onServiceUpdated(response?.data?.currentService);
                    }
                }
            } catch (error) {
                if (error?.status === 409) {
                    showToast(error?.response?.data?.obj?.message, 'error');
                } else {
                    showToast(error?.message, 'error');
                }
                console.log(error);
            }
        }
    };

    const handleClose = () => {
        setErrors({});
        setFields({
            name: '',
            price: '',
            status: '',
        });
        onClose();
    };

    const handleFieldChange = (field, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [field]: value,
        }));
    };

    const handleFieldInput = (field) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: '',
        }));
    };

    return (
        <>
            <Overlay isShow={isShowed} onClose={onClose} />
            <div
                style={{
                    maxWidth: '600px',
                    width: '90%',
                    height: '550px',
                    padding: '0 1rem',
                }}
                className={`confirm-popup ${isShowed ? 'show' : 'hide'}`}
            >
                <form
                    className="w-full h-full"
                    style={{
                        backgroundColor: '#fff',
                        padding: '2rem',
                        borderRadius: '1rem',
                    }}
                >
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="fw-semibold fs-5 text-start text-capitalize">Details</p>
                        <IoClose size={28} className="cursor-pointer" onClick={onClose} />
                    </div>
                    <div
                        className="hide-scrollbar w-full h-full pb-4"
                        style={{
                            overflowY: 'scroll',
                        }}
                    >
                        <FormGroup
                            label="Name:"
                            id="name"
                            name="name"
                            type="text"
                            error={errors.name}
                            value={fields?.name}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            onInput={() => handleFieldInput('name')}
                        />
                        <FormGroup
                            label="Price:"
                            id="price"
                            name="price"
                            type="text"
                            error={errors.price}
                            // value={type !== 'add' ? data?.price : ''}
                            value={type === 'see' ? formatCurrency(fields?.price) : fields?.price}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('price', e.target.value)}
                            onInput={() => handleFieldInput('price')}
                        />

                        <FormGroup
                            label="Status:"
                            id="status"
                            name="status"
                            type="select"
                            error={errors.status}
                            // value={type !== 'add' ? data?.status : ''}
                            value={fields?.status}
                            disabled={type === 'see'}
                            options={[
                                { label: 'Active', value: 1 },
                                { label: 'InActive', value: 2 },
                            ]}
                            customInputStyle="cursor-pointer"
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => {
                                handleFieldChange('status', Number(e.target.value));
                                handleFieldInput('status');
                            }}
                        />

                        {(type === 'add' || type === 'edit') && (
                            <div className="d-flex align-items-center gap-2 mt-4">
                                <Button
                                    type="submit"
                                    variant="outline-secondary"
                                    className={`w-full p-2 primary-bg-color primary-bg-color-hover border`}
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className={`w-full p-2 customer-primary-button`}
                                    onClick={handleSubmitClicked}
                                >
                                    Submit
                                </Button>
                            </div>
                        )}
                    </div>
                </form>
                {console.log('Status ROle' + fields?.status)}
            </div>
        </>
    );
};

export default PopupPanel;
