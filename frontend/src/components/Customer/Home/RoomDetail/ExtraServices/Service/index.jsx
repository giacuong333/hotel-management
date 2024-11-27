import React, { useState } from 'react';
import formatCurrency from '~/utils/currencyPipe';

const Service = ({ service }) => {
    const [isChecked, setIsChecked] = useState(false); // Trạng thái checkbox
    const [quantity, setQuantity] = useState(0); // Giá trị số lượng

    const handleCheckboxChange = () => {
        const newCheckedStatus = !isChecked;
        setIsChecked(newCheckedStatus); // Cập nhật trạng thái checkbox
        setQuantity(newCheckedStatus ? 1 : 0); // Nếu check thì đặt số lượng là 1, nếu bỏ check thì là 0
    };

    const handleQuantityChange = (e) => {
        const value = Math.min(20, Math.max(0, parseInt(e.target.value, 10) || 0)); // Giới hạn giá trị từ 0-20
        setQuantity(value);
        if (value === 0) {
            setIsChecked(false); // Bỏ check nếu số lượng về 0
        } else if (!isChecked) {
            setIsChecked(true); // Tự check nếu giá trị khác 0
        }
    };

    // Tính tổng tiền hoặc giữ giá dịch vụ ban đầu nếu số lượng là 0
    const totalPrice = quantity === 0 ? service?.price : service?.price * quantity;

    return (
        <li className="d-flex align-items-center justify-content-between">
            <div className="form-check d-flex align-items-center gap-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={service?.id}
                    style={{ padding: '.8rem' }}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label text-truncate" htmlFor={service?.id} style={{ width: '140px' }}>
                    {service?.name}
                </label>
            </div>
            <div className="d-flex align-items-center gap-3">
                <input
                    type="number"
                    className="form-control"
                    min="0"
                    max="20"
                    step="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    disabled={!isChecked} // Không cho phép chỉnh sửa nếu không được check
                    style={{ width: '80px' }}
                />
                <p className="mb-0">{formatCurrency(totalPrice)}</p>
            </div>
        </li>
    );
};

export default Service;
