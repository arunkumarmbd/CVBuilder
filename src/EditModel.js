import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const EditModel = ({ show, handleClose, value, rerender }) => {
  const [newValue, setNewValue] = useState("");
  const [list, setList] = useState([]);

  const updateField = () => {
    let itemList = [...list];
    const indexToUpdate = itemList.findIndex(item => item.id === value.id);

    if (indexToUpdate !== -1) {
      itemList[indexToUpdate].field = newValue;
    }

    localStorage.setItem("fields", JSON.stringify(itemList));
    rerender();
    handleClose();
  };

  useEffect(() => {
    if (value) {
      setList(JSON.parse(localStorage.getItem("fields")) || []);
      setNewValue(value.field);
    }
  }, [value]);

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Field
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>{value?.field}</h4> */}
        <input value={newValue} onChange={(e) => setNewValue(e.target.value)} className='form-control' />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={updateField}>Update</Button>
        {/* <Button onClick={handleClose}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
};
