import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import FormGroup from '~/components/FormGroup';
import { useUser } from '~/providers/UserProvider';
import axios from 'axios';
import ToastContainer, { showToast } from '~/utils/showToast';
import { isEmpty, isVerifyPassword } from '~/utils/formValidation';
import { FiLock } from 'react-icons/fi';
import { RotatingLines } from 'react-loader-spinner';

const Password = () => {
    const { user, fetchUser } = useUser();
    const [fields, setFields] = useState({
        currentPassword: '',
        newPassword: '',
        retypePassword: '',
    });
    const [fieldsError, setFieldsError] = useState({});
    const [fieldIsChanging, setFieldIsChanging] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        user &&
            setFields({
                currentPassword: '',
                newPassword: '',
                retypePassword: '',
            });
    }, [user]);

    const handleValidation = () => {
        const errors = {};

        if (isEmpty(fields?.currentPassword)) errors.currentPassword = 'Current password is required';
        if (isEmpty(fields?.newPassword)) errors.newPassword = 'New password is required';
        if (!isEmpty(fields?.newPassword) && isEmpty(fields?.retypePassword))
            errors.retypePassword = 'Re-type password is required';
        if (!isEmpty(fields?.newPassword) && !isVerifyPassword(fields.newPassword, fields.retypePassword))
            errors.retypePassword = 'Re-type password does not match';

        setFieldsError(errors);
        return Object.entries(errors).length === 0;
    };

    // Submit changing the user's information
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                setLoading(true);
                const url = 'http://localhost:5058/user/password';
                const payload = new FormData();
                payload.append('currentPassword', fields.currentPassword);
                payload.append('newPassword', fields.newPassword);
                const response = await axios.put(`${url}/${user?.id}`, payload);
                if (response?.status === 200) {
                    console.log(response);
                    showToast(
                        response?.data?.message || response?.data?.obj?.message || 'Password changed successfully',
                        'success',
                    );
                    await fetchUser();
                    handleReset();
                }
            } catch (error) {
                console.log(error);
                showToast(error?.response?.data?.message || 'Something went wrong while changing', 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    // Reset all the information of the user
    const handleReset = () => {
        setFieldIsChanging(false);
        setFields({
            currentPassword: '',
            newPassword: '',
            retypePassword: '',
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

            {/* Main */}
            <main className="">
                <div className="">
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                        {/* Form control */}
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row mb-4">
                                    <div className="">
                                        <p className="fw-semibold fs-4">Change password</p>
                                        <small className="mt-1">
                                            To change your password, please fill in the fields below.
                                        </small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <FormGroup
                                            label="Current Password"
                                            id="currentPassword"
                                            name="currentPassword"
                                            type="password"
                                            placeHolder="Current Password"
                                            Icon={FiLock}
                                            value={fields?.currentPassword}
                                            error={fieldsError?.currentPassword}
                                            customLabelStyle="fw-semibold"
                                            customParentInputStyle="p-1 pe-3 rounded-2"
                                            customParentParentInputStyle="mt-2"
                                            onChange={(e) => handleFieldChange('currentPassword', e.target.value)}
                                            onInput={() => handleFieldInput('currentPassword')}
                                            // onBlur={() => handleValidation()}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <FormGroup
                                            label="New Password"
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeHolder="New Password"
                                            Icon={FiLock}
                                            value={fields?.newPassword}
                                            error={fieldsError?.newPassword}
                                            customLabelStyle="fw-semibold"
                                            customParentInputStyle="p-1 pe-3 rounded-2"
                                            customParentParentInputStyle="mt-2"
                                            onChange={(e) => handleFieldChange('newPassword', e.target.value)}
                                            onInput={() => handleFieldInput('newPassword')}
                                            // onBlur={() => handleValidation()}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <FormGroup
                                            label="Re-type password"
                                            id="retypePassword"
                                            name="retypePassword"
                                            type="password"
                                            placeHolder="Re-type Password"
                                            Icon={FiLock}
                                            error={fieldsError?.retypePassword}
                                            value={fields?.retypePassword}
                                            customLabelStyle="fw-semibold"
                                            customParentInputStyle="p-1 pe-3 rounded-2"
                                            customParentParentInputStyle="mt-2"
                                            onChange={(e) => handleFieldChange('retypePassword', e.target.value)}
                                            onInput={() => handleFieldInput('retypePassword')}
                                            // onBlur={() => handleValidation()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="row">
                            <div className="col-lg-6">
                                <span className="d-flex align-items-center gap-2 ">
                                    {fieldIsChanging && (
                                        <>
                                            <Button
                                                type="submit"
                                                className={`w-full btn secondary-bg-color-hover primary-bd-color-hover fw-semibold ${
                                                    loading ? 'pe-none opacity-50' : ''
                                                }`}
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
                                                className={`w-full btn primary-bg-color primary-bg-color-hover border fw-semibold text-black ${
                                                    loading ? 'pe-none opacity-50' : ''
                                                }`}
                                                onClick={handleReset}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Password;
