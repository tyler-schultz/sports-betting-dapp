import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Bet from "./Bet";

const Model = (props) => {


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button  onClick={toggle}>Bet on Game!</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Bet on Game!</ModalHeader>
                <ModalBody>
                    <Bet></Bet>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Place Bet!</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Model;