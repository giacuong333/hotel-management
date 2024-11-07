import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import FormGroup from '~/components/FormGroup';
import Overlay from '~/components/Overlay';
import Button from 'react-bootstrap/Button';
import ToastContainer, { showToast } from '~/utils/showToast';
import { isEmpty } from '~/utils/formValidation';

import { FaRegUser } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

const DiscountForm = ({ data, type, onClose, onDiscountAdded, onDiscountUpdated, isShowed }) => {
    const [pendingSubmit, setPendingSubmit] = useState(false);

    const [fields, setFields] = useState({
        name: data?.name || '',
        value: data?.value || '',
        status: data?.status || '',
        startAt: data?.startAt || '',
        endAt: data?.endAt || '',
    });

    const [errors, setErrors] = useState({});

    // Reset form fields whenever `type` or `data` changes
    useEffect(() => {
        setFields({
            name: data?.name || '',
            value: data?.value || '',
            status: data?.status || '',
            startAt: data?.startAt || '',
            endAt: data?.endAt || '',
        });
        setErrors({});
    }, [type, data]);

    const handleValidation = () => {
        const validationErrors = {};

        if (isEmpty(fields.name)) validationErrors.name = 'Name is required';
        if (isEmpty(fields.value)) validationErrors.value = 'Value is required';
        if (isNaN(fields.status)) validationErrors.status = 'status is required';
        if (isEmpty(fields.startAt)) validationErrors.startAt = 'Start At is required';
        if (isEmpty(fields.endAt)) validationErrors.endAt = 'End At is required';

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };
    const handleSubmitClicked = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const payload = {
                ...fields,
                startAt: fields.startAt ? new Date(fields.startAt).toISOString().split('.')[0] : null,
                endAt: fields.endAt ? new Date(fields.endAt).toISOString().split('.')[0] : null,

            };
            const url = 'http://localhost:5058/discount';
            const headers = { headers: { 'Content-Type': 'application/json' } };
            try {
                setPendingSubmit(true);
                if (type === 'add') {
                    const response = await axios.post(`${url}/`, payload, headers);
                    console.log(response);
                    if (response?.status === 200) {
                        showToast('Discount created successfully', 'success');
                        setTimeout(handleClose, 3000);
                        onDiscountAdded(response?.data?.newUser);
                    }
                } else if (type === 'edit') {
                    const response = await axios.put(`${url}/${data?.id}`, payload, headers);
                    if (response?.status === 200) {
                        showToast('Discount updated successfully', 'success');
                        setTimeout(handleClose, 3000);
                        onDiscountUpdated(response?.data?.currentUser);
                    }
                }
            } catch (error) {
                if (error?.response?.status === 409) {
                    showToast(error?.response?.data?.message, 'error');
                } else {
                    showToast(error?.message, 'error');
                }
                console.log(error);
            } finally {
                setPendingSubmit(false);
            }
        }
    };

    const handleClose = useCallback(() => {
        setErrors({});
        setFields({
            name: '',
            value: '',
            status: '',
            startAt: '',
            endAt: '',
        });
        onClose();
    }, [onClose]);

    const handleFieldInput = useCallback((field) => {
        return (event) => {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: '',
            }));
            const value = event.target.value;
            setFields((prevFields) => ({
                ...prevFields,
                [field]: field === 'status' ? (value === '1' ? true : false) : value,
            }));
        };
    }, []);

    return (
        <>
            {ToastContainer}
            <Overlay isShow={isShowed} onClose={handleClose} />
            <div
                style={{
                    width: '500px',
                    height: '550px',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    zIndex: 20,
                    transform: 'translate(-50%, -50%)',
                    padding: '0 1rem',
                }}
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
                        <IoClose size={28} className="cursor-pointer" onClick={handleClose} />
                    </div>
                    <div
                        className="hide-scrollbar w-full h-full pb-4"
                        style={{
                            overflowY: 'scroll',
                        }}
                    >
                        <FormGroup
                            label="Name"
                            id="name"
                            name="name"
                            type="text"
                            error={errors.name}
                            Icon={FaRegUser}
                            value={fields?.name}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onInput={handleFieldInput('name')}
                        />
                        <FormGroup
                            label="Value"
                            id="value"
                            name="value"
                            type="text"
                            error={errors.value}
                            Icon={FaRegUser}
                            value={fields?.value}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onInput={handleFieldInput('value')}
                        />
                        <FormGroup
                            label="Status"
                            id="status"
                            name="Status"
                            type="select"
                            error={errors.status}
                            Icon={FaRegUser}
                            value={fields?.status ? '1' : '0'}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onInput={handleFieldInput('status')}
                            options={[
                                { value: '0', label: 'unActive' },
                                { value: '1', label: 'Active' },
                            ]}
                        />
                        <FormGroup
                            label="Start At"
                            id="startAt"
                            name="startAt"
                            type="date"
                            error={errors.startAt}
                            value={fields?.startAt}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onInput={handleFieldInput('startAt')}
                        />
                        <FormGroup
                            label="End At"
                            id="endAt"
                            name="endAt"
                            type="date"
                            error={errors.endAt}
                            value={fields?.endAt}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onInput={handleFieldInput('endAt')}
                        />
                        {type !== 'see' && (
                            <div className="d-flex align-items-center gap-2 mt-4">
                                <Button
                                    type="submit"
                                    variant="outline-secondary"
                                    className={`w-full p-2 primary-bg-color primary-bg-color-hover border`}
                                    onClick={handleClose}
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
            </div>
        </>
    );
};

export default DiscountForm;
