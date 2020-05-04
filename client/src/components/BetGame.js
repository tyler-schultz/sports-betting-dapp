import React, { Component } from "react";
import Col from "reactstrap/es/Col";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

import Withdraw from "./Withdraw";

class BetGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            betOpen: false,
            color: this.decideColor(),
            gameData: {
                gameId: this.props.id,
                gameImage: this.props.image,
                timeStart: this.props.start,
                gameEnd: this.props.end,
                date: this.props.date,
                homeTeam: this.props.hName,
                homeRecord: this.props.hRecord,
                homeBetters: this.props.hBetters,
                awayTeam: this.props.aName,
                awayRecord: this.props.aRecord,
                awayBetters: this.props.aBetters,
                gameBalance: this.props.gameB,
                betTeam: this.props.betTeam,
                betAmount: this.props.betAmount,
                winner: this.props.winner,
                score: this.props.score
            }
        };

        this.toggleBet = this.toggleBet.bind(this);
        this.decideColor = this.decideColor.bind(this);
        this.clearBetAmount = this.clearBetAmount.bind(this);
    }

    render() {
        return (
            <div>
                <Card onClick={this.toggleBet} style={{width: "300px", display: "inline-block"}} color={this.state.color}>
                    <CardImg top width="1%" src={this.state.gameData.gameImage} alt={this.state.gameData.gameImage}/>
                    <CardBody>
                        <Col style={{float: "left", width: "50%", textAlign: "center"}}>
                            <strong>{this.state.gameData.homeTeam}</strong>
                        </Col>
                        <Col style={{float: "right", width: "50%", textAlign: "center"}}>
                            <strong>{this.state.gameData.awayTeam}</strong>
                        </Col>
                        <CardTitle>Game ID: {this.state.gameData.gameId}</CardTitle>
                        <CardSubtitle>Date: {this.state.gameData.date}</CardSubtitle>
                        <CardText>{this.state.gameData.homeTeam} VS {this.state.gameData.awayTeam}</CardText>
                        <Withdraw betOpen={this.state.betOpen} toggleBet={this.toggleBet} gameData={this.state.gameData} gameId={this.state.gameData.gameId} state={this.props.state} addToBetTable={this.props.addToBetTable} clearBetAmount={this.clearBetAmount} color={this.state.color}/>
                    </CardBody>
                </Card>
            </div>);
    }

    toggleBet() {
        this.setState({betOpen: !this.state.betOpen})
    }

    decideColor(){
        if(this.props.betAmount === 0){
            return "danger";
        }
        else{
            if(this.props.betTeam === this.props.winner){
                return "success";
            }
            else if(this.props.winner == null){
                return "warning";
            }
            return "danger";
        }
    }

    clearBetAmount(){
        let temp = this.state.gameData;
        temp.betAmount = 0;
        this.setState({gameData: temp});
    }
}
export default BetGame;