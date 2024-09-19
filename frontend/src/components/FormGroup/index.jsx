import React from "react";
import Form from "react-bootstrap/Form";

const FormGroup = ({ label, id, name, type, placeHolder, error, Icon, value, onChange, onInput, onBlur }) => {
      return (
            <div className="mt-4">
                  <Form.Label htmlFor={id}>{label}</Form.Label>
                  <div className="d-flex align-items-center justify-content-between border p-2 pe-3 rounded-3 primary-bd-color-focus">
                        <Form.Control
                              type={type}
                              id={id}
                              name={name}
                              value={value}
                              placeholder={placeHolder}
                              className="outline-none primary-bd-color-focus border-0"
                              onChange={onChange}
                              onInput={onInput}
                              onBlur={onBlur}
                        />
                        {Icon && <Icon size={24} className="align-bottom icon-color" />}
                  </div>
                  {error && <span className="text-danger text-sm">{error}</span>}
            </div>
      );
};

export default FormGroup;
