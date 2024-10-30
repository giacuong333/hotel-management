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
import Button from 'react-bootstrap/Button';
import { useCheckPermission } from '~/providers/CheckPermissionProvider';
import { RotatingLines } from 'react-loader-spinner';
const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [searchedFeedBack, setSearchedFeedBack] = useState([]);
    const {
      deleteDiscount: hasPermissionDelete,
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
            selector: (row) => row.Description,
        },
        {
            name: 'Create At',
            selector: (row) => row.CreateAt,
        },
        {
            name: 'Actions',
            selector: (row) => row.actions,
        },
    ];
    const data = searchedFeedBack?.map((feedbacks, index) => ({
      id: feedbacks.id,
      no: index + 1,
      nameUser: feedbacks.userName,
      nameRoom: feedbacks.roomName,
      Description: feedbacks.description,
      CreateAt: feedbacks.createdAt,
      actions: (
            { hasPermissionDelete } && (
          <>
              <BsTrash size={18} className="cursor-pointer" onClick={() => handleTrashClicked(feedbacks.id)} />
          </>
            )
      ),
      
  }));
    
    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setDeleteOne({ payload: null });
        setShowDeleteConfirm(false);
    };
    //search Feedback
    useEffect(() => {
      if (searchInput.trim() === '') {
          setSearchedFeedBack(feedbacks);
      } else {
          const filteredFeedBack = feedbacks.filter(
              (feedback) =>
                  (feedback.userName.toLowerCase().includes(searchInput.toLowerCase())) ||
                  feedback.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                  feedback.roomName.toLowerCase().includes(searchInput.toLowerCase()),
          );
          setSearchedFeedBack(filteredFeedBack);
      }
  }, [searchInput, feedbacks]);
    //search Feedback
    //List Feedback
    useEffect(() => {
        const ListFeedBacks = async () => {
            try {
                const response = await axios.get('http://localhost:5058/feedBack');
                setFeedbacks(response?.data?.$values);
            } catch (error) {
                console.error(error);
            }
        };
        ListFeedBacks();
    }, []);
    //List Feedback
    //Delete Feedback
    const handleDeleteRowsSelected = () => {
      deleteAll.count !== 0 && setShowDeleteAllConfirm(true);
  };
    const handleTrashClicked = (id) => {
        setDeleteOne({ payload: id });
        setShowDeleteConfirm(true);
    };
    const handleDeleteConfirm = () => {
        if (!deleteOne || !deleteOne.payload) {
            console.error('Invalid deleteOne payload:', deleteOne);
            return;
        }
        deleteFeedBack(deleteOne.payload);
    };
    const deleteFeedBack = async (payload) => {
        try {
            const response = await axios.delete(`http://localhost:5058/feedback/${payload}`);
            if (response.status === 200) {
                showToast(response?.data?.message, 'success');
                setFeedbacks((prev) => prev.filter((discount) => discount.id !== payload));
                setSearchInput('');
            }
        } catch (error) {
            console.error('Error deleting Discount:', error);
            if (error?.response?.status === 403) {
                showToast(error?.response?.data?.message, 'error');
            } else if (error?.response?.status === 401) {
                showToast('You need to log in', 'error');
            } else {
                showToast(error?.response?.data?.message || 'Error deleting Discount', 'error');
            }
        } finally {
            reset();
        }
    };
    useEffect(() => {
        const deleteAllDiscount = async () => {
            try {
                setPendingDelete(true);
                // Create payload for deletion
                const payload = deleteAll.payload.map((discountDelete) => discountDelete.id);
                console.log('Delete payload', payload);
                const url = 'http://localhost:5058/discount';
                const response = await axios.delete(url, { data: payload });
                console.log('Delete response', response);
                if (response?.status === 200) {
                    showToast(response?.data?.message, 'success');
                    setFeedbacks(response?.data?.newDiscounts?.$values);
                    setSearchedFeedBack(response?.data?.newDiscounts?.$values);
                    reset();
                }
            } catch (error) {
                showToast(error?.response?.data?.message || 'Error deleting FeedBack', 'error');
            } finally {
                setPendingDelete(false);
            }
        };

        if (deleteAll.yes) {
            deleteAllDiscount();
        }
    }, [deleteAll.yes, deleteAll.payload]);
    //Delete Feedback
    return (
        <div>
            <div className="d-flex align-items-center justify-content-between w-full py-4">
                {deleteAll.count === 0}
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
            <DataTable columns={columns} data={data} selectableRows pagination />
        </div>
    );
};

export default Feedback;
