import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';

import FormGroup from '../../FormGroup';

import { useUser } from '../../../providers/UserProvider';

import { isEmail, isEmpty, isPhoneNumber, isVerifyPassword } from '../../../utils/formValidation';

import ToastContainer, { showToast } from '../../../utils/showToast';

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
        else if (!isPhoneNumber(fields.phoneNumber)) validationErrors.phoneNumber = 'Email is invalid';

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
            <section className="primary-bg-color w-full h-full">
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
                                    {isCreatingAccount ? 'Creating account...' : 'Create account'}
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    className="w-full p-3 primary-bg-color primary-bg-color-hover border"
                                >
                                    <span>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clip-path="url(#clip0_191_13499)">
                                                <path
                                                    d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                                                    fill="#4285F4"
                                                ></path>
                                                <path
                                                    d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                                                    fill="#34A853"
                                                ></path>
                                                <path
                                                    d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                                                    fill="#FBBC05"
                                                ></path>
                                                <path
                                                    d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                                                    fill="#EB4335"
                                                ></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_191_13499">
                                                    <rect width="20" height="20" fill="white"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <span className="ms-2">Sign up with Google</span>
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
