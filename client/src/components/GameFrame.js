import React, { Component } from "react";

class GameFrame extends Component {
    constructor(props) {
        super(props);

        let state = {
            team: "",
            betAmount: ""
        };
    }

    render() {
        return (
            <div>
                <h1>Today's Games</h1>
                <h1>Past Games</h1>
            </div>
        );
    }
}

export default GameFrame;