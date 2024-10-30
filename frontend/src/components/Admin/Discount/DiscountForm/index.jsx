import React, { useEffect, useState } from 'react';
import axios from 'axios';

import FormGroup from '~/components/FormGroup';
import Overlay from '~/components/Overlay';
import Button from 'react-bootstrap/Button';
import ToastContainer, { showToast } from '~/utils/showToast';

import { FaRegUser } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { MdLockOutline } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

import { useRole } from '~/providers/RoleProvider';
import Discount from './index';

const DiscountForm = ({ data, type, onClose, onUserAdded, onUserUpdated, isShowed }) => {
    
    const [fields, setFields] = useState({
        name: data?.name || '',
        value: data?.value || '',
        startAt: data?.startAt || '',
        endAt: data?.endAt || '',
    });
    
    const [errors, setErrors] = useState({});
   
    // Reset form fields whenever `type` or `data` changes
    useEffect(() => {
        setFields({
            name: data?.name || '',
            value: data?.value || '',
            startAt: data?.startAt || '',
            endAt: data?.endAt || '',
        });
        setErrors({});
    }, [type, data]);

   

    const handleSubmitClicked = async (e) => {
        e.preventDefault();
        
    };
    
    const handleClose = () => {
        setErrors({});
        setFields({
            name: '',
            value: '',
            startAt: '',
            endAt: '',
        });
        onClose();
    };

    const handleFieldInput = (field) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: '',
        }));
    };

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
