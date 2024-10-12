import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import FormGroup from '~/components/FormGroup';
import { useUser } from '~/providers/UserProvider';
import ConfirmPopup from '~/components/ConfirmPopup';
import axios from 'axios';
import ToastContainer, { showToast } from '~/utils/showToast';
import { useNavigate } from 'react-router';

const AccountDetail = () => {
    const { user, signOut } = useUser();
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
    const navigate = useNavigate();

    // Delete user's account
    const handleDeleteAccount = async () => {
        try {
            const url = 'http://localhost:5058/user/customer';
            const response = await axios.delete(`${url}/${user?.id}`);
            console.log(response);
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
        }
    };

    const handleValidation = () => {
        // Doing handle validation here
    };

    const handleCancle = () => {
        setFieldIsChanging(false);
        setFields({
            name: user?.name || '',
            gender: user?.gender || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
            dob: user?.dob ? new Date(user?.dob) : null,
            createdAt: user?.createdAt || '',
        });
    };

    const handleFieldChange = (field, value) => {
        setFieldIsChanging(true);
        setFields((prevFields) => {
            return { ...prevFields, [field]: value };
        });
    };

    const handleFieldInput = (field) => {
        setFieldIsChanging(true);
        setFieldsError((prevFieldsError) => {
            return { [field]: '' };
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
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup
                                label="Name"
                                id="name"
                                name="name"
                                type="text"
                                value={fields.name}
                                // error={errors.name}
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
                                // error={errors.name}
                                value={fields.gender}
                                options={[
                                    { label: '----', value: '' },
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'female' },
                                ]}
                                customParentInputStyle="p-1 pe-3 rounded-2"
                                customLabelStyle="fw-semibold"
                                customParentParentInputStyle="mt-2"
                                onChange={(e) => handleFieldChange('gender', e.target.value)}
                                onInput={() => handleFieldInput('gender')}
                                // onBlur={() => handleValidation()}
                            />
                        </div>
                        <div className="col-lg-6">
                            <FormGroup
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                // error={errors.name}
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
                                label="Phone number"
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                // error={errors.name}
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
                                value={fields.dob}
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
                                value={fields.createdAt}
                                disabled={true}
                                customLabelStyle="fw-semibold"
                                customInputStyle="py-2 cursor-pointer pe-none"
                                customParentInputStyle="p-1 pe-3 rounded-2"
                                customParentParentInputStyle="mt-2"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex align-items-center justify-content-between">
                            <span className="d-flex align-items-center gap-2">
                                {fieldIsChanging && (
                                    <>
                                        <Button className="btn secondary-bg-color-hover primary-bd-color-hover fw-semibold">
                                            Save change
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            className="btn primary-bg-color primary-bg-color-hover border fw-semibold text-black"
                                            onClick={handleCancle}
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
                </div>
            </main>
        </>
    );
};

export default AccountDetail;
