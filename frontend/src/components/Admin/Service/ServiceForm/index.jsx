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
        price: '',
        status: '',
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
                            label="Name:"
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
                            label="Price:"
                            id="price"
                            name="price"
                            type="text"
                            // error={error}
                            Icon={FaRegUser}
                            value={type !== 'add' ? data?.price : ''}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={handleInputChanged}
                            onInput={handleInputTyped}
                            onBlur={handleInputBlured}
                        />

                        <FormGroup
                            label="Status:"
                            id="status"
                            name="status"
                            type="select"
                            value={type !== 'add' ? data?.status : ''} // Sử dụng giá trị số 1 hoặc 0
                            disabled={type === 'see'}
                            options={[
                                { label: 'Active', value: 1 },
                                { label: 'InActive', value: 0 },
                            ]}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            // onChange={(e) => {
                            //     // handleFieldChange('status', Number(e.target.value));
                            //     // handleFieldInput('status');
                            // }}
                        />
                        <FormGroup
                            label="Create time:"
                            id="createdAt"
                            name="createdAt"
                            type="text"
                            // error={error}
                            // Icon={icon}
                            value={type !== 'add' ? data?.createdAt : ''}
                            disabled
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={handleInputChanged}
                            onInput={handleInputTyped}
                            onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Update time:"
                            id="updatedAt"
                            name="updatedAt"
                            type="text"
                            // error={error}
                            // Icon={icon}
                            value={type !== 'add' ? data?.updatedAt : ''}
                            disabled
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
