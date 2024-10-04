import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';

import PopupPanel from './ReviewForm';
import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import { useUser } from '~/providers/UserProvider';

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
        name: 'Create time',
        selector: (row) => row.createdAt,
    },
    {
        name: 'Actions',
        selector: (row) => row.actions,
    },
];

const User = () => {
    const [showPanel, setShowPanel] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);

    const { user } = useUser();

    // For deleting
    useEffect(() => {
        const deleteAllUsers = async () => {
            try {
                // Create payload for deletion
                const payload = deleteAll.payload.map((userDelete) => ({ id: userDelete.id }));

                const response = await axios.delete('http://localhost:5058/user', { data: payload });
                console.log(response);
                if (response?.status === 200) {
                    showToast(response?.data?.message, 'success');
                    reset();
                    setUsers(response?.data?.newUsers?.$values);
                    setSearchedUsers(response?.data?.newUsers?.$values);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (deleteAll.yes) deleteAllUsers();
    }, [deleteAll.yes, deleteAll.payload, user.id]); // Include user.id in dependencies

    // For searching
    useEffect(() => {
        if (searchInput.trim() === '') {
            // If search input is empty, show all users
            setSearchedUsers(users);
        } else {
            // Otherwise, filter users based on search input
            const filteredUsers = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.phoneNumber.toLowerCase().includes(searchInput.toLowerCase()),
            );
            setSearchedUsers(filteredUsers);
        }
    }, [searchInput, users]);

    // For fetching
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5058/review', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setUsers(response.data.$values || []);
                    setSearchedUsers(response.data.$values || []);
                }
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleTrashClicked = useCallback(async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5058/review/${id}`);
            if (response.status === 200) {
                showToast(response?.data?.message, 'success');
                setUsers((prev) => prev.filter((user) => user.id !== id));
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            showToast(error?.response?.data?.message || 'Error deleting user', 'error');
        }
    }, []);

    const handleEditClicked = (user) => {
        setSelectedUser(user);
        setShowPanel('edit');
    };

    const handleAddClicked = async () => {
        setShowPanel('add');
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
                setSelectedUser(response.data);
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
        if (deleteAll.count !== 0) {
            setShowDeleteAllConfirm(true);
        }
    };

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
    };

    const data = searchedUsers?.map((user, index) => ({
        id: user.id,
        no: index + 1,
        userId: user.userId,
        roomId: user.roomId,
        comment: user.comment,

        createdAt: new Date(user.createdAt).toLocaleString(),
        actions: (
            <>
                {/* <FiEdit size={18} className="cursor-pointer me-3" onClick={() => handleEditClicked(user)} /> */}
                <BsTrash size={18} className="cursor-pointer" onClick={() => handleTrashClicked(user.id)} />
            </>
        ),
    }));

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
                    pagination
                    sortIcon={<FaSortAlphaDownAlt />}
                    onRowClicked={handleRowClicked}
                    onSelectedRowsChange={handleSelectedRowsChanged}
                />
                <>
                    {ToastContainer}
                    {showPanel && (
                        <PopupPanel
                            data={selectedUser}
                            type={showPanel}
                            onClose={() => setShowPanel(false)}
                            isShowed={showPanel}
                        />
                    )}
                    {showDeleteAllConfirm && (
                        <ConfirmPopup
                            header="Are you sure you want to delete all the selected users?"
                            message="This action cannot be undone."
                            negativeChoice="Cancel"
                            positiveChoice="Delete"
                            isShow={showDeleteAllConfirm}
                            onYes={() => setDeleteAll((prev) => ({ ...prev, yes: true }))}
                            onClose={() => setShowDeleteAllConfirm(false)}
                        />
                    )}
                </>
            </>
        </div>
    );
};

export default User;
