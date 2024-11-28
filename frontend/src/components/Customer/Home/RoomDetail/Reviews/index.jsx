import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from './Review';
import LeaveReview from './LeaveReview';
import { useParams } from 'react-router-dom';

const Reviews = () => {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5058/review/getReviewsByRoomId', {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    roomId: id,
                },
            });
            if (response.status === 200) {
                setReviews(response.data.$values || []);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [id]);

    return (
        <div className="d-flex flex-column gap-4">
            <h3>{reviews.length} thoughts on “Alps Mountains Winter Cottage Monte Bianco in Aosta Valley”</h3>
            {reviews.map((review, index) => {
                console.log('Review', review);
                return (
                    <Review
                        key={index}
                        id={id}
                        image={review?.image || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
                        name={review?.userName || 'Anonymous'}
                        date={review?.createdAt || 'Unknown date'}
                        comment={review?.comment || 'No comment provided'}
                    />
                );
            })}

            <LeaveReview onReviewSubmitted={fetchReviews} />
        </div>
    );
};

export default Reviews;
