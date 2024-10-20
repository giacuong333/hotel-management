import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';
import UserForm from './UserForm';
import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import { RotatingLines } from 'react-loader-spinner';
import { Button } from 'react-bootstrap';
import { useCheckPermission } from '~/providers/CheckPermissionProvider';

const User = () => {
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [pending, setPending] = useState(true);
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [clearSelectedRows, setClearSelectedRows] = useState(false);
    const [showPanel, setShowPanel] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [searchInput, setSearchInput] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [pendingDelete, setPendingDelete] = useState(false);
    const {
        createUser: hasPermissionCreate,
        updateUser: hasPermissionUpdate,
        deleteUser: hasPermissionDelete,
    } = useCheckPermission();

    // For deleting selected users
    useEffect(() => {
        const deleteAllUsers = async () => {
            try {
                // Create payload for deletion
                setPendingDelete(true);
                const payload = deleteAll.payload.map((userDelete) => ({ id: userDelete.id }));
                const url = 'http://localhost:5058/user';
                const response = await axios.delete(url, { data: payload });
                if (response?.status === 200) {
                    showToast(response?.data?.message, 'success');
                    setUsers(response?.data?.newUsers?.$values);
                    setSearchedUsers(response?.data?.newUsers?.$values);
                    reset();
                }
            } catch (error) {
                showToast(error?.response?.data?.message, 'error');
            } finally {
                setPendingDelete(false);
            }
        };

        deleteAll.yes && deleteAllUsers();
    }, [deleteAll.yes, deleteAll.payload]); // Include user.id in dependencies

    // For searching
    useEffect(() => {
        if (searchInput.trim() === '') {
            setSearchedUsers(users);
        } else {
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
                const url = 'http://localhost:5058/user';
                const headers = { headers: { 'Content-Type': 'application/json' } };
                const response = await axios.get(url, headers);
                if (response.status === 200) {
                    setUsers(response.data.$values || []);
                    setSearchedUsers(response.data.$values || []);
                }
            } catch (error) {
                console.log('Error fetching users:', error);
            } finally {
                setPending(false);
            }
        };

        const timeout = setTimeout(fetchUsers, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const handleTrashClicked = (id) => {
        setDeleteOne({ payload: id });
        setShowDeleteConfirm(true);
    };

    // Delete a user
    const deleteUser = async (payload) => {
        try {
            const response = await axios.delete(`http://localhost:5058/user/${payload}`);
            if (response.status === 200) {
                showToast(response?.data?.message, 'success');
                setUsers((prev) => prev.filter((user) => user.id !== payload));
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

    const handleEditClicked = (user) => {
        setSelectedUser(user);
        setShowPanel('edit');
    };

    const handleAddClicked = () => {
        setShowPanel('add');
        setSelectedUser(null);
    };

    const handleSetAvatar = async (userId, file) => {
        console.log(userId);
        if (!file) {
            showToast('Please select an image to upload', 'error');
            return;
        }

        const payload = new FormData();
        payload.append('userId', userId);
        payload.append('avatar', file);

        try {
            const url = 'http://localhost:5058/user/avatar';
            const response = await axios.post(url, payload);
            console.log(response);
            response?.status === 201 && showToast(response?.data?.obj?.message, 'success');
        } catch (error) {
            showToast(
                error?.response?.data?.message ||
                    error?.response?.obj ||
                    error?.response?.data?.obj?.message ||
                    'Something went wrong while setting avatar',
                'error',
            );
        }
    };

    const handleRowClicked = useCallback(async (e) => {
        const { id } = e;
        try {
            const response = await axios.get(`http://localhost:5058/user/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setSelectedUser(response?.data?.obj);
                setShowPanel('see');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }, []);

    const handleSelectedRowsChanged = ({ allSelected, selectedCount, selectedRows }) => {
        setDeleteAll({ count: selectedCount, payload: selectedRows });
        setClearSelectedRows(false);
    };

    const handleDeleteRowsSelected = () => {
        deleteAll.count !== 0 && setShowDeleteAllConfirm(true);
    };

    const handleUserAdded = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setSearchedUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const handleUserUpdated = (currentUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((prevUser) => (prevUser.id === currentUser.id ? { ...currentUser } : prevUser)),
        );
        setSearchedUsers((prevUsers) =>
            prevUsers.map((prevUser) => (prevUser.id === currentUser.id ? { ...currentUser } : prevUser)),
        );
    };

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setClearSelectedRows(true);
        setShowDeleteConfirm(false);
        setDeleteOne({ payload: null });
    };

    const columns = [
        {
            name: 'No',
            selector: (row) => row.no,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Phone number',
            selector: (row) => row.phoneNumber,
        },
        {
            name: 'Role',
            selector: (row) => row.roleName,
        },
        {
            name: 'Create time',
            selector: (row) => row.createdAt,
        },
    ];

    // Conditionally add Avatar column if update permission exists
    if (hasPermissionUpdate) {
        columns.push({
            name: 'Avatar',
            selector: (row) => row.avatar,
        });
    }

    // Conditionally add Actions column if update or delete permission exists
    if (hasPermissionUpdate || hasPermissionDelete) {
        columns.push({
            name: 'Actions',
            selector: (row) => row.actions,
        });
    }

    const data = searchedUsers?.map((user, index) => ({
        id: user?.id,
        no: index + 1,
        name: user?.name,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        roleName: user?.roles?.name,
        avatar: (
            <>
                <input
                    type="file"
                    hidden
                    id={`avatar-input-${user?.id}`}
                    onChange={(e) => handleSetAvatar(user?.id, e.target.files[0])}
                />
                {hasPermissionUpdate ? (
                    <Button
                        type="button"
                        variant="primary"
                        className={`w-full p-1 customer-primary-button bg-hover-white text-hover-black`}
                        style={{ fontSize: '12px' }}
                        onClick={() => document.getElementById(`avatar-input-${user?.id}`).click()}
                    >
                        Set avatar
                    </Button>
                ) : (
                    ''
                )}
            </>
        ),
        createdAt: new Date(user.createdAt).toLocaleString(),
        actions: (
            <>
                {hasPermissionUpdate ? (
                    <FiEdit
                        size={18}
                        className="cursor-pointer me-3"
                        onClick={() => handleEditClicked(user)}
                        style={{ color: '#80CBC4' }}
                    />
                ) : (
                    ''
                )}
                {hasPermissionDelete ? (
                    <BsTrash
                        size={18}
                        className="cursor-pointer"
                        onClick={() => handleTrashClicked(user.id)}
                        style={{ color: '#E57373' }}
                    />
                ) : (
                    ''
                )}
            </>
        ),
    }));

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between w-full py-4">
                {deleteAll.count === 0 ? (
                    hasPermissionCreate ? (
                        <FiPlus
                            size={30}
                            className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                            onClick={handleAddClicked}
                        />
                    ) : (
                        ''
                    )
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
                    progressPending={pending}
                    clearSelectedRows={clearSelectedRows}
                    progressComponent={
                        <RotatingLines
                            visible={true}
                            height="50"
                            width="50"
                            strokeColor="#e8bf96"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    }
                />
                {/* Show a toast */}
                {ToastContainer}

                {/* Show Form */}
                {showPanel && (
                    <UserForm
                        data={selectedUser}
                        type={showPanel}
                        isShowed={showPanel}
                        onClose={() => setShowPanel(false)}
                        onUserAdded={handleUserAdded}
                        onUserUpdated={handleUserUpdated}
                    />
                )}

                {/* Show confirmation when clicking on delete all users */}
                {showDeleteAllConfirm && (
                    <ConfirmPopup
                        header="Are you sure you want to delete all the selected users?"
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
                        header="Are you sure you want to delete the selected user?"
                        message="This action cannot be undone."
                        negativeChoice="Cancel"
                        positiveChoice="Delete"
                        isShow={showDeleteConfirm}
                        onYes={() => deleteUser(deleteOne.payload)}
                        onClose={reset}
                    />
                )}
            </>
        </div>
    );
};

export default User;
