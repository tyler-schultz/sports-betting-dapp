import React, { Component} from "react";
import { Container, Button, Modal, ModalBody } from "reactstrap"

class Admin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Modal isOpen={this.props.isAdminOpen} toggle={this.props.toggleAdminOpen} centered={true}>
                    <ModalBody>
                        <Button>TEST</Button>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

export default Admin;