import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import FormGroup from '../../FormGroup';
import { useUser } from '../../../providers/UserProvider';
import { isEmail, isEmpty, isPhoneNumber, isVerifyPassword } from '../../../utils/formValidation';
import ToastContainer, { showToast } from '../../../utils/showToast';
import { RotatingLines } from 'react-loader-spinner';

const SignUp = () => {
    const [fields, setFields] = useState({ name: '', email: '', password: '', retypePassword: '', phoneNumber: '' });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const { signUp, error, loading, isCreatingAccount } = useUser();

    const handleValidation = () => {
        const validationErrors = {};
        if (isEmpty(fields.name)) validationErrors.name = 'Name is required';
        if (isEmpty(fields.email)) validationErrors.email = 'Email is required';
        else if (!isEmail(fields.email)) validationErrors.email = 'Email is invalid';
        if (isEmpty(fields.phoneNumber)) validationErrors.phoneNumber = 'Phone number is required';
        else if (!isPhoneNumber(fields.phoneNumber)) validationErrors.phoneNumber = 'Phone number is invalid';
        if (isEmpty(fields.password)) validationErrors.password = 'Password is required';
        if (!isVerifyPassword(fields.password, fields.retypePassword))
            validationErrors.retypePassword = 'Password does not match';

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            try {
                const payload = {
                    name: fields.name,
                    email: fields.email,
                    password: fields.password,
                    phoneNumber: fields.phoneNumber,
                };

                const response = await signUp(payload);
                if (response.status === 201) {
                    showToast(response.data.message, 'success');
                    setTimeout(() => navigate('/signin'), 2000);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
    };

    return (
        <>
            <section
                className="primary-bg-color w-full d-flex align-items-center justify-content-center"
                style={{ minHeight: '100vh' }}
            >
                <div className="d-flex align-items-center justify-content-center w-full h-full p-4">
                    <div className="white-bg-color shadow rounded-3 border p-5" style={{ width: '500px' }}>
                        <h2>Sign Up To LuxStay</h2>
                        <form className="my-4" onSubmit={handleCreateAccount}>
                            <FormGroup
                                label="Name"
                                id="name"
                                name="name"
                                type="text"
                                value={fields.name}
                                placeHolder="Enter your full name"
                                error={errors.name}
                                Icon={FiUser}
                                customParentParentInputStyle="mt-4"
                                customParentInputStyle="p-2 pe-3 rounded-3"
                                onChange={(e) => setFields((prev) => ({ ...prev, name: e.target.value }))}
                                onInput={() => setErrors((prev) => ({ ...prev, name: '' }))}
                            />
                            <FormGroup
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                value={fields.email}
                                placeHolder="Enter your email"
                                error={errors.email} // Specific error for Email field
                                Icon={FiMail}
                                customParentParentInputStyle="mt-4"
                                customParentInputStyle="p-2 pe-3 rounded-3"
                                onChange={(e) => setFields((prev) => ({ ...prev, email: e.target.value }))}
                                onInput={() => setErrors((prev) => ({ ...prev, email: '' }))}
                            />
                            <FormGroup
                                label="Phone number"
                                id="phonenumber"
                                name="phonenumber"
                                type="text"
                                value={fields.phoneNumber}
                                placeHolder="Enter your phone number"
                                error={errors.phoneNumber} // Specific error for Email field
                                Icon={FiPhone}
                                customParentParentInputStyle="mt-4"
                                customParentInputStyle="p-2 pe-3 rounded-3"
                                onChange={(e) => setFields((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                                onInput={() => setErrors((prev) => ({ ...prev, phoneNumber: '' }))}
                            />
                            <FormGroup
                                label="Password"
                                id="password"
                                name="password"
                                type="password"
                                value={fields.password}
                                placeHolder="Enter your password"
                                error={errors.password} // Specific error for Password field
                                Icon={FiLock}
                                customParentParentInputStyle="mt-4"
                                customParentInputStyle="p-2 pe-3 rounded-3"
                                onChange={(e) => setFields((prev) => ({ ...prev, password: e.target.value }))}
                                onInput={() => setErrors((prev) => ({ ...prev, password: '' }))}
                            />
                            <FormGroup
                                label="Re-type Password"
                                id="repassword"
                                name="repassword"
                                type="password"
                                value={fields.retypePassword}
                                placeHolder="Re-enter your password"
                                error={errors.retypePassword} // Specific error for retype password field
                                Icon={FiLock}
                                customParentParentInputStyle="mt-4"
                                customParentInputStyle="p-2 pe-3 rounded-3"
                                onChange={(e) => setFields((prev) => ({ ...prev, retypePassword: e.target.value }))}
                                onInput={() => setErrors((prev) => ({ ...prev, retypePassword: '' }))}
                            />
                            <div className="d-flex flex-column gap-3 mt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className={`w-full p-3 customer-primary-button ${
                                        isCreatingAccount ? 'cursor-default pe-none opacity-50' : 'cursor-pointer'
                                    }`}
                                >
                                    {isCreatingAccount ? (
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
                                        'Create account'
                                    )}
                                </Button>
                            </div>
                        </form>
                        <span className="text-center w-full">
                            <p>
                                Already have an account?{' '}
                                <Link to="/signin" className="secondary-color">
                                    Sign in
                                </Link>
                            </p>
                        </span>
                    </div>
                </div>
            </section>
            {ToastContainer}
        </>
    );
};

export default SignUp;
