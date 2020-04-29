import React, { Button, Component } from "react";

class Bet extends Component {
    constructor(props) {
        super(props);

        let state = {
            team: "",
            betAmount: ""
        };

        this.changeTeam = this.changeTeam.bind(this);
        this.changeBetAmount = this.changeBetAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeTeam(event) {
        this.setState({team: event.target.value})
    }

    changeBetAmount(event) {
        this.setState({betAmount: event.target.value});
    }

    handleSubmit = async event => {
        try {
            var amount = this.props.state.web3.utils.toWei(
                this.state.betAmount.toString(),
                "ether"
            );

            await this.props.state.BC.methods
                .betOnGame(this.props.state.contractAddress, amount)
                .send({
                    from: this.props.state.purchaserAddress,
                    gas: 500000
                });

            console.log("bet transferred");
        } catch {
            console.log("Bet failed.");
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Team:
                    <input type="text" onchange={this.changeTeam} />
                </label>
                <label>
                    Amount:
                    <input type="number" onchange={this.changeAmount} />
                </label>
                <input type="submit" value="Bet" />
            </form>
        );
    }
}

export default Bet;