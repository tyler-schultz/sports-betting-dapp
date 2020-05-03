import React, { Component } from "react";
import Game from "./Game";
import Col from "reactstrap/es/Col";
class GameFrame extends Component {
    constructor(props) {
        super(props);

        let state = {};
    }

    render() {
        let todaysDate = new Date();
        let todaysGames = [];
        let historyGames = [];

        var mm = ('0' + todaysDate.getDate()).slice(-2);
        var dd = ('0' + (todaysDate.getMonth() + 1)).slice(-2);
        var yyyy = todaysDate.getFullYear().toString();
        var todayString = mm + "-" + dd + "-" + yyyy;

        for(let i = 0; i < this.props.state.BC.methods.totalGamesToday(todayString).call(); i++) {
            let currId = this.props.state.BC.methods.getGameToday(todayString, i).call();
            let currGame = this.props.state.BC.methods.getGamedData(currId);
            todaysGames.push({currGame});
        }

        for(let j = 0; j < this.props.state.BC.methods.totalUserBets().call(); j++) {
            let currId = this.props.state.BC.methods.getGamefromHistory(j).call();
            let currGame = this.props.state.BC.methods.getGamedData(currId);
            historyGames.push({currGame});
        }

        return (
            <div>
                <h1>Today's Games</h1>
                <Col>
                    {todaysGames.map(game => { return <Game
                        id={game.gameId}
                        image={game.image}
                        timeStart={game.start}
                        end={game.end}
                        date={game.date}
                        hName={game.hName}
                        hRecord={game.hRecord}
                        hBetters={game.hBetters}
                        aName={game.aName}
                        aRecord={game.aRecord}
                        aBetters={game.aBetters}
                        gameB={game.gameB}/>})
                    }
                </Col>
                <h1>Past Games</h1>
                <Col>
                    {historyGames.map(game => { return <Game
                        id={game.gameId}
                        image={game.image}
                        timeStart={game.start}
                        end={game.end}
                        date={game.date}
                        hName={game.hName}
                        hRecord={game.hRecord}
                        hBetters={game.hBetters}
                        aName={game.aName}
                        aRecord={game.aRecord}
                        aBetters={game.aBetters}
                        gameB={game.gameB}/>})
                    }
                </Col>
            </div>
        );
    }
}

export default GameFrame;