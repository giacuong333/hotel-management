import React from 'react';
import FormGroup from '~/components/FormGroup';

const AccountDetail = () => {
    return (
        <main className="">
            <div className="d-flex flex-column gap-4">
                <div className="">
                    <p className="fw-semibold fs-4">Personal information</p>
                    <small className="mt-1">
                        Manage your personal information, including phone numbers, and email address where you can be
                        contacted.
                    </small>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <FormGroup
                            label="Name"
                            id="name"
                            name="name"
                            type="text"
                            // error={errors.name}
                            value={'Gia Cường'}
                            placeHolder={'Jonh Doe'}
                            customLabelStyle="fw-semibold"
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            // onChange={(e) => handleFieldChange('name', e.target.value)}
                            // onInput={() => handleFieldInput('name')}
                            // onBlur={() => handleValidation()}
                        />
                    </div>
                    <div className="col-lg-6">
                        <FormGroup
                            label="Title"
                            id="title"
                            name="title"
                            type="text"
                            // error={errors.name}
                            //     value={''}
                            placeHolder={'Enter title'}
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customLabelStyle="fw-semibold"
                            customParentParentInputStyle="mt-2"
                            // onChange={(e) => handleFieldChange('name', e.target.value)}
                            // onInput={() => handleFieldInput('name')}
                            // onBlur={() => handleValidation()}
                        />
                    </div>
                    <div className="col-lg-6">
                        <FormGroup
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            // error={errors.name}
                            //     value={'Gia Cường'}
                            placeHolder={'legiacuong@gmail.com'}
                            customLabelStyle="fw-semibold"
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            // onChange={(e) => handleFieldChange('name', e.target.value)}
                            // onInput={() => handleFieldInput('name')}
                            // onBlur={() => handleValidation()}
                        />
                    </div>
                    <div className="col-lg-6">
                        <FormGroup
                            label="Phone number"
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            // error={errors.name}
                            //     value={'Gia Cường'}
                            placeHolder={'0948800917'}
                            customLabelStyle="fw-semibold"
                            customParentInputStyle="p-1 pe-3 rounded-2"
                            customParentParentInputStyle="mt-2"
                            // onChange={(e) => handleFieldChange('name', e.target.value)}
                            // onInput={() => handleFieldInput('name')}
                            // onBlur={() => handleValidation()}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AccountDetail;
