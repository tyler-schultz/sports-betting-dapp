import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Betting extends Component {
    state = {
        value: "",
        message: "",
        errorMessage: "",
        loading: false,
        gameID: null,
        betTeam: ""
    };

    async componentDidMount() {
        let gameID = +this.props.location.state.gameID;
        this.setState({
            gameId
        });
    }

    onSubmit = async event => {
        event.preventDefault();
        this.setState({
            loading: true,
            errorMessage: "",
            message: "placing bet"
        });
        try {
            await this.props.CZ.methods
                .betOnGame(this.state.gameID, this.state.betTeam)
                .send({
                    from: this.props.userAddress
                });
        } catch
            (err) {
            this.setState({
                loading: false,
                errorMessage: err.message,
                message: "Bet Falied, Please Try Again"
            });
        }
    }


    render() {
    }
}

export default connect(mapStateToProps)(Betting);