import React from 'react';

import { useUser } from '~/providers/UserProvider';

const LeaveReview = () => {
    const { user } = useUser();

    return (
        <div className="d-flex flex-column gap-2 my-5">
            <label htmlFor="comment" className="fw-semibold fs-5">
                Leave your comments here
            </label>
            <textarea
                className="border p-2 primary-bd-color-focus"
                id="comment"
                placeholder="Share your thoughts"
                style={{
                    outline: 'none',
                }}
            ></textarea>
        </div>
    );
};

export default LeaveReview;
