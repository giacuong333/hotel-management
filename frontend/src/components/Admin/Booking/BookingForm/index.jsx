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
import { isEmail, isEmpty, isPhoneNumber, isValidDate, isVerifyPassword } from '~/utils/formValidation';
import { useRoom } from '~/providers/RoomProvider';

const BookingForm = ({ data, type, onClose, onUserAdded, onUserUpdated, isShowed }) => {
    const [fields, setFields] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        checkIn: new Date(),
        checkOut: '',
        roomId: '',
    });
    const [errors, setErrors] = useState({});
    const [emptyRooms, setEmptyRooms] = useState([]);
    const { rooms, roomError, roomLoading } = useRoom();

    console.log('fields ', fields);

    // Fetch rooms
    useEffect(() => {
        setEmptyRooms(() => {
            const newRooms = rooms
                .filter((room) => room?.id && room?.name)
                .map((room) => {
                    return { label: room?.name, value: room?.id };
                });
            newRooms.unshift({ label: '-- Select Room --', value: '' });
            return newRooms;
        });
    }, [rooms]);

    // Reset form fields whenever `type` or `data` changes
    // useEffect(() => {
    //     setFields({});
    //     setErrors({});
    // }, [type, data]);

    const handleValidation = () => {
        const errors = {};

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmitClicked = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            const payload = { ...fields };
            try {
                const url = 'http://localhost:5058/booking';
                if (type === 'add') {
                    const response = await axios.post(`${url}/register`, payload);
                    console.log(response);
                    if (response?.status === 201) {
                        showToast('User created successfully', 'success');
                        setTimeout(handleClose, 4000);
                        onUserAdded(response?.data?.newUser);
                    }
                } else if (type === 'edit') {
                    const response = await axios.put(`${url}/${data?.id}`, payload);
                    console.log(response);
                    if (response?.status === 200) {
                        showToast(response?.data?.obj?.message, 'success');
                        setTimeout(handleClose, 4000);
                        onUserUpdated(response?.data?.obj?.currentUser);
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
        setFields({});
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
                        <IoClose
                            size={28}
                            className="cursor-pointer btn-close-hover p-1 rounded-circle"
                            onClick={handleClose}
                        />
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
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            onInput={() => handleFieldInput('name')}
                            // onBlur={() => handleValidation()}
                        />
                        <FormGroup
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            error={errors.email}
                            Icon={MdOutlineEmail}
                            value={fields?.email}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            onInput={() => handleFieldInput('email')}
                            // onBlur={() => handleValidation()}
                        />
                        <FormGroup
                            label="Phone number"
                            id="phonenumber"
                            name="phoneNumber"
                            type="text"
                            error={errors.phoneNumber}
                            Icon={FiPhone}
                            value={fields?.phoneNumber}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                            onInput={() => handleFieldInput('phoneNumber')}
                            // onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Check-in Date"
                            id="checkIn"
                            name="checkIn"
                            type="datetime"
                            error={errors.checkIn}
                            // Icon={icon}
                            value={fields?.checkIn}
                            disabled={type === 'see'}
                            customInputStyle="py-2 cursor-pointer"
                            customParentInputStyle="p-1 px-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(date) => {
                                handleFieldChange('checkIn', date);
                                handleFieldInput('checkIn');
                            }}
                            // onSelect={() => handleFieldInput('dob')}
                            // onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Check-out Date"
                            id="checkOut"
                            name="checkOut"
                            type="datetime"
                            error={errors.checkOut}
                            // Icon={icon}
                            value={fields?.checkOut}
                            disabled={type === 'see'}
                            customInputStyle="py-2 cursor-pointer"
                            customParentInputStyle="p-1 px-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(date) => {
                                handleFieldChange('checkOut', date);
                                handleFieldInput('checkOut');
                            }}
                            // onSelect={() => handleFieldInput('dob')}
                            // onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Room"
                            id="roomId"
                            name="roomId"
                            type="select"
                            error={errors.roomId}
                            // Icon={icon}
                            value={fields?.roomId}
                            disabled={type === 'see'}
                            options={emptyRooms}
                            customInputStyle="cursor-pointer"
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => {
                                handleFieldChange('roomId', e.target.value);
                                handleFieldInput('roomId');
                            }}
                            // onSelect={() => handleFieldInput('gender')}
                            // onBlur={handleInputBlured}
                        />
                        {type === 'see' && (
                            <FormGroup
                                label="Create time"
                                id="createdAt"
                                name="createdAt"
                                type="text"
                                // error={error}
                                // Icon={icon}
                                value={type !== 'add' ? data?.createdAt : ''}
                                disabled={type === 'see'}
                                customInputStyle="pe-none"
                                customParentInputStyle="p-1 pe-3 rounded-2"
                                customParentParentInputStyle="mt-2"
                            />
                        )}
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

export default BookingForm;
