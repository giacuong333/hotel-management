import React from 'react';
import formatCurrency from '~/utils/currencyPipe';

const Service = ({ service }) => {
    return (
        <li className="d-flex align-items-center justify-content-between">
            <div className="form-check d-flex align-items-center gap-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={service?.id}
                    style={{ padding: '.8rem' }}
                />
                <label className="form-check-label text-truncate" htmlFor={service?.id} style={{ width: '140px' }}>
                    {service?.name}
                </label>
            </div>
            <p>{formatCurrency(service?.price)}</p>
        </li>
    );
};

export default Service;
