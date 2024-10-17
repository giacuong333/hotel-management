import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { getAuthHeader } from '../../utils/getAuthHeader';
import { useUser } from '~/providers/UserProvider';
import { showToast } from '../../utils/showToast';

// Create the role context
const CheckPermissionContext = createContext();

const CheckPermissionProvider = ({ children }) => {
    const { user } = useUser();

    const id = user?.roleId;
    console.log(user);
    console.log(user?.roleId);

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

    useEffect(() => {
        const fetchPermissions = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5058/rolepermission/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.data.$values);

                if (response.status === 200 && response.data.$values && Array.isArray(response.data.$values)) {
                    response.data.$values.forEach((permission) => {
                        console.log(permission);
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
        };

        fetchPermissions(id); // Call the async function inside useEffect
    }, [id]);

    return (
        <CheckPermissionContext.Provider
            value={{
                readUser,
                createUser,
                updateUser,
                deleteUser,
                readRoom,
                createRoom,
                updateRoom,
                deleteRoom,
                readBooking,
                createBooking,
                updateBooking,
                deleteBooking,
                readDiscount,
                createDiscount,
                updateDiscount,
                deleteDiscount,
                readFeedBack,
                createFeedBack,
                updateFeedBack,
                deleteFeedBack,
                readGallery,
                createGallery,
                updateGallery,
                deleteGallery,
                readReceipt,
                createReceipt,
                updateReceipt,
                deleteReceipt,
                readReview,
                createReview,
                updateReview,
                deleteReview,
                readService,
                createService,
                updateService,
                deleteService,
                readAdditionalFee,
                createAdditionalFee,
                updateAdditionalFee,
                deleteAdditionalFee,
                readRole,
                createRole,
                updateRole,
                deleteRole,
                readStatistic,
                assigningPermissions,
                roleAssignment,
            }}
        >
            {children}
        </CheckPermissionContext.Provider>
    );
};

// Custom hook to use the User context
export const useCheckPermission = () => useContext(CheckPermissionContext);

export default CheckPermissionProvider;
