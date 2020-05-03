import React, { Component } from "react";
import Game from "./Game";
import Col from "reactstrap/es/Col";
class GameFrame extends Component {
    constructor(props) {
        super(props);

        let state = {
            team: "",
            betAmount: "",
            gameID: 0,
            gameDate:null
        };
    }

    render() {
        return (
            <div>
                <h1>Today's Games</h1>
                <Col>
                    <Game id="" image="image Pathe" timeStart={0} end={1} date="TODAY" hName="Nugs" hRecord="0-0" hBetters={0} aName="Suns" aRecord="0-0" aBetters={0} gameB={0}/>
                </Col>
                <h1>Past Games</h1>
                <Col>
                </Col>
            </div>
        );
    }
}

export default GameFrame;