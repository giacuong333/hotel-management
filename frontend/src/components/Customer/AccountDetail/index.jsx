import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import FormGroup from '~/components/FormGroup';
import { useUser } from '~/providers/UserProvider';
import ConfirmPopup from '~/components/ConfirmPopup';
import axios from 'axios';
import ToastContainer, { showToast } from '~/utils/showToast';
import { useNavigate } from 'react-router';
import { isEmail, isEmpty, isPhoneNumber } from '~/utils/formValidation';
import { RotatingLines } from 'react-loader-spinner';

const AccountDetail = () => {
    const { user, fetchUser, signOut } = useUser();
    const [fields, setFields] = useState({
        name: user?.name || '',
        gender: user?.gender || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        dob: user?.dob ? new Date(user?.dob) : null,
        createdAt: user?.createdAt || '',
    });
    const [fieldsError, setFieldsError] = useState({});
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [fieldIsChanging, setFieldIsChanging] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        user &&
            setFields({
                name: user.name || '',
                gender: user.gender || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                dob: user.dob ? new Date(user.dob) : null,
                createdAt: user.createdAt || '',
            });
    }, [user]);

    // Delete the user's account
    const handleDeleteAccount = async () => {
        try {
            setLoading(true);
            const url = 'http://localhost:5058/user/customer';
            const response = await axios.delete(`${url}/${user?.id}`);
            if (response?.status === 200) {
                setTimeout(async () => {
                    await signOut();
                    navigate('/signin');
                }, 4000);
                showToast(response?.data?.obj, 'success');
                setShowDeletePopup(false);
            }
        } catch (error) {
            showToast(
                error?.response?.data?.obj?.message ||
                    error?.response?.message ||
                    error?.response?.data?.obj ||
                    'Something went wrong while deleting your account',
                'error',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleValidation = () => {
        const errors = {};
        if (isEmpty(fields.name)) errors.name = 'Name is required';
        if (isEmpty(fields.email)) errors.email = 'Email is required';
        else if (!isEmail(fields.email)) errors.email = 'Email is invalid';
        if (isEmpty(fields.phoneNumber)) errors.phoneNumber = 'Phone number is required';
        else if (!isPhoneNumber(fields.phoneNumber)) errors.phoneNumber = 'Phone number is invalid';
        setFieldsError(errors);
        return Object.entries(errors).length === 0;
    };

    // Submit changing the user's information
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                setLoading(true);
                const url = 'http://localhost:5058/user';
                const response = await axios.put(`${url}/${user?.id}`, fields);
                if (response?.status === 200) {
                    showToast(response?.data?.obj?.message, 'success');
                    await fetchUser();
                    handleReset();
                }
            } catch (error) {
                showToast(
                    error?.response?.obj ||
                        error?.response?.obj?.message ||
                        error?.response?.obj?.data?.message ||
                        'Something went wrong while changing',
                    'error',
                );
            } finally {
                setLoading(false);
            }
        }
    };

    // Reset all the information of the user
    const handleReset = () => {
        setFieldIsChanging(false);
        setFields({
            name: user.name || '',
            gender: user.gender || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            dob: user.dob ? new Date(user.dob) : null,
            createdAt: user.createdAt || '',
        });
        setFieldsError({});
    };

    const handleFieldChange = (field, value) => {
        setFieldIsChanging(true);
        setFields((prevFields) => {
            return {
                ...prevFields,
                [field]: value,
            };
        });
    };

    const handleFieldInput = (field) => {
        setFieldIsChanging(true);
        setFieldsError((prevFieldsError) => {
            return {
                ...prevFieldsError,
                [field]: '',
            };
        });
    };

    return (
        <>
            {/* Show toast for user */}
            {ToastContainer}

            {/* Show deleting account confirm popup when clicking on the delete account button */}
            <ConfirmPopup
                header="Are you sure you want to delete your account?"
                message="This action can be undone."
                positiveChoice="Delete"
                negativeChoice="Cancle"
                onYes={handleDeleteAccount}
                onClose={() => setShowDeletePopup(false)}
                isShow={showDeletePopup}
            />

            {/* Main */}
            <main className="">
                <div className="d-flex flex-column gap-4">
                    <div className="">
                        <p className="fw-semibold fs-4">Personal information</p>
                        <small className="mt-1">
                            Manage your personal information, including phone numbers, and email address where you can
                            be contacted.
                        </small>
                    </div>
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                        {/* Form control */}
                        <div className="row">
                            <div className="col-lg-6">
                                <FormGroup
                                    label="Name *"
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={fields?.name}
                                    error={fieldsError?.name}
                                    placeHolder={'Jonh Doe'}
                                    customLabelStyle="fw-semibold"
                                    customParentInputStyle="p-1 pe-3 rounded-2"
                                    customParentParentInputStyle="mt-2"
                                    onChange={(e) => handleFieldChange('name', e.target.value)}
                                    onInput={() => handleFieldInput('name')}
                                    // onBlur={() => handleValidation()}
                                />
                            </div>
                            <div className="col-lg-6">
                                <FormGroup
                                    label="Gender"
                                    id="gender"
                                    name="gender"
                                    type="select"
                                    // error={fieldsError.name}
                                    value={fields?.gender}
                                    options={[
                                        { label: '----', value: '' },
                                        { label: 'Male', value: 'male' },
                                        { label: 'Female', value: 'female' },
                                    ]}
                                    customParentInputStyle="p-1 pe-3 rounded-2"
                                    customLabelStyle="fw-semibold"
                                    customParentParentInputStyle="mt-2"
                                    onChange={(e) => {
                                        handleFieldChange('gender', e.target.value);
                                        handleFieldInput('gender');
                                    }}
                                    // onBlur={() => handleValidation()}
                                />
                            </div>
                            <div className="col-lg-6">
                                <FormGroup
                                    label="Email *"
                                    id="email"
                                    name="email"
                                    type="email"
                                    error={fieldsError?.email}
                                    value={fields.email}
                                    placeHolder={'legiacuong@gmail.com'}
                                    customLabelStyle="fw-semibold"
                                    customParentInputStyle="p-1 pe-3 rounded-2"
                                    customParentParentInputStyle="mt-2"
                                    onChange={(e) => handleFieldChange('email', e.target.value)}
                                    onInput={() => handleFieldInput('email')}
                                    // onBlur={() => handleValidation()}
                                />
                            </div>
                            <div className="col-lg-6">
                                <FormGroup
                                    label="Phone number *"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    error={fieldsError?.phoneNumber}
                                    value={fields.phoneNumber}
                                    placeHolder={'0948800917'}
                                    customLabelStyle="fw-semibold"
                                    customParentInputStyle="p-1 pe-3 rounded-2"
                                    customParentParentInputStyle="mt-2"
                                    onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                                    onInput={() => handleFieldInput('phoneNumber')}
                                    // onBlur={() => handleValidation()}
                                />
                            </div>
                            <div className="col-lg-6">
                                <FormGroup
                                    label="Date of birth"
                                    id="dob"
                                    name="dob"
                                    type="datetime"
                                    // error={errors.dob}
                                    // Icon={icon}
                                    value={fields?.dob}
                                    // disabled={type === 'see'}
                                    customLabelStyle="fw-semibold"
                                    customInputStyle="py-2 cursor-pointer"
                                    customParentInputStyle="p-1 px-3 rounded-2"
                                    customParentParentInputStyle="mt-2"
                                    onChange={(date) => {
                                        handleFieldChange('dob', date);
                                        handleFieldInput('dob');
                                    }}
                                    // onSelect={() => handleFieldInput('dob')}
                                    // onBlur={handleInputBlured}
                                />
                            </div>
                            <div className="col-lg-6">
                                <FormGroup
                                    label="Created At"
                                    id="createdAt"
                                    name="createdAt"
                                    type="text"
                                    // error={errors.dob}
                                    // Icon={icon}
                                    value={fields?.createdAt}
                                    disabled={true}
                                    customLabelStyle="fw-semibold"
                                    customInputStyle="py-2 cursor-pointer pe-none"
                                    customParentInputStyle="p-1 pe-3 rounded-2"
                                    customParentParentInputStyle="mt-2"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="row">
                            <div className="d-flex align-items-center justify-content-between">
                                <span className="d-flex align-items-center gap-2">
                                    {fieldIsChanging && (
                                        <>
                                            <Button
                                                type="submit"
                                                className={`btn secondary-bg-color-hover primary-bd-color-hover fw-semibold ${
                                                    loading ? 'pe-none opacity-75' : ''
                                                }`}
                                                style={{ minWidth: '150px' }}
                                            >
                                                {loading ? (
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
                                                    'Save change'
                                                )}
                                            </Button>
                                            <Button
                                                variant="outline-secondary"
                                                className={`btn primary-bg-color primary-bg-color-hover border fw-semibold text-black ${
                                                    loading ? 'pe-none opacity-75' : ''
                                                }`}
                                                style={{ minWidth: '150px' }}
                                                onClick={handleReset}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                </span>
                                <Button className="btn-danger fw-semibold" onClick={() => setShowDeletePopup(true)}>
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default AccountDetail;
