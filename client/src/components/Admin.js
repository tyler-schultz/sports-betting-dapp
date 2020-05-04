import React, { Component} from "react";
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input, Collapse} from "reactstrap"

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state ={
            cgOpen: false,
            ugOpen: false,
            ugInfo: false,
            cangOpen: false,
            cangInfo: false,
            owOpen: false,
            owInfo: false,
            gameId: "",
            startTime: "",
            endTime: "",
            date: "",
            homeName: "",
            homeRecord: "",
            awayName: "",
            awayRecord: "",
            winner: "",
            score: "",
            cancelReason: "",
            fetchedStart: 0,
            fetchedEnd: 0,
            fetchedDate: "",
            fetchedhName: "",
            fetchedhRecord: "",
            fetchedaName: "",
            fetchedaRecord: ""
        }
        this.fetchGameData = this.fetchGameData.bind(this);
        this.updateStartTime = this.updateStartTime.bind(this);
        this.updateEndTime = this.updateEndTime.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.updateHomeName = this.updateHomeName.bind(this);
        this.updateHomeRecord = this.updateHomeRecord.bind(this);
        this.updateAwayName = this.updateAwayName.bind(this);
        this.updateAwayRecord = this.updateAwayRecord.bind(this);
        this.updateGameId = this.updateGameId.bind(this);
        this.updateWinner = this.updateWinner.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.createGame = this.createGame.bind(this);
        this.updateFetchedGameData = this.updateFetchedGameData.bind(this);
        this.updateReason = this.updateReason.bind(this);
        this.updateGameFinal = this.updateGameFinal.bind(this);

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
                <div onClick={() => {this.setState({cgOpen: !this.state.cgOpen})}}> Create Game </div>
                <Collapse isOpen={this.state.cgOpen}>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Start Time</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Start Time" onChange={(e) => this.updateStartTime(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>End Time</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="End Time" onChange={(e) => this.updateEndTime(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Date</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Date" onChange={(e) => this.updateDate(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Home Team Name</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Home Team Name" onChange={(e) => this.updateHomeName(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Home Team Record</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Home Team Record" onChange={(e) => this.updateHomeRecord(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Away Team Name</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Away Team Name" onChange={(e) => this.updateAwayName(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Away Team Record</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Away Team Record" onChange={(e) => this.updateAwayRecord(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <Button onClick={this.createGame}>Create</Button>
                    </ModalBody>
                </Collapse>
            </ModalHeader>
        );
    }

    renderUpdateGame(){
        return (
            <ModalHeader>
                <div onClick={() => {this.setState({ugOpen: !this.state.ugOpen})}}> Update Game Final </div>
                <Collapse isOpen={this.state.ugOpen}>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Game ID</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Game ID" onChange={(e) => this.updateGameId(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <Collapse isOpen={this.state.ugInfo}>
                            Game Start: {this.state.fetchedStart}
                            <br />
                            Game End: {this.state.fetchedEnd}
                            <br />
                            Game Date: {this.state.fetchedDate}
                            <br />
                            Game Home Team: {this.state.fetchedhName}
                            <br />
                            Game Home Record: {this.state.fetchedhRecord}
                            <br />
                            Game Away Team: {this.state.fetchedaName}
                            <br />
                            Game Away Record: {this.state.fetchedaRecord}
                            <br />
                        </Collapse>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Winner</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Winner" onChange={(e) => this.updateWinner(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Score</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Score" onChange={(e) => this.updateScore(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <Button onClick={this.updateGameFinal}>Update</Button>
                    </ModalBody>
                </Collapse>
            </ModalHeader>
        );
    }

    renderCancelGame(){
        return (
            <ModalHeader>
                <div onClick={() => {this.setState({cangOpen: !this.state.cangOpen})}}> Cancel Game </div>
                <Collapse isOpen={this.state.cangOpen}>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Game ID</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Game ID" onChange={(e) => this.updateGameId(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <Collapse isOpen={this.state.cangInfo}>
                            Game Start: {this.state.fetchedStart}
                            <br />
                            Game End: {this.state.fetchedEnd}
                            <br />
                            Game Date: {this.state.fetchedDate}
                            <br />
                            Game Home Team: {this.state.fetchedhName}
                            <br />
                            Game Home Record: {this.state.fetchedhRecord}
                            <br />
                            Game Away Team: {this.state.fetchedaName}
                            <br />
                            Game Away Record: {this.state.fetchedaRecord}
                            <br />
                        </Collapse>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Reason</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Reason for Canceling" onChange={(e) => this.updateReason(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <Button onClick={this.cancelGame}>Cancel Game</Button>
                    </ModalBody>
                </Collapse>
            </ModalHeader>
        );
    }

    renderOwnerWithdraw(){
        return (
            <ModalHeader>
                <div onClick={() => {this.setState({owOpen: !this.state.owOpen})}}> Owner Withdraw </div>
                <Collapse isOpen={this.state.owOpen}>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Game ID</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Game ID" onChange={(e) => this.updateGameId(e.target.value)}/>
                        </InputGroup>
                        <br />
                        <Collapse isOpen={this.state.owInfo}>
                            Game Start: {this.state.fetchedStart}
                            <br />
                            Game End: {this.state.fetchedEnd}
                            <br />
                            Game Date: {this.state.fetchedDate}
                            <br />
                            Game Home Team: {this.state.fetchedhName}
                            <br />
                            Game Home Record: {this.state.fetchedhRecord}
                            <br />
                            Game Away Team: {this.state.fetchedaName}
                            <br />
                            Game Away Record: {this.state.fetchedaRecord}
                            <br />
                        </Collapse>
                        <br />
                        <Button onClick={this.ownerWithdraw}>Withdraw</Button>
                    </ModalBody>
                </Collapse>
            </ModalHeader>
        );
    }

    updateStartTime(time){
        this.setState({startTime: time});
    }

    updateEndTime(time){
        this.setState({endTime: time});
    }

    updateDate(_date){
        this.setState({date: _date});
    }

    updateHomeName(name){
        this.setState({homeName: name});
    }

    updateHomeRecord(record){
        this.setState({homeRecord: record});
    }


    updateAwayName(name){
        this.setState({awayName: name});
    }

    updateAwayRecord(record){
        this.setState({awayRecord: record});
    }

    async updateGameId(gameID){
        await this.setState({gameId: gameID});
        this.fetchGameData(gameID);
    }

    updateWinner(_winner){
        this.setState({winner: _winner});
    }

    updateScore(_score){
        this.setState({score: _score});
    }

    updateReason(reason){
        this.setState({cancelReason: reason});
    }

    updateFetchedGameData(data){
        console.log("ShowGameData")
        this.setState({
            fetchedStart: data[0],
            fetchedEnd: data[1],
            fetchedDate: data[2],
            fetchedhName: data[3],
            fetchedhRecord: data[4],
            fetchedaName: data[6],
            fetchedaRecord: data[7],
            ugInfo: this.state.ugOpen,
            cangInfo: this.state.cangOpen,
            owInfo: this.state.owOpen
            });
    }

    async fetchGameData(gameId){
        console.log("FetchData");
        await this.props.fetchGameData(gameId).then(data => this.updateFetchedGameData(data));
    }

    async createGame(){
        await this.props.createGame(+this.state.startTime, +this.state.endTime, this.state.date, this.state.homeName, this.state.homeRecord, this.state.awayName, this.state.awayRecord);
    }

    async updateGameFinal(){
        await this.props.updateGameFinal(+this.state.gameId, this.state.winner, this.state.score);
    }

    async cancelGame(){
        await this.props.cancelGame(+this.state.gameId, this.state.cancelReason);
    }

    async ownerWithdraw(){
        await this.props.ownerWithdraw(+this.state.gameId);
    }
}
export default Admin;