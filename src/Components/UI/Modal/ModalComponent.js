import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";

const ModalComponent = ({ title, body, show, handleClose }) => (
  <Modal show={show} onHide={() => handleClose()} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => handleClose()}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ModalComponent;
