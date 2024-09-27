import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DataTable from 'react-data-table-component';

import { FaUserEdit } from 'react-icons/fa';

const Permission = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
        },
        {
            name: 'Username',
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: 'Role',
            selector: (row) => row.role,
        },
        {
            name: 'Status',
            selector: (row) => (
                <div className="flex-center">
                    <button className={`btn ${row.status === 1 ? 'btn-primary' : 'btn-danger'}`} disabled>
                        {row.status === 1 ? 'Active' : 'InActive'}
                    </button>
                </div>
            ),
        },

        {
            name: 'Action',
            cell: (row) => (
                <div>
                    <button
                        className={`btn ${row.status === 1 ? 'btn-primary' : 'btn-danger'}`}
                        disabled={row.status === 0}
                        onClick={handleShow}
                    >
                        <FaUserEdit style={{ color: 'black' }} />
                    </button>
                </div>
            ),
        },
    ];

    const empdata = [
        {
            id: 1,
            username: 'Madak',
            role: 'Admin',
            status: 1,
        },
        {
            id: 2,
            username: 'Losa',
            role: 'Admin',
            status: 1,
        },
        {
            id: 3,
            username: 'Losv',
            role: 'Admin',
            status: 0,
        },
    ];

    const [data, setData] = useState([]);
    useEffect(() => {
        // getData();
        setData(empdata);
    }, []);

    return (
        <Fragment>
            <ToastContainer />

            <br />
            {/* table */}

            <DataTable title="Premission" columns={columns} data={data} pagination highlightOnHover />

            {/* Modal */}

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Permission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label for="userid">UserId:</label>
                            <input type="text" class="form-control" value={'1'} id="userid" disabled />
                        </div>
                        <div class="form-group">
                            <label for="username">UserName:</label>
                            <input type="text" value={'Nguyen son dong'} class="form-control" id="username" disabled />
                        </div>
                        <div class="form-group">
                            <label for="role">Role</label>
                            <select class="form-control" id="role">
                                <option>Admin</option>
                                <option>Employee</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="status">Status</label>
                            <select class="form-control" id="status">
                                <option>Handle</option>
                                <option>Panding</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Save </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default Permission;
