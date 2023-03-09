
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';


function DeleteProfileModal ({ show, handleClose }) { 
  const nav = useNavigate();

    //encode JWTtoken and get current id user
    let token = localStorage.getItem("jwtToken");
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    let result = JSON.parse(jsonPayload)
    let current_id = result.sub;

  const noDelete = () => {
   handleClose();
   nav("/profile")
  }

  const yesDelete = () => {
    handleClose();
    deleteData();
    nav("/")
   };


   async function deleteData() {
    await fetch(`http://localhost:4000/users/${current_id}`, {
     method: 'DELETE',
     headers: {
         'Authorization': "Bearer " + token
        },
    })
    .then((response) => {
        if (response.ok) {
            nav("/")
        } 
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
   }


    return (
      <>
        <Modal show={show}>
          <Modal.Header >
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign:"center"}}>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={noDelete}>
              No
            </Button>
            <Button variant="primary" onClick={yesDelete}>
              YES
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default DeleteProfileModal;