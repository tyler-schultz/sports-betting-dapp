import React, { Component} from "react"
import {Button, Modal, ModalHeader, ModalBody, FormGroup, Input, InputGroupAddon, InputGroupText, Col, Row} from "reactstrap";
import "../style/App.css";

class Bet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: "",
            betAmount: 1,
            gameStartTime: null,
            gameEndTime: null
        };

        this.changeTeam = this.changeTeam.bind(this);
        this.handleBet = this.handleBet.bind(this);
    }

    epochToLocal(timestamp) {
        if(timestamp) {
            let date = new Date(parseInt(timestamp));
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let mer = " AM";
            if(hours = 0) {
                hours = 12;
            }
            if(hours > 12) {
                hours %= 12;
                mer = " PM";
            }
            return date.getHours() + ":" + date.getMinutes() + mer;
        }

        return "Ongoing";
    }

    changeTeam(event) {
        this.setState({team: event.target.value})
    }

    handleBet = async event => {
        try {
            var amount = this.props.state.web3.utils.toWei(
                this.state.betAmount.toString(),
                "ether"
            );

            await this.props.state.BC.methods
                .betOnGame(this.props.gameId, this.state.team)
                .send({
                    from: this.props.state.purchaserAddress,
                    value: amount,
                    gas: 500000
                });
            let game = {
                id: this.props.gameData.gameId,
                image: this.props.gameData.gameImage,
                start: this.props.gameData.timeStart,
                end: this.props.gameData.gameEnd,
                date: this.props.gameData.date,
                hName: this.props.gameData.homeTeam,
                hRecord: this.props.gameData.homeRecord,
                hBetters: this.props.gameData.homeBetters,
                aName: this.props.gameData.awayTeam,
                aRecord: this.props.gameData.awayRecord,
                aBetters: this.props.gameData.awayBetters,
                gameB: this.props.gameData.gameBalance,
                betTeam: this.state.team,
                betAmount: 1,
                winner: this.props.gameData.winner,
                score: this.props.gameData.score
            }
            this.props.addToBetTable(game);
            alert("Bet placed successfully!");
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <Modal isOpen={this.props.betOpen} toggle={this.props.toggleBet} style={{textAlign: "center"}} size="lg">
                <h1 style={{marginTop: "25px"}}>Bet on {this.props.gameData.homeTeam} vs. {this.props.gameData.awayTeam}</h1>
                <ModalBody>
                    <Col style={{float: "left", width: "33%"}}>Game Date: {this.props.gameData.date}</Col>
                    <Col style={{float: "left", width: "33%"}}>Game Start: {this.epochToLocal(this.props.gameData.timeStart)}</Col>
                    <Col style={{float: "right", width: "33%"}}>Game End: {this.epochToLocal(this.props.gameData.gameEnd)}</Col>
                    <br />
                    <br />
                    <Row>
                        <Col>
                            Game Home Team: {this.props.gameData.homeTeam}
                            <br />
                            Game Home Record: {this.props.gameData.homeRecord}
                            <br />
                            Total Bets on Home Team: {this.props.gameData.homeBetters}
                        </Col>
                        <Col>
                            Game Away Team: {this.props.gameData.awayTeam}
                            <br />
                            Game Away Record: {this.props.gameData.awayRecord}
                            <br />
                            Total Bets on Away Team: {this.props.gameData.awayBetters}
                        </Col>
                    </Row>
                    Current Ether Bet on This Game: {this.props.gameData.gameBalance / 1e18}
                    <br />
                    <br />
                    <h3>Choose Your Team</h3>
                    <br />
                    <FormGroup tag="fieldset">
                        <Row>
                            <Col>
                                <FormGroup check >
                                    <Input type="radio" name="radio1" onClick={() =>{this.setState({team:this.props.gameData.homeTeam})}}/>{' '}
                                    {this.props.gameData.homeTeam}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup check>
                                    <Input type="radio" name="radio1" onClick={() =>{this.setState({team:this.props.gameData.awayTeam})}}/>{' '}
                                    {this.props.gameData.awayTeam}
                                </FormGroup>
                            </Col>
                        </Row>
                    </FormGroup>
                    <br />
                    {this.state.team && <Button onClick={this.handleBet} style={{backgroundColor: "#800"}}>Bet 1 Ether on {this.state.team}</Button>}
                </ModalBody>
            </Modal>
        );
    }
}

export default Bet;