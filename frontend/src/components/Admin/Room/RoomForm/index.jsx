import React, { useEffect, useRef, useState } from 'react';
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
import { isEmpty } from '~/utils/formValidation';
import formatCurrency from '~/utils/currencyPipe';
import { RotatingLines } from 'react-loader-spinner';

const RoomForm = ({ data, type, onClose, onRoomAdded, onRoomUpdated, isShowed }) => {
    const [fields, setFields] = useState({
        name: data?.name || '',
        type: data?.type || '',
        description: data?.description || '',
        bedNum: data?.bedNum || '',
        status: data?.status || '',
        price: data?.price || '',
        area: data?.area || '',
        createdAt: data?.createdAt ? new Date(data?.createdAt) : null,
        thumbnail: data?.thumbnail || '',
    });
    const [errors, setErrors] = useState({});
    const [pendingSubmit, setPendingSubmit] = useState(false);
    const thumbnailRef = useRef();

    // Reset form fields whenever `type` or `data` changes
    useEffect(() => {
        setFields({
            name: data?.name || '',
            type: data?.type || '',
            description: data?.description || '',
            bedNum: data?.bedNum || '',
            status: data?.status || '',
            price: data?.price || '',
            area: data?.area || '',
            createdAt: data?.createdAt ? new Date(data?.createdAt) : null,
            thumbnail: data?.thumbnail || '',
        });
        setErrors({});
    }, [type, data]);

    const handleValidation = () => {
        const validationErrors = {};

        if (isEmpty(fields.name)) validationErrors.name = 'Name is required';
        if (isEmpty(fields.type)) validationErrors.type = 'Type is required';
        if (isEmpty(fields.description)) validationErrors.description = 'Description is required';
        if (isEmpty(fields.bedNum)) validationErrors.bedNum = 'Bed is required';
        if (isEmpty(fields.status)) validationErrors.status = 'Status is required';
        if (isEmpty(fields.price)) validationErrors.price = 'Price is required';
        if (isEmpty(fields.area)) validationErrors.area = 'Area is required';

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    console.log('Payload', fields);

    const handleSubmitClicked = async (e) => {
        e.preventDefault();

        const apiUrl = 'http://localhost:5058/room';

        if (handleValidation()) {
            const formData = new FormData();
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value);
            });

            try {
                if (type === 'add') {
                    setPendingSubmit(true);
                    const response = await axios.post(`${apiUrl}`, formData);
                    console.log(response);
                    if (response?.status === 201) {
                        showToast('Room created successfully', 'success');
                        setTimeout(handleClose, 4000);
                        onRoomAdded(response?.data?.room);
                    }
                } else if (type === 'edit') {
                    setPendingSubmit(true);
                    const response = await axios.put(`${apiUrl}/${data?.id}`, formData);
                    console.log(response);
                    if (response?.status === 200) {
                        showToast('Room updated successfully', 'success');
                        setTimeout(handleClose, 4000);
                        onRoomUpdated(response?.data?.room || response?.data?.$values);
                    }
                }
            } catch (error) {
                console.log('Error while editing', error);
                showToast(error?.response?.data?.message || error?.response?.message, 'error');
            } finally {
                setPendingSubmit(false);
            }
        }
    };

    const handleClose = () => {
        setErrors({});
        setFields({
            name: data?.name || '',
            type: data?.type || '',
            description: data?.description || '',
            bedNum: data?.bedNum || '',
            status: data?.status || '',
            price: data?.price || '',
            area: data?.area || '',
            createdAt: data?.createdAt ? new Date(data?.createdAt) : null,
            thumbnail: data?.thumbnail || '',
        });
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

    const handleAddClick = () => {
        thumbnailRef.current.click();
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
                className="container mx-auto px-5"
            >
                <>
                    <input
                        type="file"
                        hidden
                        ref={thumbnailRef}
                        onChange={() => handleFieldChange('thumbnail', thumbnailRef.current.files[0])}
                    />
                    <button
                        size={30}
                        className="p-2 rounded-pill cursor-pointer text-white customer-primary-button bg-hover-white text-hover-black"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            zIndex: 20,
                        }}
                        onClick={handleAddClick}
                    >
                        A<br />d<br />d
                    </button>
                </>
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
                            error={errors?.name}
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
                            label="Type"
                            id="type"
                            name="type"
                            type="text"
                            error={errors?.type}
                            Icon={MdOutlineEmail}
                            value={fields?.type}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('type', e.target.value)}
                            onInput={() => handleFieldInput('type')}
                            // onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Description"
                            id="description"
                            name="description"
                            type="textarea"
                            error={errors?.description}
                            Icon={MdLockOutline}
                            value={fields?.description}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('description', e.target.value)}
                            onInput={() => handleFieldInput('description')}
                            // onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Bed"
                            id="bedNum"
                            name="bedNum"
                            type="text"
                            error={errors?.bedNum}
                            Icon={FiPhone}
                            value={fields?.bedNum}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('bedNum', e.target.value)}
                            onInput={() => handleFieldInput('bedNum')}
                            // onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Status"
                            id="status"
                            name="status"
                            type="select"
                            error={errors?.status}
                            // Icon={icon}
                            value={fields?.status}
                            disabled={type === 'see'}
                            options={[
                                { label: 'Empty', value: 1 },
                                { label: 'Booked', value: 2 },
                                { label: 'Staying', value: 3 },
                            ]}
                            customInputStyle="cursor-pointer"
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => {
                                handleFieldChange('status', e.target.value);
                                handleFieldInput('status');
                            }}
                            // onSelect={() => handleFieldInput('gender')}
                            // onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Price"
                            id="price"
                            name="price"
                            type="text"
                            error={errors?.price}
                            Icon={FiPhone}
                            value={type === 'see' ? formatCurrency(fields?.price) : fields?.price}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('price', e.target.value)}
                            onInput={() => handleFieldInput('price')}
                            // onBlur={handleInputBlured}
                        />
                        <FormGroup
                            label="Area"
                            id="area"
                            name="area"
                            type="text"
                            error={errors?.area}
                            Icon={FiPhone}
                            value={type === 'see' ? `${fields?.area}m2` : fields?.area}
                            disabled={type === 'see'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            onChange={(e) => handleFieldChange('area', e.target.value)}
                            onInput={() => handleFieldInput('area')}
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

export default RoomForm;
