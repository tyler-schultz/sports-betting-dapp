import React, { Component } from "react";
import Game from "./Game";
import Col from "reactstrap/es/Col";
class GameFrame extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }
    render(){
        return(
            <div>
                <div>
                    <h3>Today's Games</h3>
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
                        />
                    ))}
                </div>
                <br />
                <div>
                    <h3>Game's You've Bet On</h3>
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
                        />
                    ))}
                </div>
            </div>
        );
    }
}
export default GameFrame;