import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FiMail, FiLock } from 'react-icons/fi';
import FormGroup from '../../FormGroup';
import { useUser } from '../../../providers/UserProvider';
import { isEmail, isEmpty } from '../../../utils/formValidation';
import ToastContainer, { showToast } from '../../../utils/showToast';
import { RotatingLines } from 'react-loader-spinner';
import { GoogleLogin } from '@react-oauth/google';

const SignIn = () => {
    const [fields, setFields] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { signIn, signInByGoogle, isLogginginAccount } = useUser();

    const handleValidation = () => {
        const validationErrors = {};
        if (isEmpty(fields.email)) validationErrors.email = 'Email is required';
        else if (!isEmail(fields.email)) validationErrors.email = 'Email is invalid';
        if (isEmpty(fields.password)) validationErrors.password = 'Password is required';
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                const payload = {
                    email: fields.email,
                    password: fields.password,
                };
                const response = await signIn(payload);
                if (response && response.status === 200) {
                    const roleId = response?.data?.roleId;
                    roleId === 4 && navigate('/');
                    roleId !== 4 && navigate('/admin/dashboard');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const onSuccess = async (response) => {
        if (!response.credential) {
            showToast('Google authentication failed ' + response, 'error');
            return;
        }

        try {
            const loginResponse = await signInByGoogle(response);
            if (loginResponse && loginResponse.status === 200) {
                const roleId = loginResponse?.data?.roleId;
                roleId === 4 && navigate('/');
                roleId !== 4 && navigate('/admin/dashboard');
            }
        } catch (err) {
            console.log(err);
            showToast('Google signed in failed', 'error');
        }
    };

    const onError = (e) => {
        console.log('Error while signing in by Google: ', e.message);
    };

    return (
        <>
            <section className="primary-bg-color w-full h-screen">
                <div className="d-flex align-items-center justify-content-center w-full h-full p-4">
                    <div className="white-bg-color shadow rounded-3 border p-5" style={{ width: '500px' }}>
                        <h2>Sign In To LuxStay</h2>
                        <form className="my-4" onSubmit={handleSignIn}>
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
                            <div className="d-flex flex-column gap-5 mt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className={`w-full p-3 customer-primary-button ${
                                        isLogginginAccount ? 'cursor-default pe-none opacity-50' : 'cursor-pointer'
                                    }`}
                                >
                                    {isLogginginAccount ? (
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
                                        'Sign in'
                                    )}
                                </Button>
                                <button
                                    type="button"
                                    className={`bg-white p-0 ${
                                        isLogginginAccount ? 'pe-none opacity-50 cursor-default' : 'cursor-pointer'
                                    }`}
                                >
                                    <GoogleLogin onSuccess={onSuccess} onError={onError} />
                                </button>
                            </div>
                        </form>
                        <span className="text-center w-full">
                            <p>
                                Already have not an account?{' '}
                                <Link to="/signup" className="secondary-color">
                                    Sign up
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

export default SignIn;
