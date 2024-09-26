import React from 'react';

const Service = ({ id, label, price }) => {
    return (
        <li className="d-flex align-items-center justify-content-between">
            <div className="form-check d-flex align-items-center gap-2">
                <input className="form-check-input" type="checkbox" value="" id={id} style={{ padding: '.8rem' }} />
                <label className="form-check-label" for={id}>
                    {label}
                </label>
            </div>
            <p>{price}</p>
        </li>
    );
};

export default Service;
