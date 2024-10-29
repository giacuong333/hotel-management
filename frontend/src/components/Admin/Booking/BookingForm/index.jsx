import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormGroup from '~/components/FormGroup';
import Overlay from '~/components/Overlay';
import Button from 'react-bootstrap/Button';
import ToastContainer, { showToast } from '~/utils/showToast';
import { FaRegUser } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { isEmail, isEmpty, isMinimunBookingDay, isPhoneNumber, isValidDate } from '~/utils/formValidation';
import { RotatingLines } from 'react-loader-spinner';
import { useRoom } from '~/providers/RoomProvider';
import { useService } from '~/providers/Service';
import formatCurrency from '~/utils/currencyPipe';

const BookingForm = ({ data, type, onClose, onBookingAdded, isShowed }) => {
    const [fields, setFields] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        checkIn: new Date(),
        checkOut: '',
        roomId: '',
        serviceId: '',
    });
    const [errors, setErrors] = useState({});
    const [emptyRooms, setEmptyRooms] = useState([]);
    const [activeServices, setActiveServices] = useState([]);
    const [bookedDateList, setBookedDateList] = useState([]);
    const [pendingSubmit, setPendingSubmit] = useState(false);
    const { rooms } = useRoom();
    const { services } = useService();

    // Fetch booked dates
    useEffect(() => {
        const fetchBookedDateList = async () => {
            const abortController = new AbortController();
            try {
                const response = await axios.get('http://localhost:5058/booking/bookedDates');
                console.log('response', response);
                if (response?.status === 200) {
                    // Chỗ này data chưa có giá trị
                    const data = response?.data?.$values.map((item) => ({
                        CheckIn: item.CheckIn,
                        CheckOut: item.CheckOut,
                    }));
                    setBookedDateList(data);
                }
            } catch (err) {
                console.error('Failed to fetch booked dates:', err);
                setBookedDateList(null);
            }
            return () => abortController.abort();
        };

        type === 'add' && fetchBookedDateList();
    }, [type]);

    // Fetch services
    useEffect(() => {
        setActiveServices(() => {
            const newActiveServices = services
                .filter((service) => service?.id && service?.name)
                .map((service) => {
                    return { label: `${service?.name} - ${formatCurrency(service?.price)}`, value: service?.id };
                });
            return newActiveServices;
        });
    }, [services]);

    // Fetch empty rooms
    useEffect(() => {
        setEmptyRooms(() => {
            const newRooms = rooms
                .filter((room) => room?.id && room?.name)
                .map((room) => {
                    return { label: `${room?.name} - ${room?.bedNum}`, value: room?.id };
                });
            return newRooms;
        });
    }, [rooms]);

    // Reset form fields whenever `type` or `data` changes
    useEffect(() => {
        setFields({});
        setErrors({});
    }, [type, data]);

    const handleValidation = () => {
        const errors = {};

        if (isEmpty(fields.name)) errors.name = 'Name is required';
        if (isEmpty(fields.email)) errors.email = 'Email is required';
        else if (!isEmail(fields.email)) errors.email = 'Email is invalid';
        if (isEmpty(fields.phoneNumber)) errors.phoneNumber = 'Phone number is required';
        else if (!isPhoneNumber(fields.phoneNumber)) errors.phoneNumber = 'Phone number is invalid';
        if (!isValidDate(fields.checkIn)) errors.checkIn = 'Check-in date is invalid';
        if (!isValidDate(fields.checkOut)) errors.checkOut = 'Check-out date is invalid';

        if (isEmpty(fields.roomId)) errors.roomId = 'Room is not selected';
        if (!isMinimunBookingDay(fields.checkIn, fields.checkOut)) {
            errors.isCheckInLessThanCheckOut = 'Booking date is at least 1 day.';
            showToast(errors.isCheckInLessThanCheckOut, 'error');
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmitClicked = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            const payload = { ...fields };
            try {
                setPendingSubmit(true);
                // const url = 'http://localhost:5058/booking';
                // if (type === 'add') {
                //     const response = await axios.post(`${url}/register`, payload);
                //     console.log(response);
                //     if (response?.status === 201) {
                //         showToast('User created successfully', 'success');
                //         setTimeout(handleClose, 4000);
                //         onBookingAdded(response?.data?.newUser);
                //     }
                // } else if (type === 'edit') {
                //     setPendingSubmit(true);
                //     const response = await axios.put(`${url}/${data?.id}`, payload);
                //     console.log(response);
                //     if (response?.status === 200) {
                //         showToast(response?.data?.obj?.message, 'success');
                //         setTimeout(handleClose, 4000);
                //         onUserUpdated(response?.data?.obj?.currentUser);
                //     }
                // }
            } catch (error) {
                showToast(
                    error?.response?.data || error?.response?.data?.message || 'Error occured while creating booking',
                    'error',
                );
                console.log(error);
            } finally {
                setPendingSubmit(false);
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
    console.log('Booked date list', bookedDateList);
    const isDateDisabled = ({ activeStartDate, date, view }) => {
        if (view === 'month') {
            return bookedDateList.some(
                (booking) => (date) => new Date(booking.CheckIn) && date <= new Date(booking.Checkout),
            );
        }
        return false;
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
                            isDateDisabled={isDateDisabled}
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
                            isDateDisabled={isDateDisabled}
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
                        <FormGroup
                            label="Services"
                            id="serviceId"
                            name="serviceId"
                            type="select"
                            error={errors.serviceId}
                            // Icon={icon}
                            value={fields?.serviceId}
                            disabled={type === 'see'}
                            options={activeServices}
                            customInputStyle="cursor-pointer"
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => {
                                handleFieldChange('serviceId', e.target.value);
                                handleFieldInput('serviceId');
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
                                    className={`w-full p-2 customer-primary-button ${pendingSubmit ? 'pe-none' : ''}`}
                                    onClick={handleSubmitClicked}
                                >
                                    {pendingSubmit ? (
                                        <RotatingLines
                                            visible={true}
                                            height="20"
                                            width="20"
                                            strokeColor="#ffffff"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            ariaLabel="rotating-lines-pendingSubmit"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    ) : (
                                        'Submit'
                                    )}
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
