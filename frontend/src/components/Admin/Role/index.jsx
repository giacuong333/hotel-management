import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DataTable from 'react-data-table-component';

import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';

import { FaUserShield } from 'react-icons/fa';
const Role = () => {
    // show edit
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // show create
    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);
    // show create
    const [showPer, setShowPer] = useState(false);
    const handleClosePer = () => setShowPer(false);
    const handleShowPer = () => setShowPer(true);

    const handeleDelete = (id) => {
        if (window.confirm('Are you sure to delete ')) {
            alert('delete');
        }
    };

    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
        },
        {
            name: 'Id',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },

        {
            name: 'Action',
            cell: (row) => (
                <div>
                    <button className="btn btn-success" disabled={row.status === 0} onClick={handleShowPer}>
                        <FaUserShield />
                    </button>
                    &nbsp;
                    <button className="btn btn-primary" disabled={row.status === 0} onClick={handleShow}>
                        <FaRegEdit />
                    </button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => handeleDelete()}>
                        <MdDelete />
                    </button>
                </div>
            ),
        },
    ];

    const empdata = [
        {
            id: 1,
            name: 'Admin',
        },
        {
            id: 2,
            name: 'Customer',
        },
        {
            id: 3,
            name: 'Employee',
        },
    ];

    const [data, setData] = useState([]);
    useEffect(() => {
        // getData();
        setData(empdata);
    }, []);

    function handleFilter(event) {
        const newdata = empdata.filter((row) => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setData(newdata);
    }
    return (
        <Fragment>
            <ToastContainer />
            <div>
                <nav class="navbar navbar-light bg-light justify-content-between">
                    <p class="navbar-brand"></p>
                    <form class="form-inline mr-2">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                handleShowCreate();
                            }}
                        >
                            Create
                        </button>
                    </form>
                </nav>
            </div>
            {/* create */}
            <Modal show={showCreate} onHide={handleCloseCreate} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Create Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label for="nameserviceCreate">Name Role:</label>
                            <input type="text" value={'food'} class="form-control" id="nameserviceCreate" />
                        </div>

                        {/* <div class="form-group">
                              <label for="statusCreate">Status</label>
                              <select class="form-control" id="status">
                                  <option>Active</option>
                                  <option>InActive</option>
                              </select>
                          </div> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Permission */}

            {/* create */}
            <Modal show={showPer} onHide={handleClosePer} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Role-Permisson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>

                                <th>Manage </th>
                                <th>Fuction </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Manage User</td>
                                <td>
                                    <input type="checkbox" id="look"></input>
                                    &nbsp;
                                    <label htmlFor="look">Look</label>
                                    <br></br>
                                    <input type="checkbox" id="add" />
                                    &nbsp;
                                    <label htmlFor="add">Add</label>
                                    <br></br>
                                    <input type="checkbox" id="edit" />
                                    &nbsp;
                                    <label htmlFor="edit">Edit</label>
                                    <br></br>
                                    <input type="checkbox" id="delete" />
                                    &nbsp;
                                    <label htmlFor="delete">Delete</label>
                                    <br></br>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Manage Booking</td>
                                <td>
                                    <input type="checkbox" id="look"></input>
                                    &nbsp;
                                    <label htmlFor="look">Look</label>
                                    <br></br>
                                    <input type="checkbox" id="add" />
                                    &nbsp;
                                    <label htmlFor="add">Add</label>
                                    <br></br>
                                    <input type="checkbox" id="edit" />
                                    &nbsp;
                                    <label htmlFor="edit">Edit</label>
                                    <br></br>
                                    <input type="checkbox" id="delete" />
                                    &nbsp;
                                    <label htmlFor="delete">Delete</label>
                                    <br></br>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePer}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Search */}
            <nav class="navbar navbar-light bg-light justify-content-between p-3">
                <p class="navbar-brand">Role</p>
                <form class="form-inline mr-5">
                    <input
                        class="form-control "
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleFilter}
                    />
                </form>
            </nav>

            {/* table */}
            <DataTable columns={columns} data={data} pagination highlightOnHover />

            {/* Modal */}

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label for="nameservice">Name Role:</label>
                            <input type="text" value={'food'} class="form-control" id="nameservice" />
                        </div>
                        {/*                         
                          <div class="form-group">
                              <label for="status">Status</label>
                              <select class="form-control" id="status">
                                  <option>Active</option>
                                  <option>InActive</option>
                              </select>
                          </div> */}
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

export default Role;
