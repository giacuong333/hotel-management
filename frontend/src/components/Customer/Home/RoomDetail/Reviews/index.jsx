import React from 'react';
import Review from './Review';
import LeaveReview from './LeaveReview';

const Reviews = () => {
    return (
        <div className="d-flex flex-column gap-4">
            <h3>2 thoughts on “Alps Mountains Winter Cottage Monte Bianco in Aosta Valley”</h3>

            <>
                <Review
                    image="https://secure.gravatar.com/avatar/3a7b2f48bf15bf97c16a7bbaa7fc1db8?s=80&r=g"
                    name="Misty Mason"
                    date="June 14, 2017 at 8:07 am"
                    comment="So special place – for lovers of ancient villas! You’ll definitely spend your warmest winter here. thanks for such an awesome offer."
                />

                <Review
                    image="https://secure.gravatar.com/avatar/e913c28282474af166ee791c0f7fae7c?s=80&r=g"
                    name="Nathan Reynolds"
                    date="June 14, 2017 at 8:08 am"
                    comment="Beautiful cottage, thanks for the service and help in transfer!"
                />
            </>

            <>
                <LeaveReview />
            </>
        </div>
    );
};

export default Reviews;
