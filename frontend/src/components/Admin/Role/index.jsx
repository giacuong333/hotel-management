import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import RolepermissionModel from './RolepermissionModel.js';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { FaUserShield } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';

import PopupPanel from './RoleForm';
import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import { useUser } from '~/providers/UserProvider';

import Modal from 'react-bootstrap/Modal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
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
        name: 'Actions',
        selector: (row) => row.actions,
    },
];

const User = () => {
    const [showPermission, setShowPermission] = useState(false);

    const handleClosePermission = () => setShowPermission(false);
    const handleShowPermission = () => setShowPermission(true);

    const [showPanel, setShowPanel] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const { user } = useUser();

    // permission UseState
    const [idRole, setIdRole] = useState();

    const [readUser, setReadUser] = useState();
    const [createUser, setCreateUser] = useState();
    const [updateUser, setUpdateUser] = useState();
    const [deleteUser, setDeleteUser] = useState();

    const [readRoom, setReadRoom] = useState();
    const [createRoom, setCreateRoom] = useState();
    const [updateRoom, setUpdateRoom] = useState();
    const [deleteRoom, setDeleteRoom] = useState();

    const [readBooking, setReadBooking] = useState();
    const [createBooking, setCreateBooking] = useState();
    const [updateBooking, setUpdateBooking] = useState();
    const [deleteBooking, setDeleteBooking] = useState();

    const [readDiscount, setReadDiscount] = useState();
    const [createDiscount, setCreateDiscount] = useState();
    const [updateDiscount, setUpdateDiscount] = useState();
    const [deleteDiscount, setDeleteDiscount] = useState();

    const [readFeedBack, setReadFeedBack] = useState();
    const [createFeedBack, setCreateFeedBack] = useState();
    const [updateFeedBack, setUpdateFeedBack] = useState();
    const [deleteFeedBack, setDeleteFeedBack] = useState();

    const [readGallery, setReadGallery] = useState();
    const [createGallery, setCreateGallery] = useState();
    const [updateGallery, setUpdateGallery] = useState();
    const [deleteGallery, setDeleteGallery] = useState();

    const [readReceipt, setReadReceipt] = useState();
    const [createReceipt, setCreateReceipt] = useState();
    const [updateReceipt, setUpdateReceipt] = useState();
    const [deleteReceipt, setDeleteReceipt] = useState();

    const [readReview, setReadReview] = useState();
    const [createReview, setCreateReview] = useState();
    const [updateReview, setUpdateReview] = useState();
    const [deleteReview, setDeleteReview] = useState();

    const [readService, setReadService] = useState();
    const [createService, setCreateService] = useState();
    const [updateService, setUpdateService] = useState();
    const [deleteService, setDeleteService] = useState();

    const [readAdditionalFee, setReadAdditionalFee] = useState();
    const [createAdditionalFee, setCreateAdditionalFee] = useState();
    const [updateAdditionalFee, setUpdateAdditionalFee] = useState();
    const [deleteAdditionalFee, setDeleteAdditionalFee] = useState();

    const [readRole, setReadRole] = useState();
    const [createRole, setCreateRole] = useState();
    const [updateRole, setUpdateRole] = useState();
    const [deleteRole, setDeleteRole] = useState();

    const [readStatistic, setReadStatistic] = useState();
    const [assigningPermissions, setAssigningPermissions] = useState();
    const [roleAssignment, setRoleAssignment] = useState();

    function clearPermission() {
        setIdRole();
        setReadUser();

        setCreateUser();
        setUpdateUser();

        setDeleteUser();

        setReadRoom();

        setCreateRoom();

        setUpdateRoom();

        setDeleteRoom();

        setReadBooking();

        setCreateBooking();

        setUpdateBooking();

        setDeleteBooking();

        setReadDiscount();

        setCreateDiscount();

        setUpdateDiscount();

        setDeleteDiscount();

        setReadFeedBack();

        setCreateFeedBack();

        setUpdateFeedBack();

        setDeleteFeedBack();

        setReadGallery();

        setCreateGallery();
        setUpdateGallery();
        setDeleteGallery();

        setReadReceipt();
        setCreateReceipt();
        setCreateReceipt();
        setDeleteReceipt();
        setReadReview();
        setCreateReview();
        setUpdateReview();
        setDeleteReview();

        setReadService();
        setCreateService();
        setUpdateService();
        setDeleteService();
        setReadAdditionalFee();
        setCreateAdditionalFee();

        setUpdateAdditionalFee();

        setDeleteAdditionalFee();

        setReadRole();

        setCreateRole();

        setUpdateRole();

        setDeleteRole();

        setReadStatistic();
        setAssigningPermissions();
        setRoleAssignment();
    }

    function handlePermissionChange(e, Action) {
        if (e.target.checked) {
            Action(1);
        } else {
            Action();
        }
    }

    // For deleting
    useEffect(() => {
        const deleteAllUsers = async () => {
            try {
                // Create payload for deletion
                const payload = deleteAll.payload.map((userDelete) => ({ id: userDelete.id }));

                const response = await axios.delete('http://localhost:5058/role', { data: payload });
                console.log(response);
                if (response?.status === 200) {
                    showToast(response?.data?.message, 'success');
                    reset();
                    setUsers(response?.data?.newRoles?.$values);
                    setSearchedUsers(response?.data?.newRoles?.$values);
                }
            } catch (error) {
                console.log(error);
                showToast(
                    error?.response?.data?.message ||
                        'Unable to delete. A selected role is already assigned to the user.',
                    'error',
                );
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
            const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchInput.toLowerCase()));
            setSearchedUsers(filteredUsers);
        }
    }, [searchInput, users]);

    // For fetching
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5058/role', {
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
            const response = await axios.delete(`http://localhost:5058/role/${id}`);
            if (response.status === 200) {
                showToast(response?.data?.message, 'success');
                setUsers((prev) => prev.filter((user) => user.id !== id));
            }
        } catch (error) {
            console.error('Error deleting role:', error);
            showToast(
                error?.response?.data?.message || 'Unable to delete.This role has been assigned to the user.',
                'error',
            );
        }
    }, []);

    const createPermissionsList = () => {
        const permissionsList = [];

        if (readUser === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 1, 'User'));
        }
        if (createUser === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 2, 'User'));
        }
        if (updateUser === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 3, 'User'));
        }
        if (deleteUser === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 4, 'User'));
        }
        if (readRoom === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 5, 'Room'));
        }
        if (createRoom === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 6, 'Room'));
        }
        if (updateRoom === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 7, 'Room'));
        }
        if (deleteRoom === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 8, 'Room'));
        }
        if (readBooking === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 9, 'Booking'));
        }
        if (createBooking === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 10, 'Booking'));
        }
        if (updateBooking === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 11, 'Booking'));
        }
        if (deleteBooking === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 12, 'Booking'));
        }
        if (readDiscount === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 13, 'Discount'));
        }
        if (createDiscount === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 14, 'Discount'));
        }
        if (updateDiscount === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 15, 'Discount'));
        }
        if (deleteDiscount === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 16, 'Discount'));
        }
        if (readFeedBack === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 17, 'FeedBack'));
        }
        if (createFeedBack === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 18, 'FeedBack'));
        }
        if (updateFeedBack === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 19, 'FeedBack'));
        }
        if (deleteFeedBack === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 20, 'FeedBack'));
        }
        if (readGallery === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 21, 'Gallery'));
        }
        if (createGallery === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 22, 'Gallery'));
        }
        if (updateGallery === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 23, 'Gallery'));
        }
        if (deleteGallery === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 24, 'Gallery'));
        }
        if (readReceipt === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 25, 'Receipt'));
        }
        if (createReceipt === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 26, 'Receipt'));
        }
        if (updateReceipt === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 27, 'Receipt'));
        }
        if (deleteReceipt === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 28, 'Receipt'));
        }
        if (readReview === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 29, 'Review'));
        }
        if (createReview === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 30, 'Review'));
        }
        if (updateReview === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 31, 'Review'));
        }
        if (deleteReview === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 32, 'Review'));
        }
        if (readService === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 33, 'Service'));
        }
        if (createService === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 34, 'Service'));
        }
        if (updateService === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 35, 'Service'));
        }
        if (deleteService === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 36, 'Service'));
        }
        if (readAdditionalFee === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 37, 'AdditionalFee'));
        }
        if (createAdditionalFee === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 38, 'AdditionalFee'));
        }
        if (updateAdditionalFee === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 39, 'AdditionalFee'));
        }
        if (deleteAdditionalFee === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 40, 'AdditionalFee'));
        }
        if (readStatistic === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 41, 'Statistic'));
        }
        if (readRole === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 42, 'Role'));
        }
        if (createRole === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 43, 'Role'));
        }
        if (updateRole === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 44, 'Role'));
        }
        if (deleteRole === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 45, 'Role'));
        }
        if (assigningPermissions === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 46, 'AssigningPermissions'));
        }
        if (roleAssignment === 1) {
            permissionsList.push(new RolepermissionModel(null, idRole, 47, 'RoleAssignment'));
        }

        return permissionsList;
    };

    // Usage
    const handleSave = async () => {
        const permissionsList = createPermissionsList();

        try {
            const response = await axios.post('http://localhost:5058/rolepermission', permissionsList, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                showToast('Permissions saved successfully', 'success');
            }
        } catch (error) {
            console.error('Error saving permissions:', error);
            showToast('Failed to save permissions', 'error');
        }
    };

    const handleRowClickedPermission = useCallback(async (id) => {
        try {
            const response = await axios.get(`http://localhost:5058/rolepermission/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data.$values);

            if (response.status === 200 && response.data.$values && Array.isArray(response.data.$values)) {
                //reset
                clearPermission();

                setIdRole(id);

                response.data.$values.forEach((permission) => {
                    switch (permission.permissionId) {
                        case 1:
                            setReadUser(1);
                            break;
                        case 2:
                            setCreateUser(1);
                            break;
                        case 3:
                            setUpdateUser(1);
                            break;
                        case 4:
                            setDeleteUser(1);
                            break;
                        case 5:
                            setReadRoom(1);
                            break;
                        case 6:
                            setCreateRoom(1);
                            break;
                        case 7:
                            setUpdateRoom(1);
                            break;
                        case 8:
                            setDeleteRoom(1);
                            break;
                        case 9:
                            setReadBooking(1);
                            break;
                        case 10:
                            setCreateBooking(1);
                            break;
                        case 11:
                            setUpdateBooking(1);
                            break;
                        case 12:
                            setDeleteBooking(1);
                            break;
                        case 13:
                            setReadDiscount(1);
                            break;
                        case 14:
                            setCreateDiscount(1);
                            break;
                        case 15:
                            setUpdateDiscount(1);
                            break;
                        case 16:
                            setDeleteDiscount(1);
                            break;
                        case 17:
                            setReadFeedBack(1);
                            break;
                        case 18:
                            setCreateFeedBack(1);
                            break;
                        case 19:
                            setUpdateFeedBack(1);
                            break;
                        case 20:
                            setDeleteFeedBack(1);
                            break;
                        case 21:
                            setReadGallery(1);
                            break;
                        case 22:
                            setCreateGallery(1);
                            break;
                        case 23:
                            setUpdateGallery(1);
                            break;
                        case 24:
                            setDeleteGallery(1);
                            break;
                        case 25:
                            setReadReceipt(1);
                            break;
                        case 26:
                            setCreateReceipt(1);
                            break;
                        case 27:
                            setUpdateReceipt(1);
                            break;
                        case 28:
                            setDeleteReceipt(1);
                            break;

                        case 29:
                            setReadReview(1);
                            break;
                        case 30:
                            setCreateReview(1);
                            break;
                        case 31:
                            setUpdateReview(1);
                            break;
                        case 32:
                            setDeleteReview(1);
                            break;
                        case 33:
                            setReadService(1);
                            break;
                        case 34:
                            setCreateService(1);
                            break;
                        case 35:
                            setUpdateService(1);
                            break;
                        case 36:
                            setDeleteService(1);
                            break;
                        case 37:
                            setReadAdditionalFee(1);
                            break;
                        case 38:
                            setCreateAdditionalFee(1);
                            break;
                        case 39:
                            setUpdateAdditionalFee(1);
                            break;
                        case 40:
                            setDeleteAdditionalFee(1);
                            break;
                        case 41:
                            setReadStatistic(1);
                            break;
                        case 42:
                            setReadRole(1);
                            break;
                        case 43:
                            setCreateRole(1);
                            break;
                        case 44:
                            setUpdateRole(1);
                            break;
                        case 45:
                            setDeleteRole(1);
                            break;
                        case 46:
                            setAssigningPermissions(1);
                            break;
                        case 47:
                            setRoleAssignment(1);
                            break;
                        default:
                            break;
                    }
                });
            } else {
                console.error('No permissions found or data is not in expected format.');
            }
        } catch (error) {
            console.error('Error fetching role permissions:', error);
        }
    }, []);

    function handleUpdate(id) {
        const url = `http://localhost:5058/rolepermission/${id}`;
        // const data = {
        //     id: id,
        //     name: editName,
        //     age: editAge,
        //     isActive: editIsActive,
        // };
        // axios
        //     .put(url, data)
        //     .then((result) => {
        //         handleClose();
        //         getData();
        //         clear();
        //         toast.success('Update success');
        //     })
        //     .catch((error) => {
        //         toast.error(error);
        //     });
    }

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
            const response = await axios.get(`http://localhost:5058/role/${id}`, {
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

    const handleUserAdded = (newRole) => {
        setUsers((prevUsers) => [...prevUsers, newRole]);
        setSearchedUsers((prevUsers) => [...prevUsers, newRole]);
    };

    const handleUserUpdated = (currentRole) => {
        setUsers((prevUsers) =>
            prevUsers.map((prevUser) => (prevUser.id === currentRole.id ? { ...currentRole } : prevUser)),
        );
        setSearchedUsers((prevUsers) =>
            prevUsers.map((prevUser) => (prevUser.id === currentRole.id ? { ...currentRole } : prevUser)),
        );
    };

    const handelePermison = (id) => {
        console.log('Permission ID:', id);
        handleShowPermission();
        handleRowClickedPermission(id);
    };

    const data = searchedUsers?.map((user, index) => ({
        id: user.id,
        no: index + 1,
        name: user.name,

        actions: (
            <>
                <FaUserShield size={18} className="cursor-pointer me-3" onClick={() => handelePermison(user.id)} />
                <FiEdit size={18} className="cursor-pointer me-3" onClick={() => handleEditClicked(user)} />
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

                    {/* Modal */}

                    <Modal show={showPermission} onHide={handleClosePermission} animation={false} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Permisson</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        User
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-user-${type}`}
                                                        label={`Read User`}
                                                        checked={readUser === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadUser)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-user-${type}`}
                                                        label={`Create User`}
                                                        checked={createUser === 1}
                                                        onChange={(e) => handlePermissionChange(e, setCreateUser)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-user-${type}`}
                                                        label={`Update User`}
                                                        checked={updateUser === 1}
                                                        onChange={(e) => handlePermissionChange(e, setUpdateUser)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-user-${type}`}
                                                        label={`Delete User`}
                                                        checked={deleteUser === 1}
                                                        onChange={(e) => handlePermissionChange(e, setDeleteUser)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Room
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-Room-${type}`}
                                                        label={`Read Room`}
                                                        checked={readRoom === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadRoom)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-Room-${type}`}
                                                        label={`Create Room`}
                                                        checked={createRoom === 1}
                                                        onChange={(e) => handlePermissionChange(e, setCreateRoom)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-Room-${type}`}
                                                        label={`Update Room`}
                                                        checked={updateRoom === 1}
                                                        onChange={(e) => handlePermissionChange(e, setUpdateRoom)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-Room-${type}`}
                                                        label={`Delete Room`}
                                                        checked={deleteRoom === 1}
                                                        onChange={(e) => handlePermissionChange(e, setDeleteRoom)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Booking
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-Booking-${type}`}
                                                        label={`Read Booking`}
                                                        checked={readBooking === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadBooking)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-Booking-${type}`}
                                                        label={`Create Booking`}
                                                        checked={createBooking === 1}
                                                        onChange={(e) => handlePermissionChange(e, setCreateBooking)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-Booking-${type}`}
                                                        label={`Update Booking`}
                                                        checked={updateBooking === 1}
                                                        onChange={(e) => handlePermissionChange(e, setUpdateBooking)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-Booking-${type}`}
                                                        label={`Delete Booking`}
                                                        checked={deleteBooking === 1}
                                                        onChange={(e) => handlePermissionChange(e, setDeleteBooking)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Discount
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-Discount-${type}`}
                                                        label={`Read Discount`}
                                                        checked={readDiscount === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadDiscount)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-Discount-${type}`}
                                                        label={`Create Discount`}
                                                        checked={createDiscount === 1}
                                                        onChange={(e) => handlePermissionChange(e, setCreateDiscount)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-Discount-${type}`}
                                                        label={`Update Discount`}
                                                        checked={updateDiscount === 1}
                                                        onChange={(e) => handlePermissionChange(e, setUpdateDiscount)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-Discount-${type}`}
                                                        label={`Delete Discount`}
                                                        checked={deleteDiscount === 1}
                                                        onChange={(e) => handlePermissionChange(e, setDeleteDiscount)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        FeedBack
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-FeedBack-${type}`}
                                                        label={`Read FeedBack`}
                                                        checked={readFeedBack === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadFeedBack)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-FeedBack-${type}`}
                                                        label={`Create FeedBack`}
                                                        checked={createFeedBack === 1}
                                                        onChange={(e) => handlePermissionChange(e, setCreateFeedBack)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-FeedBack-${type}`}
                                                        label={`Update FeedBack`}
                                                        checked={updateFeedBack === 1}
                                                        onChange={(e) => handlePermissionChange(e, setUpdateFeedBack)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-FeedBack-${type}`}
                                                        label={`Delete FeedBack`}
                                                        checked={deleteFeedBack === 1}
                                                        onChange={(e) => handlePermissionChange(e, setDeleteFeedBack)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Gallery
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-Gallery-${type}`}
                                                        label={`Read Gallery`}
                                                        checked={readGallery === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadGallery)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-Gallery-${type}`}
                                                        label={`Create Gallery`}
                                                        checked={createGallery === 1}
                                                        onChange={(e) => handlePermissionChange(e, setCreateGallery)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-Gallery-${type}`}
                                                        label={`Update Gallery`}
                                                        checked={updateGallery === 1}
                                                        onChange={(e) => handlePermissionChange(e, setUpdateGallery)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-Gallery-${type}`}
                                                        label={`Delete Gallery`}
                                                        checked={deleteGallery === 1}
                                                        onChange={(e) => handlePermissionChange(e, setDeleteGallery)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Receipt
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-Receipt-${type}`}
                                                        label={`Read Receipt`}
                                                        checked={readReceipt === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadReceipt)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-Receipt-${type}`}
                                                        label={`Create Receipt`}
                                                        checked={createReceipt === 1}
                                                        onChange={(e) => handlePermissionChange(e, setCreateReceipt)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-Receipt-${type}`}
                                                        label={`Update Receipt`}
                                                        checked={updateReceipt === 1}
                                                        onChange={(e) => handlePermissionChange(e, setUpdateReceipt)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-Receipt-${type}`}
                                                        label={`Delete Receipt`}
                                                        checked={deleteReceipt === 1}
                                                        onChange={(e) => handlePermissionChange(e, setDeleteReceipt)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Review
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-Review-${type}`}
                                                        label={`Read Review`}
                                                        checked={readReview === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadReview)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-Review-${type}`}
                                                        label={`Create Review`}
                                                        checked={createReview === 1}
                                                        onChange={(e) => handlePermissionChange(e, setCreateReview)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-Review-${type}`}
                                                        label={`Update Review`}
                                                        checked={updateReview === 1}
                                                        onChange={(e) => handlePermissionChange(e, setUpdateReview)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-Review-${type}`}
                                                        label={`Delete Review`}
                                                        checked={deleteReview === 1}
                                                        onChange={(e) => handlePermissionChange(e, setDeleteReview)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Service
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-Service-${type}`}
                                                        label={`Read Service`}
                                                        checked={readService === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadService)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-Service-${type}`}
                                                        label={`Create Service`}
                                                        checked={deleteService === 1}
                                                        onChange={(e) => handlePermissionChange(e, setCreateService)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-Service-${type}`}
                                                        label={`Update Service`}
                                                        checked={updateService === 1}
                                                        onChange={(e) => handlePermissionChange(e, setUpdateService)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-Service-${type}`}
                                                        label={`Delete Service`}
                                                        checked={deleteService === 1}
                                                        onChange={(e) => handlePermissionChange(e, setDeleteService)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Additional Fee
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-AdditionalFee-${type}`}
                                                        label={`Read AdditionalFee`}
                                                        checked={readAdditionalFee === 1}
                                                        onChange={(e) =>
                                                            handlePermissionChange(e, setReadAdditionalFee)
                                                        }
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-AdditionalFee-${type}`}
                                                        label={`Create AdditionalFee`}
                                                        checked={createAdditionalFee === 1}
                                                        onChange={(e) =>
                                                            handlePermissionChange(e, setCreateAdditionalFee)
                                                        }
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-AdditionalFee-${type}`}
                                                        label={`Update AdditionalFee`}
                                                        checked={updateAdditionalFee === 1}
                                                        onChange={(e) =>
                                                            handlePermissionChange(e, setUpdateAdditionalFee)
                                                        }
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-AdditionalFee-${type}`}
                                                        label={`Delete AdditionalFee`}
                                                        checked={deleteAdditionalFee === 1}
                                                        onChange={(e) =>
                                                            handlePermissionChange(e, setDeleteAdditionalFee)
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Role
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-Role-${type}`}
                                                        label={`Read Role`}
                                                        checked={readRole === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadRole)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Create-Role-${type}`}
                                                        label={`Create Role`}
                                                        checked={createRole === 1}
                                                        onChange={(e) => handlePermissionChange(e, setCreateRole)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Update-Role-${type}`}
                                                        label={`Update Role`}
                                                        checked={updateRole === 1}
                                                        onChange={(e) => handlePermissionChange(e, setUpdateRole)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Delete-Role-${type}`}
                                                        label={`Delete Role`}
                                                        checked={deleteRole === 1}
                                                        onChange={(e) => handlePermissionChange(e, setDeleteRole)}
                                                    />
                                                    <Form.Check
                                                        type={type}
                                                        id={`Permission-Role-${type}`}
                                                        label={`Permission Role`}
                                                        checked={assigningPermissions === 1}
                                                        onChange={(e) =>
                                                            handlePermissionChange(e, setAssigningPermissions)
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Role Permission
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`permission-${type}`}
                                                        label={`Permission`}
                                                        checked={roleAssignment === 1}
                                                        onChange={(e) => handlePermissionChange(e, setRoleAssignment)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={5} md={5} xl={6}>
                                        Statistic
                                    </Col>
                                    <Col xs={7} md={7} xl={6}>
                                        <Form>
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`Read-Statistic-${type}`}
                                                        label={`Read Statistic`}
                                                        checked={readStatistic === 1}
                                                        onChange={(e) => handlePermissionChange(e, setReadStatistic)}
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClosePermission}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {showPanel && (
                        <PopupPanel
                            data={selectedUser}
                            type={showPanel}
                            onClose={() => setShowPanel(false)}
                            isShowed={showPanel}
                            onUserAdded={handleUserAdded}
                            onUserUpdated={handleUserUpdated}
                        />
                    )}
                    {showDeleteAllConfirm && (
                        <ConfirmPopup
                            header="Are you sure you want to delete all the selected reviews?"
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
