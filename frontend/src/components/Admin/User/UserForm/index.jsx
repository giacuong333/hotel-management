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
import { isEmail, isEmpty, isPhoneNumber, isValidDate, isVerifyPassword } from '~/utils/formValidation';
import { RotatingLines } from 'react-loader-spinner';

const UserForm = ({ data, type, onClose, onUserAdded, onUserUpdated, isShowed }) => {
    const { roles, fetchRoles } = useRole();
    const [fields, setFields] = useState({
        name: data?.name || '',
        email: data?.email || '',
        password: data?.password || '',
        retypePassword: '',
        phoneNumber: data?.phoneNumber || '',
        gender: data?.gender || '',
        dob: data?.dob ? new Date(data?.dob) : null,
        roleId: data?.roleId || '',
    });
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [errors, setErrors] = useState({});
    const [pendingSubmit, setPendingSubmit] = useState(false);

    useEffect(() => {
        fetchRoles();
    }, []);

    // Reset form fields whenever `type` or `data` changes
    useEffect(() => {
        setFields({
            name: data?.name || '',
            email: data?.email || '',
            password: '',
            retypePassword: '',
            phoneNumber: data?.phoneNumber || '',
            gender: data?.gender || '',
            dob: data?.dob ? new Date(data?.dob) : null,
            roleId: data?.roleId || '',
        });
        setErrors({});
    }, [type, data]);

    const handleValidation = () => {
        const validationErrors = {};

        if (isEmpty(fields.name)) validationErrors.name = 'Name is required';
        if (isEmpty(fields.email)) validationErrors.email = 'Email is required';
        else if (!isEmail(fields.email)) validationErrors.email = 'Email is invalid';
        if (isEmpty(fields.password) && type === 'add') validationErrors.password = 'Password is required';
        if (!isVerifyPassword(fields.password, fields.retypePassword))
            validationErrors.retypePassword = 'Password does not match';
        if (isEmpty(fields.phoneNumber)) validationErrors.phoneNumber = 'Phone number is required';
        else if (!isPhoneNumber(fields.phoneNumber)) validationErrors.phoneNumber = 'Phone number is invalid';
        if (isEmpty(fields.gender)) validationErrors.gender = 'Gender is required';
        if (!isValidDate(fields.dob)) validationErrors.dob = 'Date of birth is required';
        if (isEmpty(fields.roleId)) validationErrors.roleId = 'Role is required';

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmitClicked = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            let timeoutId;
            const payload = {
                ...fields,
                dob: fields.dob ? fields.dob.toISOString().split('.')[0] : null, // Converting to YYYY-MM-DD format
            };
            console.log('Payload: ', payload);
            const url = 'http://localhost:5058/user';
            const headers = { headers: { 'Content-Type': 'application/json' } };
            try {
                if (type === 'add') {
                    setPendingSubmit(true);
                    const response = await axios.post(`${url}/register`, payload, headers);
                    if (response?.status === 201) {
                        showToast('User created successfully', 'success');
                        timeoutId = setTimeout(handleClose, 4000);
                        onUserAdded(response?.data?.newUser);
                    }
                } else if (type === 'edit') {
                    setPendingSubmit(true);
                    const response = await axios.put(`${url}/${data?.id}`, payload, headers);
                    console.log('User edit response: ', response);
                    if (response?.status === 200) {
                        showToast('User updated successfully', 'success');
                        timeoutId = setTimeout(handleClose, 4000);
                        onUserUpdated(response?.data?.currentUser);
                    }
                }
            } catch (error) {
                if (error?.status === 409) {
                    showToast(error?.response?.data?.message, 'error');
                } else {
                    showToast(error?.message, 'error');
                }
                console.log(error);
            } finally {
                setPendingSubmit(false);
            }

            return () => {
                timeoutId && clearTimeout(timeoutId);
            };
        }
    };

    const handleClose = () => {
        setErrors({});
        setFields({
            name: '',
            email: '',
            password: '',
            retypePassword: '',
            phoneNumber: '',
            gender: '',
            dob: null,
            roleId: '',
        });
        onClose();
    };

    const handleFieldChange = (field, value) => {
        if (field === 'password' && !isEmpty(value)) setIsPasswordChanged(true);
        else if (field === 'retypePassword') setIsPasswordChanged(true);
        else if (field === 'password' && isEmpty(value)) setIsPasswordChanged(false);

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
            {/* Toast */}
            {ToastContainer}

            {/* Overlay */}
            <Overlay isShow={isShowed} onClose={handleClose} />

            {/* Form */}
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
                        />
                        {type !== 'see' && (
                            <FormGroup
                                label="Password"
                                id="password"
                                name="password"
                                type="password"
                                error={errors.password}
                                Icon={MdLockOutline}
                                value={fields?.password}
                                disabled={type === 'see'}
                                customParentInputStyle="p-1 pe-3 rounded-2"
                                customParentParentInputStyle="mt-2"
                                onChange={(e) => handleFieldChange('password', e.target.value)}
                                onInput={() => handleFieldInput('password')}
                            />
                        )}
                        {(type === 'add' || isPasswordChanged) && (
                            <FormGroup
                                label="Retype-password"
                                id="retypePassword"
                                name="retypePassword"
                                type="password"
                                error={errors.retypePassword}
                                Icon={MdLockOutline}
                                value={fields?.retypePassword}
                                disabled={type === 'see'}
                                customParentInputStyle="p-1 pe-3 rounded-2"
                                customParentParentInputStyle="mt-2"
                                onChange={(e) => handleFieldChange('retypePassword', e.target.value)}
                                onInput={() => handleFieldInput('retypePassword')}
                            />
                        )}
                        <FormGroup
                            label="Gender"
                            id="gender"
                            name="gender"
                            type="select"
                            error={errors.gender}
                            // Icon={icon}
                            value={fields?.gender}
                            disabled={type === 'see'}
                            options={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                            ]}
                            customInputStyle="cursor-pointer"
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => {
                                handleFieldChange('gender', e.target.value);
                                handleFieldInput('gender');
                            }}
                        />
                        <FormGroup
                            label="Date of birth"
                            id="dob"
                            name="dob"
                            type="datetime"
                            error={errors.dob}
                            // Icon={icon}
                            value={fields?.dob}
                            disabled={type === 'see'}
                            customInputStyle="py-2 cursor-pointer"
                            customParentInputStyle="p-1 px-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(date) => {
                                handleFieldChange('dob', date);
                                handleFieldInput('dob');
                            }}
                        />
                        <FormGroup
                            label="Role"
                            id="roleId"
                            name="roleId"
                            type="select"
                            error={errors.roleId}
                            // Icon={icon}
                            value={fields?.roleId}
                            disabled={type === 'see'}
                            options={roles?.map((role) => {
                                console.log('Roles: ', roles);
                                return { label: role?.name, value: role?.id };
                            })}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => {
                                handleFieldChange('roleId', Number(e.target.value));
                                handleFieldInput('roleId');
                            }}
                            // onInput={() => handleFieldInput('roleId')}
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
                                customParentInputStyle="p-1 pe-3 rounded-2"
                                customParentParentInputStyle="mt-2"
                            />
                        )}
                        {(type === 'add' || type === 'edit') && (
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
                                            ariaLabel="rotating-lines-loading"
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

export default UserForm;
