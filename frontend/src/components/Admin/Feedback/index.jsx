import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';

import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import { useUser } from '~/providers/UserProvider';
import Button from 'react-bootstrap/Button';
import { useCheckPermission } from '~/providers/CheckPermissionProvider';
import { RotatingLines } from 'react-loader-spinner';

const Feedback = () => {
    const [showPanel, setShowPanel] = useState('');
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [clearSelectedRows, setClearSelectedRows] = useState(false);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [searchedFeedbacks, setSearchedFeedbacks] = useState([]);
    const {
        deleteFeedback: hasPermissionDelete,
    } = useCheckPermission();
    const columns = [
        {
            name: 'No',
            selector: (row) => row.no,
        },
        {
            name: 'Name User',
            selector: (row) => row.nameUser,
        },
        {
            name: 'Name Room',
            selector: (row) => row.nameRoom,
        },
        {
            name: 'Description',
            selector: (row) => row.description,
        },
        {
            name: 'Create At',
            selector: (row) => row.createAt,
        },
    ];
   
    const data = searchedFeedbacks?.map((feedback, index) => ({
        id: feedback?.id,
        no: index + 1,
        nameUser: feedback?.userName,
        nameRoom: feedback?.roomName,
        description: feedback?.description,
        createAt: feedback?.createdAt,
        actions: (
            <>
                
                    <FiEdit
                        size={18}
                        className="cursor-pointer me-3"
                        onClick={() => handleEditClicked(feedback)}
                        style={{ color: '#80CBC4' }}
                    />
                
                {hasPermissionDelete ? (
                    <BsTrash
                        size={18}
                        className="cursor-pointer"
                        onClick={() => handleTrashClicked(feedback.id)}
                        style={{ color: '#E57373' }}
                    />
                ) : (
                    ''
                )}
            </>
        ),
    }));

    const handleEditClicked = (feedback) => {
        setSelectedFeedback(feedback);
        setShowPanel('edit');
    };

    const handleAddClicked = () => {
        setShowPanel('add');
        setSelectedFeedback(null);
    };

    const handleRowClicked = useCallback(async (e) => {
        const { id } = e;
        try {
            const response = await axios.get(`http://localhost:5058/feedback/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setSelectedFeedback(response.data);
                setShowPanel('see');
            }
        } catch (error) {
            console.error('Error fetching Feedback details:', error);
        }
    }, []);

    const handleDeleteRowsSelected = () => {
        deleteAll.count !== 0 && setShowDeleteAllConfirm(true);
    };

    const handleFeedbackAdded = (newFeedback) => {
        setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
        setSearchedFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
    };

    const handleFeedbackUpdated = (currentFeedback) => {
        setFeedbacks((prevFeedbacks) =>
            prevFeedbacks.map((prevFeedbacks) =>
                prevFeedbacks.id === currentFeedback.id ? { ...currentFeedback } : prevFeedbacks,
            ),
        );
        setSearchedFeedbacks((prevFeedbacks) =>
            prevFeedbacks.map((prevFeedbacks) =>
                prevFeedbacks.id === currentFeedback.id ? { ...currentFeedback } : prevFeedbacks,
            ),
        );
    };

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setDeleteOne({ payload: null });
        setShowDeleteConfirm(false);
    };

    // Search Feedback
    useEffect(() => {
        if (searchInput.trim() === '') {
            setSearchedFeedbacks(feedbacks);
        } else {
            const filteredFeedback = feedbacks.filter(
                (feedback) =>
                    feedback.userName.toLowerCase().includes(searchInput.toLowerCase()) ||
                    feedback.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                    feedback.roomName.toLowerCase().includes(searchInput.toLowerCase()),
            );
            setSearchedFeedbacks(filteredFeedback);
        }
    }, [searchInput, feedbacks]);

    // List Feedback
    useEffect(() => {
        const ListFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5058/feedback');
                setFeedbacks(response?.data?.$values);
            } catch (error) {
                console.error(error);
            }
        };
        ListFeedbacks();
    }, []);

    // Delete Feedback
    const handleTrashClicked = (id) => {
        setDeleteOne({ payload: id });
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        if (!deleteOne || !deleteOne.payload) {
            console.error('Invalid deleteOne payload:', deleteOne);
            return;
        }
        deleteFeedback(deleteOne.payload);
    };

    const deleteFeedback = async (payload) => {
        try {
            const response = await axios.delete(`http://localhost:5058/feedback/${payload}`);
            if (response.status === 200) {
                showToast(response?.data?.message, 'success');
                setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== payload));
                setSearchedFeedbacks((prev) => prev.filter((feedback) => feedback.id !== payload));
                setSearchInput('');
            }
        } catch (error) {
            console.error('Error deleting Feedback:', error);
            if (error?.response?.status === 403) {
                showToast(error?.response?.data?.message, 'error');
            } else if (error?.response?.status === 401) {
                showToast('You need to log in', 'error');
            } else {
                showToast(error?.response?.data?.message || 'Error deleting Feedback', 'error');
            }
        } finally {
            reset();
        }
    };

    useEffect(() => {
        const deleteAllFeedback = async () => {
            try {
                setPendingDelete(true);
                // Create payload for deletion
                const payload = deleteAll.payload.map((feedbackDelete) => feedbackDelete.id);
                console.log('Delete payload', payload);
                const url = 'http://localhost:5058/feedback';
                const response = await axios.delete(url, { data: payload });
                console.log('Delete response', response);
                if (response?.status === 200) {
                    showToast(response?.data?.message, 'success');
                    setFeedbacks((prev) => prev.filter((feedback) => !payload.includes(feedback.id)));
                    setSearchedFeedbacks((prev) => prev.filter((feedback) => !payload.includes(feedback.id)));
                    reset();
                }
            } catch (error) {
                showToast(error?.response?.data?.message || 'Error deleting Feedback', 'error');
            } finally {
                setPendingDelete(false);
            }
        };

        console.log('deleteAll.yes:', deleteAll.yes);
        if (deleteAll.yes) {
            deleteAllFeedback();
        }
    }, [deleteAll.yes, deleteAll.payload]);

    const handleSelectedRowsChanged = ({ allSelected, selectedCount, selectedRows }) => {
        setDeleteAll({ count: selectedCount, payload: selectedRows });
        setClearSelectedRows(false);
    };

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between w-full py-4">
                     <BsTrash
                        size={30}
                        className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                        onClick={handleDeleteRowsSelected}
                    />

                <FormGroup
                    id="search"
                    name="search"
                    value={searchInput}
                    type="text"
                    placeHolder="Search..."
                    Icon={IoSearchOutline}
                    customParentInputStyle="pe-2 rounded-1"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <DataTable
                columns={columns}
                data={data}
                selectableRows
                onRowClicked={handleRowClicked}
                onSelectedRowsChange={handleSelectedRowsChanged}
                clearSelectedRows={clearSelectedRows}
                pagination
            />
            {/* Show a toast */}
            {ToastContainer}

           
            {showDeleteAllConfirm && (
                <ConfirmPopup
                    header="Are you sure you want to delete all the selected Feedbacks?"
                    message="This action cannot be undone."
                    negativeChoice="Cancel"
                    positiveChoice={
                        pendingDelete ? (
                            <RotatingLines
                                visible={true}
                                height="22"
                                width="22"
                                strokeColor="#ffffff"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        ) : (
                            'Delete'
                        )
                    }
                    isShow={showDeleteAllConfirm}
                    onYes={() => setDeleteAll((prev) => ({ ...prev, yes: true }))}
                    onClose={() => setShowDeleteAllConfirm(false)}
                />
            )}
            {/* Show confirmation when clicking on delete a user*/}
            {showDeleteConfirm && (
                <ConfirmPopup
                    header="Are you sure you want to delete the selected Feedback?"
                    message="This action cannot be undone."
                    negativeChoice="Cancel"
                    positiveChoice="Delete"
                    isShow={showDeleteConfirm}
                    onYes={handleDeleteConfirm}
                    onClose={reset}
                />
            )}
        </div>
    );
};

export default Feedback;