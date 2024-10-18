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

const Discount = () => {
    const [showPanel, setShowPanel] = useState('');
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [discount, setDiscounts] = useState([]);

    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [searchedDiscounts, setSearchedDiscounts] = useState([]);

    const columns = [
        {
            name: 'No',
            selector: (row) => row.no,
        },
        {
            name: 'Name Discount',
            selector: (row) => row.name,
        },
        {
            name: 'Start At',
            selector: (row) => row.startAt,
        },
        {
            name: 'End At',
            selector: (row) => row.endAt,
        },
        {
            name: 'Actions',
            selector: (row) => row.actions,
        },
    ];

    const data = discount?.map((discount, index) => ({
        id: discount.id,
        no: index + 1,
        name: discount.name,
        startAt: discount.startAt,
        endAt: discount.endAt,
        actions: (
            <>
                <FiEdit size={18} className="cursor-pointer me-3" onClick={() => handleEditClicked(Discount)} />
                <BsTrash size={18} className="cursor-pointer" onClick={() => handleTrashClicked(Discount.id)} />
            </>
        ),
    }));
    const handleTrashClicked = (id) => {
        setDeleteOne({ payload: id });
        setShowDeleteConfirm(true);
    };
    const handleEditClicked = (discount) => {
        setSelectedDiscount(discount);
        setShowPanel('edit');
    };

    const handleAddClicked = () => {
        setShowPanel('add');
        setSelectedDiscount(null);
    };

    const handleRowClicked = useCallback(async (e) => {
        const { id } = e;
        try {
            const response = await axios.get(`http://localhost:5058/discount/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setSelectedDiscount(response.data);
                setShowPanel('see');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }, []);

    const handleSelectedRowsChanged = ({ allSelected, selectedCount, selectedRows }) => {
        setDeleteAll({ count: selectedCount, payload: selectedRows });
    };

    const handleDeleteRowsSelected = () => {
        deleteAll.count !== 0 && setShowDeleteAllConfirm(true);
    };

    const handleUserAdded = (newUser) => {
        setDiscounts((prevUsers) => [...prevUsers, newUser]);
        setSearchedDiscounts((prevUsers) => [...prevUsers, newUser]);
    };

    const handleUserUpdated = (currentUser) => {
        setDiscounts((prevUsers) =>
            prevUsers.map((prevUser) => (prevUser.id === currentUser.id ? { ...currentUser } : prevUser)),
        );
        setSearchedDiscounts((prevUsers) =>
            prevUsers.map((prevUser) => (prevUser.id === currentUser.id ? { ...currentUser } : prevUser)),
        );
    };

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setDeleteOne({ payload: null });
        setShowDeleteConfirm(false);
    };
    //List Discount
    useEffect(() => {
        const ListDiscounts = async () => {
            try {
                const response = await axios.get('http://localhost:5058/discount');
                setDiscounts(response?.data?.$values);
            } catch (error) {
                console.error(error);
            }
        };
        ListDiscounts();
    }, []);
    //List Discount
    //Delete Discount
    const deleteDiscount = async (payload) => {
        try {
            const response = await axios.delete(`http://localhost:5058/discount/${payload}`);
            if (response.status === 200) {
                showToast(response?.data?.message, 'success');
                setDiscounts((prev) => prev.filter((discount) => discount.id !== payload));
                setSearchInput('');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            if (error?.response?.status === 403) {
                showToast(error?.response?.data?.message, 'error');
            } else if (error?.response?.status === 401) {
                showToast('You need to log in', 'error');
            } else {
                showToast(error?.response?.data?.message || 'Error deleting user', 'error');
            }
        } finally {
            reset();
        }
    };
    //Delete Discount
    return (
        <div>
            <div className="d-flex align-items-center justify-content-between w-full py-4">
                {deleteAll.count === 0 ? (
                    <FiPlus
                        size={30}
                        className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                        onClick={handleAddClicked}
                    />
                ) : (
                    <BsTrash
                        size={30}
                        className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                        onClick={handleDeleteRowsSelected}
                    />
                )}

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
            <DataTable columns={columns} data={data} pagination />
            {/* Show a toast */}
            {ToastContainer}

            {/* Show Form */}
            {/* {showPanel && (
                <UserForm
                    data={selectedUser}
                    type={showPanel}
                    isShowed={showPanel}
                    onClose={() => setShowPanel(false)}
                    onUserAdded={handleUserAdded}
                    onUserUpdated={handleUserUpdated}
                />
            )} */}
            {/* Show confirmation when clicking on delete a user*/}
            {showDeleteConfirm && (
                <ConfirmPopup
                    header="Are you sure you want to delete the selected user?"
                    message="This action cannot be undone."
                    negativeChoice="Cancel"
                    positiveChoice="Delete"
                    isShow={showDeleteConfirm}
                    onYes={() => deleteDiscount(discount.payload) }
                    onClose={reset}
                />
            )}
        </div>
    );
};

export default Discount;
