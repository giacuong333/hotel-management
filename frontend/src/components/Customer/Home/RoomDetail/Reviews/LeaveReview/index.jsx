import React, { useState } from 'react';
import { useUser } from '~/providers/UserProvider';
import axios from 'axios';
import ToastContainer, { showToast } from '~/utils/showToast';
import { useNavigate, useParams } from 'react-router-dom';

import {
    isEmail,
    isEmpty,
    isPhoneNumber,
    isValidDate,
    isVerifyPassword,
    isNumberAndGreaterThanOrEqual,
} from '~/utils/formValidation';
const LeaveReview = ({ onReviewSubmitted }) => {
    const { user } = useUser();
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    const handleValidation = () => {
        const validationErrors = {};

        if (isEmpty(comment)) {
            validationErrors.comment = 'Comment is required';
        } else if (comment.trim().length <= 5) {
            validationErrors.comment = 'Comment must be more than 5 characters';
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmitClicked = async (e) => {
        e.preventDefault();

        const apiUrl = 'http://localhost:5058/review';
        if (handleValidation()) {
            const payload = {
                UserId: user.id,
                RoomId: id,
                Comment: comment,
            };
            console.log(payload);
            try {
                const response = await axios.post(`${apiUrl}/`, payload);
                if (response?.status === 201) {
                    showToast('Comment successfully', 'success');
                    setComment('');
                    if (onReviewSubmitted) onReviewSubmitted();
                } else if (response?.status === 202) {
                    showToast(response?.data?.message || 'You must stay in this room before leaving a review', 'error');
                }
            } catch (error) {
                const statusCode = error?.response?.status;
                if (statusCode === 409) {
                    showToast(error?.response?.data?.message || 'Conflict error', 'error');
                } else {
                    showToast(error?.message || 'Something went wrong', 'error');
                }
            }
        }
    };

    return (
        <div className="d-flex flex-column gap-2 my-5">
            <label htmlFor="comment" className="fw-semibold fs-5">
                Leave your comments here
            </label>
            <textarea
                className="border p-2 primary-bd-color-focus"
                id="comment"
                placeholder="Share your thoughts"
                style={{ outline: 'none' }}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmitClicked(e);
                    }
                }}
            ></textarea>
            <p className="text-danger">{errors.comment}</p>
        </div>
    );
};

export default LeaveReview;
