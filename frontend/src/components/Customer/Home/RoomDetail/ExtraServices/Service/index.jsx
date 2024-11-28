import React from 'react';
import formatCurrency from '~/utils/currencyPipe';

const Service = ({ service, onChange }) => {
    const handleCheckboxChange = () => {
        const newCheckedStatus = !service.isChecked;
        onChange({ isChecked: newCheckedStatus, quantity: newCheckedStatus ? 1 : 0 });
    };

    const handleQuantityChange = (e) => {
        const value = Math.min(20, Math.max(0, parseInt(e.target.value, 10) || 0));
        onChange({ quantity: value, isChecked: value > 0 });
    };

    const totalPrice = service.quantity === 0 ? service.price : service.price * service.quantity;

    return (
        <li className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="form-check d-flex align-items-center gap-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={service.id}
                    style={{ padding: '.8rem' }}
                    checked={service.isChecked}
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label text-truncate" htmlFor={service.id} style={{ width: '140px' }}>
                    {service.name}
                </label>
            </div>
            <div className="d-flex align-items-center gap-3">
                <input
                    type="number"
                    className="form-control py-1"
                    min="0"
                    max="20"
                    step="1"
                    value={service.quantity}
                    onChange={handleQuantityChange}
                    disabled={!service.isChecked}
                    style={{ width: '70px' }}
                />
                <p className="mb-0">{formatCurrency(totalPrice)}</p>
            </div>
        </li>
    );
};

export default Service;
