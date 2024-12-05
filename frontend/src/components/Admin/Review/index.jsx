import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

import { BsTrash } from 'react-icons/bs';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';

import PopupPanel from './ReviewForm';
import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import { useUser } from '~/providers/UserProvider';
import { useCheckPermission } from '../../../providers/CheckPermissionProvider';

const columns = [
    {
        name: 'No',
        selector: (row) => row.no,
    },
    {
        name: 'UserId',
        selector: (row) => row.userId,
        sortable: true,
    },
    {
        name: 'RoomId',
        selector: (row) => row.roomId,
    },
    {
        name: 'Comment',
        selector: (row) => row.comment,
    },

    {
        name: 'Actions',
        selector: (row) => row.actions,
    },
];

const Review = () => {
    const { deleteReview } = useCheckPermission();
    const [showPanel, setShowPanel] = useState('');
    const [selectedReview, setSelectedReview] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchedReviews, setSearchedReviews] = useState([]);
    const [deleteOne, setDeleteOne] = useState();

    const { user } = useUser();

    // For deleting
    useEffect(() => {
        const deleteAllReviews = async () => {
            try {
                // Create payload for deletion
                const payload = deleteAll.payload.map((reviewDelete) => ({ id: reviewDelete.id }));

                const response = await axios.delete('http://localhost:5058/review', { data: payload });
                console.log(response);
                if (response?.status === 200) {
                    showToast(response?.data?.message, 'success');
                    reset();
                    setReviews(response?.data?.newReviews?.$values);
                    setSearchedReviews(response?.data?.newReviews?.$values);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (deleteAll.yes) deleteAllReviews();
    }, [deleteAll.yes, deleteAll.payload, user.id]); // Include user.id in dependencies

    // For searching
    useEffect(() => {
        if (searchInput.trim() === '') {
            // If search input is empty, show all users
            setSearchedReviews(reviews);
        } else {
            // Otherwise, filter users based on search input
            const filteredReviews = reviews.filter(
                (review) =>
                    review.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    review.email.toLowerCase().includes(searchInput.toLowerCase()) ||
                    review.phoneNumber.toLowerCase().includes(searchInput.toLowerCase()),
            );
            setSearchedReviews(filteredReviews);
        }
    }, [searchInput, reviews]);

    // For fetching
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5058/review', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setReviews(response.data.$values || []);
                    setSearchedReviews(response.data.$values || []);
                }
            } catch (error) {
                console.log('Error fetching Reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const handleTrashClicked = (id) => {
        setDeleteOne(id);
        setShowDeleteConfirm(true);
    };

    // const handleTrashClicked = useCallback(async (id) => {
    //     try {
    //         const response = await axios.delete(`http://localhost:5058/review/${id}`);
    //         if (response.status === 200) {
    //             showToast(response?.data?.message, 'success');
    //             setReviews((prev) => prev.filter((review) => review.id !== id));
    //         }
    //     } catch (error) {
    //         console.error('Error deleting user:', error);
    //         showToast(error?.response?.data?.message || 'Error deleting user', 'error');
    //     }
    // }, []);
    const deleteReview_del = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5058/review/${id}`);
            if (response.status === 200) {
                showToast(response?.data?.message, 'success');
                setReviews((prev) => prev.filter((review) => review.id !== id));
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            showToast(error?.response?.data?.message || 'Error deleting user', 'error');
        } finally {
            reset();
        }
    };

    const handleRowClicked = useCallback(async (e) => {
        const { id } = e;
        try {
            const response = await axios.get(`http://localhost:5058/review/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setSelectedReview(response.data);
                setShowPanel('see');
            }
        } catch (error) {
            console.error('Error fetching Review details:', error);
        }
    }, []);

    const handleSelectedRowsChanged = ({ allSelected, selectedCount, selectedRows }) => {
        setDeleteAll({ count: selectedCount, payload: selectedRows });
    };

    const handleDeleteRowsSelected = () => {
        if (deleteAll.count !== 0) {
            setShowDeleteAllConfirm(true);
        }
    };

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setShowDeleteConfirm(false);
        setDeleteOne();
        setSearchInput('');
    };

    const data = searchedReviews?.map((review, index) => ({
        id: review.id,
        no: index + 1,
        userId: review.userId,
        roomId: review.roomId,
        comment: review.comment,
        createdAt: review.createdAt,

        actions: (
            <>
                {deleteReview === 1 ? (
                    <BsTrash size={18} className="cursor-pointer" onClick={() => handleTrashClicked(review.id)} />
                ) : (
                    <></>
                )}
            </>
        ),
    }));

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between w-full py-4">
                {deleteAll.count === 0 ? (
                    <div></div>
                ) : deleteReview === 1 ? (
                    <BsTrash
                        size={30}
                        className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                        onClick={handleDeleteRowsSelected}
                    />
                ) : (
                    <></>
                )}

                <FormGroup
                    id="search"
                    name="search"
                    type="text"
                    placeHolder="Search..."
                    Icon={IoSearchOutline}
                    customParentInputStyle="pe-2 rounded-1"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <>
                <DataTable
                    columns={columns}
                    data={data}
                    selectableRows
                    striped
                    highlightOnHover
                    pointerOnHover
                    pagination
                    sortIcon={<FaSortAlphaDownAlt />}
                    onRowClicked={handleRowClicked}
                    onSelectedRowsChange={handleSelectedRowsChanged}
                />
                <>
                    {ToastContainer}
                    <PopupPanel
                        data={selectedReview}
                        type={showPanel}
                        onClose={() => setShowPanel(false)}
                        isShowed={showPanel}
                    />
                    <ConfirmPopup
                        header="Are you sure you want to delete all the selected reviews?"
                        message="This action cannot be undone."
                        negativeChoice="Cancel"
                        positiveChoice="Delete"
                        isShow={showDeleteAllConfirm}
                        onYes={() => setDeleteAll((prev) => ({ ...prev, yes: true }))}
                        onClose={() => setShowDeleteAllConfirm(false)}
                    />
                    <ConfirmPopup
                        header="Are you sure you want to delete the selected Review?"
                        message="This action cannot be undone."
                        negativeChoice="Cancel"
                        positiveChoice="Delete"
                        isShow={showDeleteConfirm}
                        onYes={() => deleteReview_del(deleteOne)}
                        onClose={reset}
                    />
                </>
            </>
        </div>
    );
};

export default Review;
