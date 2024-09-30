import React, { useState } from 'react';

import { IoClose } from 'react-icons/io5';
import FormGroup from '~/components/FormGroup';
import Overlay from '~/components/Overlay';

import { FaRegUser } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { MdLockOutline } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';

import Button from 'react-bootstrap/Button';

const PopupPanel = ({ data, type, onClose, isShowed }) => {
    const [fields, setFields] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        gender: '',
        dob: '',
        roleId: '',
        firstBook: '',
        avatar: '',
    });

    const handleInputChanged = () => {};

    const handleInputBlured = () => {};

    const handleInputTyped = () => {};

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
                            label="Name"
                            id="name"
                            name="name"
                            type="text"
                            // error={error}
                            Icon={FaRegUser}
                            value={type !== 'add' ? data?.name : ''}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={handleInputChanged}
                            onInput={handleInputTyped}
                            onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            // error={error}
                            Icon={MdOutlineEmail}
                            value={type !== 'add' ? data?.email : ''}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={handleInputChanged}
                            onInput={handleInputTyped}
                            onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            // error={error}
                            Icon={MdLockOutline}
                            value={type !== 'add' ? data?.password : ''}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={handleInputChanged}
                            onInput={handleInputTyped}
                            onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Phone number"
                            id="phonenumber"
                            name="phoneNumber"
                            type="text"
                            // error={error}
                            Icon={FiPhone}
                            value={type !== 'add' ? data?.phoneNumber : ''}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={handleInputChanged}
                            onInput={handleInputTyped}
                            onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Gender"
                            id="gender"
                            name="gender"
                            type="select"
                            // error={error}
                            // Icon={icon}
                            value={type !== 'add' ? data?.gender : '' || 'NULL'}
                            disabled={type === 'see'}
                            options={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                                { label: 'Other', value: 'other' },
                                { label: 'Prefer not to say', value: 'NULL' },
                            ]}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={handleInputChanged}
                            onInput={handleInputTyped}
                            onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Date of birth"
                            id="dob"
                            name="dob"
                            type="text"
                            // error={error}
                            // Icon={icon}
                            value={type !== 'add' ? data?.dob : data?.dob === null ? 'NULL' : data?.roles?.name}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={handleInputChanged}
                            onInput={handleInputTyped}
                            onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Role"
                            id="roleId"
                            name="roleId"
                            type="text"
                            // error={error}
                            // Icon={icon}
                            value={
                                type !== 'add'
                                    ? data?.roles?.name
                                    : data?.roles?.name === null
                                    ? 'NULL'
                                    : data?.roles?.name
                            }
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={handleInputChanged}
                            onInput={handleInputTyped}
                            onBlur={handleInputBlured}
                        />
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
                            onChange={handleInputChanged}
                            onInput={handleInputTyped}
                            onBlur={handleInputBlured}
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
