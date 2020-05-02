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
                <h1>Past Games</h1>
                <Col>
                <Game></Game>
                </Col>
            </div>
        );
    }
}

export default GameFrame;