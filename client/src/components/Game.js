import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

import Bet from "./Bet";
class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            betOpen: false,
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
                gameBalance: this.props.gameB
            }
        };

        this.toggleBet = this.toggleBet.bind(this);
        console.log(this.state.gameData);
    }

    render() {
        return (
            <div>
                <Card onClick={this.toggleBet} >
                    <CardImg top width="100%" src={this.state.gameData.gameI} alt="Card image"/>
                    <CardBody>
                        <CardTitle>Game ID: {this.state.gameData.gameId}</CardTitle>
                        <CardSubtitle>Date: {this.state.gameData.date}</CardSubtitle>
                        <CardText>{this.state.gameData.homeTeam} VS {this.state.gameData.awayTeam}</CardText>
                        <Bet betOpen={this.state.betOpen} toggleBet={this.toggleBet} gameData={this.state.gameData}/>
                    </CardBody>
                </Card>
            </div>);
    }

    toggleBet() {
        this.setState({betOpen: !this.state.betOpen})
    }
}
export default Game;