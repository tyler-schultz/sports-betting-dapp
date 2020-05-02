import React, { Component } from "react";

class Bet extends Component {
    constructor(props) {
        super(props);

        let state = {
            team: "",
            betAmount: ""
        };

        this.changeTeam = this.changeTeam.bind(this);
        this.changeBetAmount = this.changeBetAmount.bind(this);
        this.handleBet = this.handleBet.bind(this);
        this.handleWithdraw = this.handleWithdraw.bind(this);
    }

    changeTeam(event) {
        this.setState({team: event.target.value})
    }

    changeBetAmount(event) {
        this.setState({betAmount: event.target.value});
    }

    handleBet = async event => {
        try {
            var amount = this.props.state.web3.utils.toWei(
                this.state.betAmount.toString(),
                "ether"
            );

            console.log(amount);

            await this.props.state.BC.methods
                .betOnGame(this.props.gameId, this.state.team)
                .send({
                    from: this.props.state.purchaserAddress,
                    value: amount,
                    gas: 500000
                });

            console.log("bet transferred");
        } catch (error) {
            console.log(error);
        }
    };

    handleWithdraw = async event => {
        try {
            await this.props.state.BC.methods
                .withdraw(this.props.gameId);
            console.log("withdrawn");
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Team:
                    <input type="text" onChange={this.changeTeam} />
                </label>
                <label>
                    Amount:
                    <input type="number" onChange={this.changeBetAmount} />
                </label>
                <input type="button" onClick={this.handleBet} value="Bet" />
            </form>
        );
    }
}

export default Bet;