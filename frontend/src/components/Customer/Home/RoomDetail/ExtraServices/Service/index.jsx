import React from 'react';

const Service = ({ id, label, price }) => {
    return (
        <li className="d-flex align-items-center justify-content-between">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id={id} className="checkbox-customer" />
                <label class="form-check-label" for={id}>
                    {label}
                </label>
            </div>
            <p>{price}</p>
        </li>
    );
};

export default Service;
