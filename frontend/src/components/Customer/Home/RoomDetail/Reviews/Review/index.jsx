import React, { useEffect, useState } from 'react';

const Review = ({ id, image, name, date, comment }) => {
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(() => {
        setFormattedDate(() => {
            const splittedDateAndTime = String(date).split('.')[0];
            const d = String(splittedDateAndTime).split('T')[0];
            const t = String(splittedDateAndTime).split('T')[1];
            return `${d} ${t}`;
        });
    }, [id, date]);

    return (
        <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-4">
                <div
                    className="rounded-circle overflow-hidden border"
                    style={{
                        width: '60px',
                        height: '60px',
                    }}
                >
                    <img src={image} alt="Avatar" className="w-full h-full object-fit-cover" />
                </div>
                <span>
                    <p className="fw-semibold">{name}</p>
                    <p
                        className="text-black-50"
                        style={{
                            fontSize: '.8rem',
                        }}
                    >
                        {formattedDate}
                    </p>
                </span>
            </div>
            <div>
                <p>{comment}</p>
            </div>
        </div>
    );
};

export default Review;
