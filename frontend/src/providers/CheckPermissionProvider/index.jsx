import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '~/providers/UserProvider';

// Create the role context
const CheckPermissionContext = createContext();

const CheckPermissionProvider = ({ children }) => {
    const { user } = useUser();

    const id = user?.roleId;
    const [readDashboard, setReadDashboard] = useState(0);

    const [readUser, setReadUser] = useState(0);
    const [createUser, setCreateUser] = useState(0);
    const [updateUser, setUpdateUser] = useState(0);
    const [deleteUser, setDeleteUser] = useState(0);

    const [readRoom, setReadRoom] = useState(0);
    const [createRoom, setCreateRoom] = useState(0);
    const [updateRoom, setUpdateRoom] = useState(0);
    const [deleteRoom, setDeleteRoom] = useState(0);

    const [readBooking, setReadBooking] = useState(0);
    const [createBooking, setCreateBooking] = useState(0);
    const [updateBooking, setUpdateBooking] = useState(0);
    const [deleteBooking, setDeleteBooking] = useState(0);

    const [readDiscount, setReadDiscount] = useState(0);
    const [createDiscount, setCreateDiscount] = useState(0);
    const [updateDiscount, setUpdateDiscount] = useState(0);
    const [deleteDiscount, setDeleteDiscount] = useState(0);

    const [readFeedBack, setReadFeedBack] = useState(0);
    const [createFeedBack, setCreateFeedBack] = useState(0);
    const [updateFeedBack, setUpdateFeedBack] = useState(0);
    const [deleteFeedBack, setDeleteFeedBack] = useState(0);

    const [readGallery, setReadGallery] = useState(0);
    const [createGallery, setCreateGallery] = useState(0);
    const [updateGallery, setUpdateGallery] = useState(0);
    const [deleteGallery, setDeleteGallery] = useState(0);

    const [readReceipt, setReadReceipt] = useState(0);
    const [createReceipt, setCreateReceipt] = useState(0);
    const [updateReceipt, setUpdateReceipt] = useState(0);
    const [deleteReceipt, setDeleteReceipt] = useState(0);

    const [readReview, setReadReview] = useState(0);
    const [createReview, setCreateReview] = useState(0);
    const [updateReview, setUpdateReview] = useState(0);
    const [deleteReview, setDeleteReview] = useState(0);

    const [readService, setReadService] = useState(0);
    const [createService, setCreateService] = useState(0);
    const [updateService, setUpdateService] = useState(0);
    const [deleteService, setDeleteService] = useState(0);

    const [readAdditionalFee, setReadAdditionalFee] = useState(0);
    const [createAdditionalFee, setCreateAdditionalFee] = useState(0);
    const [updateAdditionalFee, setUpdateAdditionalFee] = useState(0);
    const [deleteAdditionalFee, setDeleteAdditionalFee] = useState(0);

    const [readRole, setReadRole] = useState(0);
    const [createRoleP, setCreateRole] = useState(0);
    const [updateRoleP, setUpdateRole] = useState(0);
    const [deleteRoleP, setDeleteRole] = useState(0);

    const [readStatistic, setReadStatistic] = useState(0);
    const [assigningPermissionsP, setAssigningPermissions] = useState(0);
    const [roleAssignment, setRoleAssignment] = useState(0);

    const fetchPermissions = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5058/rolepermission/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 && response.data.$values && Array.isArray(response.data.$values)) {
                let readDashBoardFound = false;
                let readUserFound = false,
                    createUserFound = false,
                    updateUserFound = false,
                    deleteUserFound = false;
                let readRoomFound = false,
                    createRoomFound = false,
                    updateRoomFound = false,
                    deleteRoomFound = false;
                let readBookingFound = false,
                    createBookingFound = false,
                    updateBookingFound = false,
                    deleteBookingFound = false;
                let readDiscountFound = false,
                    createDiscountFound = false,
                    updateDiscountFound = false,
                    deleteDiscountFound = false;
                let readFeedBackFound = false,
                    createFeedBackFound = false,
                    updateFeedBackFound = false,
                    deleteFeedBackFound = false;
                let readGalleryFound = false,
                    createGalleryFound = false,
                    updateGalleryFound = false,
                    deleteGalleryFound = false;
                let readReceiptFound = false,
                    createReceiptFound = false,
                    updateReceiptFound = false,
                    deleteReceiptFound = false;
                let readReviewFound = false,
                    createReviewFound = false,
                    updateReviewFound = false,
                    deleteReviewFound = false;
                let readServiceFound = false,
                    createServiceFound = false,
                    updateServiceFound = false,
                    deleteServiceFound = false;
                let readAdditionalFeeFound = false,
                    createAdditionalFeeFound = false,
                    updateAdditionalFeeFound = false,
                    deleteAdditionalFeeFound = false;
                let readRoleFound = false,
                    createRoleFound = false,
                    updateRoleFound = false,
                    deleteRoleFound = false;
                let readStatisticFound = false,
                    assigningPermissionsFound = false,
                    roleAssignmentFound = false;

                response.data.$values.forEach((permission) => {
                    switch (permission.permissionId) {
                        case 1:
                            setReadUser(1);
                            readUserFound = true;
                            break;
                        case 2:
                            setCreateUser(1);
                            createUserFound = true;
                            break;
                        case 3:
                            setUpdateUser(1);
                            updateUserFound = true;
                            break;
                        case 4:
                            setDeleteUser(1);
                            deleteUserFound = true;
                            break;
                        case 5:
                            setReadRoom(1);
                            readRoomFound = true;
                            break;
                        case 6:
                            setCreateRoom(1);
                            createRoomFound = true;
                            break;
                        case 7:
                            setUpdateRoom(1);
                            updateRoomFound = true;
                            break;
                        case 8:
                            setDeleteRoom(1);
                            deleteRoomFound = true;
                            break;
                        case 9:
                            setReadBooking(1);
                            readBookingFound = true;
                            break;
                        case 10:
                            setCreateBooking(1);
                            createBookingFound = true;
                            break;
                        case 11:
                            setUpdateBooking(1);
                            updateBookingFound = true;
                            break;
                        case 12:
                            setDeleteBooking(1);
                            deleteBookingFound = true;
                            break;
                        case 13:
                            setReadDiscount(1);
                            readDiscountFound = true;
                            break;
                        case 14:
                            setCreateDiscount(1);
                            createDiscountFound = true;
                            break;
                        case 15:
                            setUpdateDiscount(1);
                            updateDiscountFound = true;
                            break;
                        case 16:
                            setDeleteDiscount(1);
                            deleteDiscountFound = true;
                            break;
                        case 17:
                            setReadFeedBack(1);
                            readFeedBackFound = true;
                            break;
                        case 18:
                            setCreateFeedBack(1);
                            createFeedBackFound = true;
                            break;
                        case 19:
                            setUpdateFeedBack(1);
                            updateFeedBackFound = true;
                            break;
                        case 20:
                            setDeleteFeedBack(1);
                            deleteFeedBackFound = true;
                            break;
                        case 21:
                            setReadGallery(1);
                            readGalleryFound = true;
                            break;
                        case 22:
                            setCreateGallery(1);
                            createGalleryFound = true;
                            break;
                        case 23:
                            setUpdateGallery(1);
                            updateGalleryFound = true;
                            break;
                        case 24:
                            setDeleteGallery(1);
                            deleteGalleryFound = true;
                            break;
                        case 25:
                            setReadReceipt(1);
                            readReceiptFound = true;
                            break;
                        case 26:
                            setCreateReceipt(1);
                            createReceiptFound = true;
                            break;
                        case 27:
                            setUpdateReceipt(1);
                            updateReceiptFound = true;
                            break;
                        case 28:
                            setDeleteReceipt(1);
                            deleteReceiptFound = true;
                            break;
                        case 29:
                            setReadReview(1);
                            readReviewFound = true;
                            break;
                        case 30:
                            setCreateReview(1);
                            createReviewFound = true;
                            break;
                        case 31:
                            setUpdateReview(1);
                            updateReviewFound = true;
                            break;
                        case 32:
                            setDeleteReview(1);
                            deleteReviewFound = true;
                            break;
                        case 33:
                            setReadService(1);
                            readServiceFound = true;
                            break;
                        case 34:
                            setCreateService(1);
                            createServiceFound = true;
                            break;
                        case 35:
                            setUpdateService(1);
                            updateServiceFound = true;
                            break;
                        case 36:
                            setDeleteService(1);
                            deleteServiceFound = true;
                            break;
                        case 37:
                            setReadAdditionalFee(1);
                            readAdditionalFeeFound = true;
                            break;
                        case 38:
                            setCreateAdditionalFee(1);
                            createAdditionalFeeFound = true;
                            break;
                        case 39:
                            setUpdateAdditionalFee(1);
                            updateAdditionalFeeFound = true;
                            break;
                        case 40:
                            setDeleteAdditionalFee(1);
                            deleteAdditionalFeeFound = true;
                            break;
                        case 41:
                            setReadStatistic(1);
                            readStatisticFound = true;
                            break;
                        case 42:
                            setReadRole(1);
                            readRoleFound = true;
                            break;
                        case 43:
                            setCreateRole(1);
                            createRoleFound = true;
                            break;
                        case 44:
                            setUpdateRole(1);
                            updateRoleFound = true;
                            break;
                        case 45:
                            setDeleteRole(1);
                            deleteRoleFound = true;
                            break;
                        case 46:
                            setAssigningPermissions(1);
                            assigningPermissionsFound = true;
                            break;
                        case 47:
                            setRoleAssignment(1);
                            roleAssignmentFound = true;
                            break;
                        case 48:
                            setReadDashboard(1);
                            readDashBoardFound = true;
                            break;
                        default:
                            break;
                    }
                });
                //setUseSate when not found
                if (!readDashBoardFound) setReadDashboard(0);
                if (!readUserFound) setReadUser(0);
                if (!createUserFound) setCreateUser(0);
                if (!updateUserFound) setUpdateUser(0);
                if (!deleteUserFound) setDeleteUser(0);
                if (!readRoomFound) setReadRoom(0);
                if (!createRoomFound) setCreateRoom(0);
                if (!updateRoomFound) setUpdateRoom(0);
                if (!deleteRoomFound) setDeleteRoom(0);
                if (!readBookingFound) setReadBooking(0);
                if (!createBookingFound) setCreateBooking(0);
                if (!updateBookingFound) setUpdateBooking(0);
                if (!deleteBookingFound) setDeleteBooking(0);
                if (!readDiscountFound) setReadDiscount(0);
                if (!createDiscountFound) setCreateDiscount(0);
                if (!updateDiscountFound) setUpdateDiscount(0);
                if (!deleteDiscountFound) setDeleteDiscount(0);
                if (!readFeedBackFound) setReadFeedBack(0);
                if (!createFeedBackFound) setCreateFeedBack(0);
                if (!updateFeedBackFound) setUpdateFeedBack(0);
                if (!deleteFeedBackFound) setDeleteFeedBack(0);
                if (!readGalleryFound) setReadGallery(0);
                if (!createGalleryFound) setCreateGallery(0);
                if (!updateGalleryFound) setUpdateGallery(0);
                if (!deleteGalleryFound) setDeleteGallery(0);
                if (!readReceiptFound) setReadReceipt(0);
                if (!createReceiptFound) setCreateReceipt(0);
                if (!updateReceiptFound) setUpdateReceipt(0);
                if (!deleteReceiptFound) setDeleteReceipt(0);
                if (!readReviewFound) setReadReview(0);
                if (!createReviewFound) setCreateReview(0);
                if (!updateReviewFound) setUpdateReview(0);
                if (!deleteReviewFound) setDeleteReview(0);
                if (!readServiceFound) setReadService(0);
                if (!createServiceFound) setCreateService(0);
                if (!updateServiceFound) setUpdateService(0);
                if (!deleteServiceFound) setDeleteService(0);
                if (!readAdditionalFeeFound) setReadAdditionalFee(0);
                if (!createAdditionalFeeFound) setCreateAdditionalFee(0);
                if (!updateAdditionalFeeFound) setUpdateAdditionalFee(0);
                if (!deleteAdditionalFeeFound) setDeleteAdditionalFee(0);
                if (!readStatisticFound) setReadStatistic(0);
                if (!readRoleFound) setReadRole(0);
                if (!createRoleFound) setCreateRole(0);
                if (!updateRoleFound) setUpdateRole(0);
                if (!deleteRoleFound) setDeleteRole(0);
                if (!assigningPermissionsFound) setAssigningPermissions(0);
                if (!roleAssignmentFound) setRoleAssignment(0);
            } else {
                console.error('No permissions found or data is not in expected format.');
            }
        } catch (error) {
            console.error('Error fetching role permissions:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchPermissions(id);
        }
    }, [id]);
    return (
        <CheckPermissionContext.Provider
            value={{
                id,
                fetchPermissions,
                readDashboard,
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
                createRoleP,
                updateRoleP,
                deleteRoleP,
                readStatistic,
                assigningPermissionsP,
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
