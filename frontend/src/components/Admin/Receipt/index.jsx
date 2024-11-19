import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

import { BsTrash } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';

import ToastContainer, { showToast } from '~/utils/showToast';
import FormGroup from '~/components/FormGroup';
import ConfirmPopup from '~/components/ConfirmPopup';
import ReceiptForm from './ReceiptForm';
import { useCheckPermission } from '~/providers/CheckPermissionProvider';
import { RotatingLines } from 'react-loader-spinner';
import formatCurrency from '~/utils/currencyPipe';
import { BsThreeDots } from 'react-icons/bs';

import Tippy from '@tippyjs/react';
import ServicesUsedForm from './ServicesUsedForm';
import AdditionalFeeForm from './AdditionalFeeForm';

const Receipt = () => {
    const [showPanel, setShowPanel] = useState('');
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [receipts, setReceipts] = useState([]);
    const [clearSelectedRows, setClearSelectedRows] = useState(false);
    const [deleteAll, setDeleteAll] = useState({ count: 0, payload: [], yes: false });
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [deleteOne, setDeleteOne] = useState({ payload: null });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);

    // Context menu
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [actionMenuId, setActionMenuId] = useState(null);
    const [activeBookingId, setActiveBookingId] = useState(null);
    const [menuItems, setMenuItems] = useState([
        { label: 'Services used', value: 1 },
        { label: 'Additional fee', value: 2 },
    ]);

    const [searchInput, setSearchInput] = useState('');
    const [searchedReceipts, setSearchedReceipts] = useState([]);
    const { deleteReceipt: hasPermissionDelete } = useCheckPermission();

    // For searching
    useEffect(() => {
        if (searchInput.trim() === '') {
            setSearchedReceipts(receipts);
        } else {
            const filteredReceipt = receipts.filter(
                (receipt) =>
                    receipt?.booking?.customer?.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    receipt?.booking?.customer?.phoneNumber
                        .toString()
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()),
            );
            setSearchedReceipts(filteredReceipt);
        }
    }, [searchInput, receipts]);

    // For fetching
    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const url = 'http://localhost:5058/receipt';
                const response = await axios.get(url);
                setReceipts(response?.data?.$values);
            } catch (error) {
                console.error(error);
                showToast("There's something wrong while fetching receipts", 'error');
            }
        };
        fetchReceipts();
    }, []);

    // For deleting multiple receipts
    useEffect(() => {
        const deleteAllReceipts = async () => {
            try {
                setPendingDelete(true);
                // Create payload for deletion
                const payload = deleteAll.payload.map((receiptDelete) => ({ id: receiptDelete.id }));
                console.log('Delete payload', payload);
                const url = 'http://localhost:5058/receipt';
                const response = await axios.delete(url, { data: payload });
                console.log('Delete response', response);
                if (response?.status === 200) {
                    showToast('Receipts deleted successfully', 'success');
                    setReceipts(response?.data?.newReceipts?.$values);
                    setSearchedReceipts(response?.data?.newReceipts?.$values);
                    reset();
                }
            } catch (error) {
                showToast(error?.response?.data?.message || 'Error deleting Discount', 'error');
            } finally {
                setPendingDelete(false);
            }
        };

        if (deleteAll.yes) {
            deleteAllReceipts();
        }
    }, [deleteAll.yes, deleteAll.payload]);

    useEffect(() => {
        actionMenuId && setActiveMenuId(null);
    }, [actionMenuId]);

    const columns = [
        {
            name: 'No',
            selector: (row) => row.no,
        },
        {
            name: 'Booking ID',
            selector: (row) => row.booking,
        },
        {
            name: 'Customer',
            selector: (row) => row.customer,
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
        },
        {
            name: 'Total',
            selector: (row) => row.total,
        },
        {
            name: 'Created At',
            selector: (row) => row.createdAt,
        },
    ];

    if (hasPermissionDelete) {
        columns.push({
            name: 'Actions',
            selector: (row) => row.actions,
        });
    }

    const handleMenuClick = (action, bookingId = null) => {
        setActionMenuId(action);
        if (action === 1) {
            setActiveBookingId(bookingId);
        }
    };

    const MenuTrigger = React.forwardRef((props, ref) => (
        <div ref={ref} className="cursor-pointer">
            <BsThreeDots size={32} className="options-hover p-2 rounded-circle" onClick={props.onClick} />
        </div>
    ));

    MenuTrigger.displayName = 'MenuTrigger';

    const data = searchedReceipts?.map((receipt, index) => ({
        id: receipt?.id,
        no: index + 1,
        booking: receipt?.bookingId,
        customer: receipt?.booking?.customer?.name,
        phone: receipt?.booking?.customer?.phoneNumber,
        total: formatCurrency(receipt?.total),
        createdAt: receipt?.createdAt,
        actions: (
            <div className="d-flex align-items-center gap-3">
                <div style={{ zIndex: 0 }}>
                    <Tippy
                        interactive={true}
                        placement="left-end"
                        arrow={false}
                        visible={activeMenuId === receipt?.id}
                        onClickOutside={() => setActiveMenuId(null)}
                        className="bg-white shadow px-0 border"
                        content={
                            <div className="d-flex flex-column">
                                {menuItems.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            className={`cursor-pointer bg-white text-black customer-primary-color-hover animation-effect py-2 px-4 ${
                                                index === 0 ? 'border-bottom' : ''
                                            }`}
                                            onClick={() => {
                                                handleMenuClick(item.value, receipt.booking.id);
                                            }}
                                        >
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        }
                    >
                        <MenuTrigger
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(receipt?.id);
                            }}
                        />
                    </Tippy>
                </div>
                {hasPermissionDelete ? (
                    <BsTrash
                        size={18}
                        className="cursor-pointer"
                        onClick={() => handleTrashClicked(receipt?.id)}
                        style={{ color: '#E57373' }}
                    />
                ) : (
                    <></>
                )}
            </div>
        ),
    }));

    const handleRowClicked = useCallback(async (e) => {
        const { id } = e;

        try {
            const response = await axios.get(`http://localhost:5058/receipt/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setSelectedReceipt(response.data);
                setShowPanel('see');
            }
        } catch (error) {
            console.error('Error fetching Discount details:', error);
        }
    }, []);

    const handleDeleteRowsSelected = () => {
        deleteAll.count !== 0 && setShowDeleteAllConfirm(true);
    };

    const handleDiscountAdded = (newDiscount) => {
        setReceipts((prevDiscounts) => [...prevDiscounts, newDiscount]);
        setSearchedReceipts((prevDiscounts) => [...prevDiscounts, newDiscount]);
    };

    const handleDiscountUpdated = (currentDiscount) => {
        setReceipts((prevDiscounts) =>
            prevDiscounts.map((prevDiscount) =>
                prevDiscount.id === currentDiscount.id ? { ...currentDiscount } : prevDiscount,
            ),
        );
        setSearchedReceipts((prevDiscounts) =>
            prevDiscounts.map((prevDiscount) =>
                prevDiscount.id === currentDiscount.id ? { ...currentDiscount } : prevDiscount,
            ),
        );
    };

    const reset = () => {
        setDeleteAll({ count: 0, payload: [], yes: false });
        setShowDeleteAllConfirm(false);
        setDeleteOne({ payload: null });
        setShowDeleteConfirm(false);
    };

    //Delete receipt
    const handleTrashClicked = (id) => {
        setDeleteOne({ payload: id });
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        if (!deleteOne || !deleteOne.payload) {
            console.error('Invalid deleteOne payload:', deleteOne);
            return;
        }
        deleteReceipt(deleteOne.payload);
    };

    const deleteReceipt = async (payload) => {
        try {
            const response = await axios.delete(`http://localhost:5058/receipt/${payload}`);
            if (response.status === 200) {
                showToast('Receipt deleted successfully', 'success');
                setReceipts((prev) => prev.filter((receipt) => receipt.id !== payload));
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

    const handleSelectedRowsChanged = ({ allSelected, selectedCount, selectedRows }) => {
        setDeleteAll({ count: selectedCount, payload: selectedRows });
        setClearSelectedRows(false);
    };

    const handleCloseForm = () => {
        if (actionMenuId || activeMenuId) {
            setActionMenuId(null);
            setActionMenuId(null);
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between w-full py-4">
                {deleteAll.count !== 0 && (
                    <BsTrash
                        size={30}
                        className="p-1 rounded-2 text-white secondary-bg-color cursor-pointer"
                        onClick={handleDeleteRowsSelected}
                    />
                )}

                {/* Search Form */}
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

            {/* Datatable */}
            <DataTable
                columns={columns}
                data={data}
                selectableRows
                highlightOnHover
                striped
                onRowClicked={handleRowClicked}
                onSelectedRowsChange={handleSelectedRowsChanged}
                clearSelectedRows={clearSelectedRows}
                pagination
            />

            {/* Show a toast */}
            {ToastContainer}

            {/* Receipt Form */}
            {showPanel && (
                <ReceiptForm data={selectedReceipt} isShowed={showPanel} onClose={() => setShowPanel(false)} />
            )}

            {/* Services used */}
            {actionMenuId && actionMenuId === 1 && (
                <ServicesUsedForm
                    receiptId={activeMenuId}
                    bookingId={activeBookingId}
                    onShow={actionMenuId !== null || actionMenuId != null}
                    onClose={handleCloseForm}
                />
            )}

            {/* Additional fee */}
            {actionMenuId && actionMenuId === 2 && (
                <AdditionalFeeForm
                    receiptId={activeMenuId}
                    onShow={activeMenuId !== null || actionMenuId !== null}
                    onClose={handleCloseForm}
                />
            )}

            {/* Show confirmation when clicking on delete receipts */}
            {showDeleteAllConfirm && (
                <ConfirmPopup
                    header="Are you sure you want to delete all the selected Receipts?"
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

            {/* Show confirmation when clicking on delete a receipt*/}
            {showDeleteConfirm && (
                <ConfirmPopup
                    header="Are you sure you want to delete the selected Receipt?"
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

export default Receipt;
