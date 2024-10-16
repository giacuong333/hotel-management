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
import { isEmail, isEmpty, isPhoneNumber, isValidDate, isVerifyPassword } from '~/utils/formValidation';
const PopupPanel = ({ data, type, onClose, onUserAdded, onUserUpdated, isShowed }) => {
    const [fields, setFields] = useState({
        name: data?.name || '',
    });
    const [errors, setErrors] = useState({});
    // Reset form fields whenever `type` or `data` changes
    useEffect(() => {
        setFields({
            name: data?.name || '',
        });
        setErrors({});
    }, [type, data]);

    const handleValidation = () => {
        const validationErrors = {};

        if (isEmpty(fields.name)) validationErrors.name = 'Name is required';

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmitClicked = async (e) => {
        e.preventDefault();

        const apiUrl = 'http://localhost:5058/role';

        if (handleValidation()) {
            const payload = { ...fields };

            try {
                if (type === 'add') {
                    const response = await axios.post(`${apiUrl}/`, payload);
                    console.log(response);
                    if (response?.status === 201) {
                        showToast('Role created successfully', 'success');
                        setTimeout(handleClose, 4000);
                        onUserAdded(response?.data?.newRole);
                    }
                } else if (type === 'edit') {
                    const response = await axios.put(`${apiUrl}/${data?.id}`, payload);
                    console.log(response);
                    if (response?.status === 200) {
                        showToast(response?.data?.obj?.message, 'success');
                        setTimeout(handleClose, 4000);
                        onUserUpdated(response?.data?.obj?.currentRole);
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
        });
        onClose();
    };

    

    const handleInputChanged = () => {};

    const handleInputBlured = () => {};

    const handleInputTyped = () => {};

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
                            Icon={FaRegUser}
                            value={fields?.name}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            onInput={() => handleFieldInput('name')}
                        />

                        {type !== 'see' && (
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
            </div>
        </>
    );
};

export default PopupPanel;
