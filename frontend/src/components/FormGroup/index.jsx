import React from 'react';

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
    onChange,
    onInput,
    onBlur,
    disabled,
    customInputStyle,
    customParentInputStyle,
    customParentParentInputStyle,
    options,
}) => {
    return (
        <div className={`${customParentParentInputStyle}`}>
            {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
            <div
                className={`d-flex align-items-center justify-content-between border primary-bd-color-focus ${customParentInputStyle}`}
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
                        {options?.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                ) : type === 'datetime' ? (
                    <DateTimePicker
                        id={id}
                        name={name}
                        value={value}
                        disabled={disabled}
                        className={`w-full outline-none primary-bd-color-focus border-0 bg-white ${
                            customInputStyle ? customInputStyle : ''
                        }`}
                        onChange={onChange}
                        onInput={onInput}
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
                {Icon && <Icon size={24} className="align-bottom icon-color" />}
            </div>
            {error && <span className="text-danger text-sm">{error}</span>}
        </div>
    );
};

export default FormGroup;
