import React from 'react';

const Review = ({ image, name, date, comment }) => {
    return (
        <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-4">
                <div
                    className="rounded-circle overflow-hidden"
                    style={{
                        width: '60px',
                        height: '60px',
                    }}
                >
                    <img src={image} alt="" className="w-full h-full object-fit-cover" />
                </div>
                <span>
                    <p className="fw-semibold">{name}</p>
                    <p
                        className="text-black-50"
                        style={{
                            fontSize: '.8rem',
                        }}
                    >
                        {date}
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
