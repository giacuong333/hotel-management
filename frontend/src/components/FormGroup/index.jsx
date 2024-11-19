import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const FormGroup = ({
    label,
    id,
    name,
    type,
    placeHolder,
    error,
    Icon,
    value,
    isDateDisabled,
    onChange,
    onInput,
    onBlur,
    disabled,
    customLabelStyle,
    customInputStyle,
    customParentInputStyle,
    customParentParentInputStyle,
    options,
}) => {
    return (
        <div className={`${customParentParentInputStyle}`}>
            {label && (
                <Form.Label htmlFor={id} className={`${customLabelStyle ? customLabelStyle : ''}`}>
                    {label}
                </Form.Label>
            )}
            <div
                className={`d-flex align-items-center justify-content-between border ${
                    error ? 'border-danger' : ''
                } primary-bd-color-focus ${customParentInputStyle}`}
            >
                {type === 'select' ? (
                    <Form.Select
                        id={id}
                        name={name}
                        value={value}
                        disabled={disabled}
                        className={`outline-none primary-bd-color-focus border-0 bg-white ${
                            customInputStyle ? customInputStyle : ''
                        }`}
                        onChange={onChange}
                        onInput={onInput}
                    >
                        <option value="" className="text-black-50">
                            ----- Select -----
                        </option>
                        {options?.map((option, index) => (
                            <option key={index} value={option?.value}>
                                {option?.label}
                            </option>
                        ))}
                    </Form.Select>
                ) : type === 'datetime' ? (
                    <DateTimePicker
                        id={id}
                        name={name}
                        value={value}
                        disabled={disabled}
                        tileDisabled={isDateDisabled}
                        className={`w-full outline-none primary-bd-color-focus border-0 bg-white ${
                            customInputStyle ? customInputStyle : ''
                        }`}
                        onChange={onChange}
                        onInput={onInput}
                    />
                ) : type === 'textarea' ? (
                    <Form.Control
                        as="textarea"
                        id={id}
                        name={name}
                        value={value}
                        placeholder={placeHolder}
                        className={`outline-none primary-bd-color-focus border-0 bg-white ${
                            customInputStyle ? customInputStyle : ''
                        }`}
                        disabled={disabled}
                        onChange={onChange}
                        onInput={onInput}
                        onBlur={onBlur}
                    />
                ) : (
                    <Form.Control
                        type={type}
                        id={id}
                        name={name}
                        value={value}
                        placeholder={placeHolder}
                        className={`outline-none primary-bd-color-focus border-0 bg-white ${
                            customInputStyle ? customInputStyle : ''
                        }`}
                        disabled={disabled}
                        onChange={onChange}
                        onInput={onInput}
                        onBlur={onBlur}
                    />
                )}
                {Icon && (
                    <Icon
                        size={24}
                        className={`animation-effect align-bottom icon-color  ${error ? 'text-danger' : ''}`}
                    />
                )}
            </div>
            {error && <small className="text-danger fw-semibold">{error}</small>}
        </div>
    );
};

export default FormGroup;
