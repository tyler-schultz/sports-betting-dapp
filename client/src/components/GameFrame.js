import React, { Component } from "react";
import Game from "./Game";
import BetGame from "./BetGame";
import { CardDeck } from 'reactstrap';

class GameFrame extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }
    render(){
        return(
            <div>
                <div>
                    <h1>Today's Games</h1>
                    <CardDeck style={{margin: "0 30px"}}>
                    {this.props.gameTable.map((game) => (
                        <Game
                            key={game.key}
                            id={game.id}
                            image={game.image}
                            start={game.start}
                            end={game.end}
                            date={game.date}
                            hName={game.hName}
                            hRecord={game.hRecord}
                            hBetters={game.hBetters}
                            aName={game.aName}
                            aRecord={game.aRecord}
                            aBetters={game.aBetters}
                            gameB={game.gameB}
                            winner={game.winner}
                            score={game.score}
                            state={this.props.state}
                            addToBetTable={this.props.addToBetTable}
                        />
                    ))}
                    </CardDeck>
                </div>
                <br />
                <div>
                    <h1>Games You've Bet On</h1>
                    <CardDeck style={{margin: "30px"}}>
                    {this.props.betTable.map((game, index) => (
                        <BetGame
                            key={index}
                            id={game.id}
                            image={game.image}
                            start={game.start}
                            end={game.end}
                            date={game.date}
                            hName={game.hName}
                            hRecord={game.hRecord}
                            hBetters={game.hBetters}
                            aName={game.aName}
                            aRecord={game.aRecord}
                            aBetters={game.aBetters}
                            gameB={game.gameB}
                            winner={game.winner}
                            score={game.score}
                            betTeam={game.betTeam}
                            betAmount={game.betAmount}
                            state={this.props.state}
                        />
                    ))}
                    </CardDeck>
                </div>
            </div>
        );
    }
}
export default GameFrame;