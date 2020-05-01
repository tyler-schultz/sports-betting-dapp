import React, { Component} from "react";
import { Container, Button, Modal, ModalBody, ModalHeader, InputGroup, InputGroupAddon, InputGroupText, Input, Collapse} from "reactstrap"

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state ={
            cgOpen: false,
            ugOpen: false,
            cangOpen: false,
            owOpen: false,
            gameID: 0
        }
        this.fetchGameData = this.fetchGameData.bind(this);
    }

    render() {
        return (
                <Modal isOpen={this.props.isAdminOpen} toggle={this.props.toggleAdminOpen} centered={true}>
                    {this.renderCreateGame()}
                    {this.renderUpdateGame()}
                    {this.renderCancelGame()}
                    {this.renderOwnerWithdraw()}
                </Modal>
        );
    }

    renderCreateGame(){
        return (
            <ModalHeader>
                <h1 onClick={() => {this.setState({cgOpen: !this.state.cgOpen})}}> Create Game </h1>
                <Collapse isOpen={this.state.cgOpen}>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Game ID</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Game ID" onChange={(e) => this.fetchGameData(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Winner</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Winner" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Score</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Score" />
                        </InputGroup>
                    </ModalBody>
                </Collapse>
            </ModalHeader>
        );
    }

    renderUpdateGame(){
        return (
            <ModalHeader  onClick={() => {this.setState({ugOpen: !this.state.ugOpen})}}>
                Update Game
                <Collapse isOpen={this.state.ugOpen}>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Game ID</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Game ID" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Winner</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Winner" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Score</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Score" />
                        </InputGroup>
                    </ModalBody>
                </Collapse>
            </ModalHeader>
        );
    }

    renderCancelGame(){

        return (
            <ModalHeader  onClick={() => {this.setState({cangOpen: !this.state.cangOpen})}}>
                Cancel Game
                <Collapse isOpen={this.state.cangOpen}>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Game ID</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Game ID" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Winner</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Winner" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Score</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Score" />
                        </InputGroup>
                    </ModalBody>
                </Collapse>
            </ModalHeader>
        );
    }

    renderOwnerWithdraw(){

        return (
            <ModalHeader  onClick={() => {this.setState({owOpen: !this.state.owOpen})}}>
                Owner WithDraw
                <Collapse isOpen={this.state.owOpen}>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Game ID</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Game ID" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Winner</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Winner" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Score</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Score" />
                        </InputGroup>
                    </ModalBody>
                </Collapse>
            </ModalHeader>
        );
    }

    async fetchGameData(gameId){
        this.setState({gameID: gameId});
        let response = await this.props.BC.methods.getGameData(gameId).call();
        console.log(response);
    }
}
export default Admin;