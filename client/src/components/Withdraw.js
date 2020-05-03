import React, { Component} from "react"
import {Button, Modal, ModalHeader, ModalBody, FormGroup, Input, InputGroupAddon, InputGroupText, Col, Row} from "reactstrap";
import "../style/App.css";

class Withdraw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: "",
            betAmount: 1,
            color: "safe",
            canWithdraw: this.canWithdraw()
        };

        this.changeTeam = this.changeTeam.bind(this);
        this.handleWithdraw = this.handleWithdraw.bind(this);
        this.canWithdraw = this.canWithdraw.bind(this);
    }

    changeTeam(event) {
        this.setState({team: event.target.value})
    }

    handleWithdraw = async event => {
        try {
            await this.props.state.BC.methods
                .withdraw(this.props.gameId).send({from: this.props.state.purchaserAddress});
            console.log("withdrawn");
            this.props.clearBetAmount();
            this.setState({canWithdraw: false});
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
                        You Bet on: {this.props.gameData.betTeam}
                        <br />
                        Ether You Bet on This Game: {this.props.gameData.betAmount}
                        <br />
                        Winner: {this.props.gameData.winner}
                        <br />
                        Score: {this.props.gameData.score}
                        <br />
                        <Button onClick={this.handleWithdraw} disabled={this.state.canWithdraw}>WithDraw</Button>
                    </ModalBody>
                </ModalHeader>
            </Modal>
        );
    }

    canWithdraw(){
        if(this.props.color == "success"){
            return false;
        }
        else{
            return true;
        }
    }
}

export default Withdraw;