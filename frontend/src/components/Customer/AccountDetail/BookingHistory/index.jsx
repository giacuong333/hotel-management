import React, { useState } from 'react';
import FormGroup from '~/components/FormGroup';
import Bookings from './Bookings';

const BookingHistory = () => {
    const [month, setMonth] = useState(null);
    const [type, setType] = useState('booking');

    return (
        // Main
        <main className="">
            <div className="d-flex flex-column gap-4">
                <div>
                    <p className="fw-semibold fs-4">Booking History</p>
                    <small className="mt-1">Manage your recent bookings and invoices.</small>
                </div>

                {/* Type */}
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <div
                        style={{ backgroundColor: '#f3f3f1' }}
                        className="p-1 rounded-3 border d-flex align-items-center gap-1 shadow-sm"
                    >
                        <button
                            className={
                                type === 'booking'
                                    ? 'bg-white shadow-sm py-1 px-4 rounded-3'
                                    : 'bg-transparent text-black-50'
                            }
                            onClick={() => setType('booking')}
                        >
                            Bookings
                        </button>
                        <button
                            className={
                                type === 'notpay'
                                    ? 'bg-white shadow-sm py-1 px-4 rounded-3'
                                    : 'bg-transparent text-black-50'
                            }
                            onClick={() => setType('notpay')}
                        >
                            Not Yet Payed
                        </button>
                        <button
                            className={
                                type === 'cancelled'
                                    ? 'bg-white shadow-sm py-1 px-4 rounded-3'
                                    : 'bg-transparent text-black-50'
                            }
                            onClick={() => setType('cancelled')}
                        >
                            Cancelled Bookings
                        </button>
                    </div>
                    <FormGroup
                        id="gender"
                        name="gender"
                        type="select"
                        // error={fieldsError.name}
                        value={month}
                        options={[
                            { label: 'Past 3 Month', value: 3 },
                            { label: 'Past 6 Month', value: 6 },
                        ]}
                        customInputStyle="cursor-pointer"
                        customParentInputStyle="p-1 pe-3 rounded-3 border d-flex align-items-center gap-1 shadow-sm"
                        onChange={(e) => setMonth(e.target.value)}
                        // onBlur={() => handleValidation()}
                    />
                </div>

                {/* data & pagination*/}
                <Bookings type={type} />
            </div>
        </main>
    );
};

export default BookingHistory;
