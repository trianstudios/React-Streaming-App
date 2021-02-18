import React, {Fragment, useState} from 'react';
import { Modal } from "react-bootstrap";

function ErrorModal({ title, message, show }) {

    return (
        <Fragment>

            <Modal
                show={show}
                // onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default ErrorModal;