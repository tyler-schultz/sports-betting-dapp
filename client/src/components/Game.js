import React, { Component } from "react";
import Col from "reactstrap/es/Col";
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
    }

    render() {
        return (
            <div>
                <Card onClick={this.toggleBet} style={{width: "300px", display: "inline-block"}} >
                    <CardImg top width="1%" src={this.state.gameData.gameImage} alt={this.state.gameData.gameImage}/>
                    <CardBody>
                        <Col style={{float: "left", width: "50%", textAlign: "center"}}>
                            <strong>{this.state.gameData.homeTeam}</strong><br />
                            {this.state.gameData.homeRecord}<br />
                            {this.state.gameData.homeBetters} Betters
                        </Col>
                        <Col style={{float: "right", width: "50%", textAlign: "center"}}>
                            <strong>{this.state.gameData.awayTeam}</strong><br />
                            {this.state.gameData.awayRecord}<br />
                            {this.state.gameData.awayBetters} Betters
                        </Col>
                        Total Game Balance: {this.state.gameData.gameBalance}</br>
                        Date: {this.state.gameData.date}
                        <Bet betOpen={this.state.betOpen} toggleBet={this.toggleBet} gameData={this.state.gameData} gameId={this.state.gameData.gameId} state={this.props.state}/>
                    </CardBody>
                </Card>
            </div>);
    }

    toggleBet() {
        this.setState({betOpen: !this.state.betOpen})
    }
}
export default Game;