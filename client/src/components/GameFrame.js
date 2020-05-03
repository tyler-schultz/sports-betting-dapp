import React, { Component } from "react";
import Game from "./Game";
import Col from "reactstrap/es/Col";
class GameFrame extends Component {
    constructor(props) {
        super(props);

        let state = {};
    }

    render() {
        return (
            <div>
                <h1>Today's Games</h1>
                <Col>
                    {this.renderTodayCards()}

                </Col>
                <h1>Past Games</h1>
                <Col>

                    }
                </Col>
            </div>
        );
    }

    renderTodayCards(){
        let todaysGames = [];;
        for(let i = 0; i < this.props.BC.methods.getGamesToday("05-02-2020").call(); i++) {
            let currId = this.props.BC.methods.getGameToday("05-02-2020", i).call();
            let currGame = this.props.BC.methods.getGamedData(currId);
            todaysGames.push({currGame});
        }


        return(
            <div>
                <Game id={}/>
            </div>
        );
    }
}

export default GameFrame;