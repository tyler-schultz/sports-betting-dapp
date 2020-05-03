import React, { Component} from "react"
import {Button, Modal, ModalHeader, ModalBody, FormGroup, Input, InputGroupAddon, InputGroupText, Col, Row} from "reactstrap";
import "../style/App.css";

class Bet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: "",
            betAmount: 1,
        };

        this.changeTeam = this.changeTeam.bind(this);
        this.handleBet = this.handleBet.bind(this);
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

            console.log("bet transferred");
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
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <Modal isOpen={this.props.betOpen} toggle={this.props.toggleBet} className="lg">
                <ModalHeader>
                    <div> Bet On Game </div>
                    <ModalBody>
                        Game Date: {this.props.gameData.date}
                        <br />
                        Game Start: {this.props.gameData.timeStart}
                        <br />
                        Game End: {this.props.gameData.gameEnd}
                        <br />
                        <br />
                        <Row>
                            <Col>
                                Game Home Team: {this.props.gameData.homeTeam}
                                <br />
                                Game Home Record: {this.props.gameData.homeRecord}
                                <br />
                                Bets on Home Team: {this.props.gameData.homeBetters}
                            </Col>
                            <Col>
                                Game Away Team: {this.props.gameData.awayTeam}
                                <br />
                                Game Away Record: {this.props.gameData.awayRecord}
                                <br />
                                Bets on Away Team: {this.props.gameData.awayBetters}
                            </Col>
                        </Row>
                        <br />
                        Current Ether Bet on This Game: {this.props.gameData.gameBalance}
                        <br />
                        <br />
                        PLACE BET:
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
                        <Button onClick={this.handleBet}>Bet 1 Ether on {this.state.team}</Button>
                    </ModalBody>
                </ModalHeader>
            </Modal>
        );
    }
}

export default Bet;